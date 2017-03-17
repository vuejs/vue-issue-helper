<template>
  <div class="row" style="margin:0">
    <div class="col-12 col-lg-4">
      <input-typeahead
        v-model="attrs.version"
        title="Version"
        :suggestions="suggestions"
        :search="{
          sort: [{ field: 'index', direction: 'asc' }],
          empty_sort: [{ field: 'index', direction: 'asc' }],
          limit: 10
        }"
        required
        subtitle="Check if the issue is reproducible with the latest stable version of Vue."/>
    </div>

    <div class="col-12 col-lg-8">
      <input-text
        type="url"
        v-model="attrs.reproduction"
        title="Link to minimal reproduction"
        required
        subtitle="yes">
        <div slot="subtitle">
          Please provide a link to a JSFiddle/JSBin/CodePen or GitHub repo.
          <br>
          <a tabindex="-1" href="#" @click="show = true">
            What is a <em>minimal reproduction</em>, and why is it required?
          </a>
        </div>
      </input-text>
    </div>

    <div class="col-12">
      <input-textarea
        v-model="attrs.steps"
        title="Steps to reproduce"
        required
        subtitle="yes">
        <div slot="subtitle">
          Clear and concise reproduction instructions are important for us to be
          able to triage your issue in a timely manner. Note that you can use
          <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
           Markdown
          </a> to format lists and code.
        </div>
      </input-textarea>
    </div>

    <div class="col-12 col-lg-6">
      <input-textarea v-model="attrs.expected" title="What is expected?" required/>
    </div>

    <div class="col-12 col-lg-6">
      <input-textarea v-model="attrs.actual" title="What is actually happening?" required/>
    </div>

    <div class="col-12">
      <input-textarea v-model="attrs.extra"
        title="Any additional comments? (optional)"
        subtitle="e.g. some background/context of how you ran into this bug." />
    </div>

    <modal :open="show" @close="show = false">
      <div class="card">
        <div class="card-header">
          <h4 class="mb-0">{{ i18n('repro-title') }}</h4>
        </div>
        <i18n class="card-block" id="repro"/>
      </div>
    </modal>
  </div>
</template>

<script>
import { versionCompare, generate } from '../helpers'

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

      if (!(repo in versions)) return []

      return versions[repo].slice()
          .sort((a, b) => -versionCompare(a.id, b.id))
          .map((a, index) => ({ index, ...a }))
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
### version
${version}

### reproduction link
[${reproduction}](${reproduction})

### steps to reproduce
${steps}

### what is expected?
${expected}

### what is actually happening?
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
    }
  }
}
</script>
