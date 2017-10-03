<template>
  <div class="row" style="margin:0">
    <div class="col-12 col-lg-4">
      <input-typeahead
        v-model="attrs.version"
        :title="i18n('version-title')"
        :suggestions="suggestions"
        :search="{
          sort: [{ field: 'index', direction: 'asc' }],
          empty_sort: [{ field: 'index', direction: 'asc' }],
          limit: 10
        }"
        required
        :subtitle="i18n('version-subtitle')"/>
    </div>

    <div class="col-12 col-lg-8">
      <input-text
        type="url"
        v-model="attrs.reproduction"
        :title="i18n('repro-title')"
        required
        subtitle="yes">
        <i18n slot="subtitle"
          id="repro-subtitle"
          @click-modal="show = true"/>
      </input-text>
    </div>

    <div class="col-12">
      <input-textarea
        v-model="attrs.steps"
        :title="i18n('steps-title')"
        required
        subtitle="yes">
        <i18n slot="subtitle" id="steps-subtitle"/>
      </input-textarea>
    </div>

    <div class="col-12 col-lg-6">
      <input-textarea v-model="attrs.expected" :title="i18n('expected-title')" required/>
    </div>

    <div class="col-12 col-lg-6">
      <input-textarea v-model="attrs.actual" :title="i18n('actual-title')" required/>
    </div>

    <div class="col-12">
      <input-textarea v-model="attrs.extra"
        :title="i18n('extra-title')"
        :subtitle="i18n('extra-subtitle')" />
    </div>

    <modal :open="show" @close="show = false">
      <div class="card">
        <div class="card-header">
          <h4 class="mb-0">{{ i18n('repro-modal-title') }}</h4>
        </div>
        <i18n class="card-block" id="repro-modal"/>
      </div>
    </modal>
  </div>
</template>

<script>
import { versionCompare, generate, updateQuery } from '../helpers'

export default {
  props: ['repo'],

  data: () => ({
    show: false,
    attrs: {
      version: '',
      reproduction: '',
      steps: '',
      expected: '',
      actual: '',
      extra: ''
    },
    versions: {}
  }),

  computed: {
    suggestions () {
      const repo = this.repo
      const versions = this.versions

      if (!(repo in versions)) return [{ name: 'Loading...' }]

      return versions[repo].slice()
          .sort((a, b) => -versionCompare(a.id, b.id))
          .map((a, index) => (Object.assign({}, a, { index })))
    }
  },

  methods: {
    async fetchVersions (page = 1) {
      const response = await this.$http.get(`https://api.github.com/repos/${this.repo}/releases`, {
        params: {
          page,
          per_page: 100
        }
      })
      const versions = await response.json()

      if (!versions || !(versions instanceof Array)) return false

      if (!(this.repo in this.versions)) {
        this.$set(this.versions, this.repo, [])
      }

      this.versions[this.repo].push(
          ...versions.map(v => (/^v/.test(v.tag_name) ? v.tag_name.substr(1) : v.tag_name))
              .map(name => ({ id: name, name }))
      )

      if (page === 1) {
        this.attrs.version = this.versions[this.repo].length ? this.versions[this.repo][0].id : ''
      }

      const link = response.headers.get('Link')

      if (link && link.indexOf('rel="next"') > -1) {
        this.fetchVersions(page + 1)
      }
    },

    generate () {
      const { version, reproduction, steps, expected, actual, extra } = this.attrs

      return generate(`
### Version
${version}

### Reproduction link
[${reproduction}](${reproduction})

### Steps to reproduce
${steps}

### What is expected?
${expected}

### What is actually happening?
${actual}

${extra ? `---\n${extra}` : ''}
  `.trim())
    }
  },

  created () {
    this.fetchVersions()
  },

  watch: {
    repo (repo) {
      if (!this.versions[repo]) {
        this.fetchVersions()
      } else {
        this.attrs.version = this.versions[repo][0].id
      }
      updateQuery({ repo })
    }
  }
}
</script>
