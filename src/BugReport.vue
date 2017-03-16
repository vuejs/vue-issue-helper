<template>
  <div class="row" style="margin:0">
    <div class="col-12 col-lg-4">
      <input-typeahead
        v-model="attrs.version"
        title="Version"
        :suggestions="suggestions"
        :search="{ sort: [{ field: 'index', direction: 'asc' }], empty_sort: [{ field: 'index', direction: 'asc' }], limit: 10 }"
        required
        subtitle="Check if the issue is reproducible with the latest stable version of Vue."/>
    </div>

    <div class="col-12 col-lg-8">
      <input-text
        type="url"
        v-model="attrs.reproduction"
        title="Link to Minimal Reproduction"
        required
        subtitle="yes">
        <div slot="subtitle">
          Please provide a link to a jsfiddle / jsbin / codepen or GitHub repo.
          <br>
          <a tabindex="-1" href="#" @click="show = true">
            What is a "minimal reproduction", and why is it required?
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
          Concisely describe the steps needed to cause the bug to happen
          in your reproduction. Markdown is supported. Clear and concise
          reproduction steps are important for us to be able triage your
          issue in a timely manner. Note that you can use
          <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
           Markdown
          </a> to format your code blocks.
        </div>
      </input-textarea>
    </div>

    <div class="col-12 col-lg-6">
      <input-textarea v-model="attrs.expected" title="What is Expected?" required/>
    </div>

    <div class="col-12 col-lg-6">
      <input-textarea v-model="attrs.actual" title="What is actually happening?" required/>
    </div>

    <div class="col-12">
      <input-textarea v-model="attrs.extra"
        title="Any additional comments? (optional)"
        subtitle="e.g. some background / context of how you ran into this bug" />
    </div>

    <modal :open="show" @close="show = false">
      <div class="card">
        <div class="card-header">
          <h4>Minimal Reproduction</h4>
        </div>
        <div class="card-block">
          <p>
            A bug reproduction is a piece of code that can run and demonstrate how a bug can happen.
          </p>
          <h5>A repro is required</h5>
          <p>We cannot fix a bug without a reproduction, period. There are many things that can lead to a problem in a project, and we cannot magically infer things that you did not tell us. A reproduction is the only way that can reliably help us understand what is going on.</p>
          <h5>A repro must be runnable</h5>
          <p>Text, screenshots or videos are <strong>NOT</strong> reproductions! Text is almost always too vague to precisely describe a technical bug. Screenshots and videos only show that the bug exists, but do not provide enough information on why it happens. Only runnable code provides the most complete context and allows us to properly debug the scenario.</p>
          <h5>A repro should be minimal</h5>
          <p>Some users would give us a link to a real project and hope we can help them figure out what is wrong. We generally do not accept such requests because:</p>
          <ul>
            <li>It is extremely time-consuming to hunt a bug in a big and unfamiliar codebase.</li>
            <li>The problematic behavior may very well be caused by your code rather than by a bug in Vue.</li>
          </ul>
          <p>A <strong>minimal</strong> reproduction means it demonstrates the bug, and the bug only. It should only contain the bare minimum amount of code that can reliably cause the bug. Try your best to get rid of anything that aren't directly related to the problem.</p>
          <h5>How to create a repro</h5>
          <p>
            You can use online coding environments like <a href="https://jsfiddle.net/chrisvfritz/50wL7mdz/" target="_blank">jsfiddle</a>, <a href="https://jsbin.com" target="_blank">jsbin</a> or <a href="https://codepen.io" target="_blank">codepen</a> to create reproductions. If your bug involves a build setup, you can create a project using <a href="https://github.com/vuejs/vue-cli" target="_blank">vue-cli</a> and provide the link to a GitHub repository.
          </p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { versionCompare } from './version-compare'
import { generate } from './generate'

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
