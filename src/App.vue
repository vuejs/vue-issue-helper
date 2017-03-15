<template>
<div class="app" style="padding-top: 54px">
  <nav class="navbar navbar-light fixed-top bg-faded mb-3">
    <div class="container d-flex">
      <a class="navbar-brand" href="#">
        <img src="./logo.png" height="24"> Issue Helper</a>

      <ul class="navbar-nav ml-auto d-flex flex-row">
        <li class="nav-item px-2">
          <a class="nav-link ml-auto" :href="`https://github.com/${repo}/issues`" target="_blank">Github</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container py-3">
    <form class="row" @submit.prevent="generate">
      <div class="col-12 col-lg-8 offset-lg-2">
        <div class="row">

          <div class="col-12">
            <input-select title="I am opening an issue for" v-model="repo" :options="repos"/>
          </div>

          <div class="col-12">
            <input-text v-model="attrs.title" title="Issue Title" required autofocus subtitle="yes">
              <div slot="subtitle">
                <p>The issue list of this repo is <strong>exclusively</strong> for bug reports and feature requests. For
                  simple questions, please use the following resources:</p>
                <ul>
                  <li>Read the docs: <a tabindex="-1" target="_blank" href="https://vuejs.org/guide/">https://vuejs.org/guide/</a>
                  </li>
                  <li>Watch video tutorials: <a tabindex="-1" target="_blank"
                                                href="https://laracasts.com/series/learning-vue-step-by-step">https://laracasts.com/series/learning-vue-step-by-step</a>
                  </li>
                  <li>Ask in the Gitter chat room: <a tabindex="-1" target="_blank" href="https://gitter.im/vuejs/vue">https://gitter.im/vuejs/vue</a>
                  </li>
                  <li>Ask on the forums: <a tabindex="-1" target="_blank" href="http://forum.vuejs.org/">http://forum.vuejs.org/</a>
                  </li>
                  <li>Look for/ask questions on stack overflow: <a tabindex="-1" target="_blank"
                                                                   href="https://stackoverflow.com/questions/ask?tags=vue.js">https://stackoverflow.com/questions/ask?tags=vue.js</a>
                  </li>
                </ul>
                <p><strong>Try to search for your issue, it may have already been answered or even fixed in the
                  development branch.</strong></p>
              </div>
            </input-text>
          </div>

          <div class="col-12 col-lg-4">
            <input-typeahead v-model="attrs.version" title="Version" :suggestions="suggestions"
                             :search="{ sort: [{ field: 'index', direction: 'asc' }], empty_sort: [{ field: 'index', direction: 'asc' }], limit: 10 }"
                             required
                             subtitle="Check if the issue is reproducible with the latest stable version of Vue."/>
          </div>

          <div class="col-12 col-lg-8">
            <input-text type="url" v-model="attrs.reproduction" title="Reproduction Link" required subtitle="yes">
              <div slot="subtitle">
                <p>
                  Use
                  <a tabindex="-1" target="_blank" href="https://jsfiddle.net/z11fe07p/">jsfiddle</a>/jsbin/codepen to reproduce issue.
                  If it requires build setup, then scaffold a project with
                  <a tabindex="-1" target="_blank" href="https://github.com/vue/vue-cli">vue-cli</a>
                  and provide a link to a repository.
                </p>
              </div>
            </input-text>
          </div>

          <div class="col-12">
            <input-textarea v-model="attrs.steps" title="Steps to reproduce" required subtitle="yes">
              <div slot="subtitle">
                <p>It is <strong>required</strong> that you clearly describe the steps necessary to reproduce the issue
                  you are running into. Issues with no clear repro steps will not be triaged. If an issue labeled <span
                          class="badge badge-default">need repro</span> receives no further input from the issue author
                  for more than 5 days, it will be closed.</p>
              </div>
            </input-textarea>
          </div>

          <div class="col-12 col-lg-6">
            <input-textarea v-model="attrs.expected" title="What is Expected?" required/>
          </div>

          <div class="col-12 col-lg-6">
            <input-textarea v-model="attrs.actual" title="What is actually happening?" required/>
          </div>

          <div class="col-12 my-3 py-3 text-center">
            <input-button type="submit">Preview</input-button>
          </div>
        </div>
      </div>
    </form>

    <modal :open="show" @close="show = false" wrapper="bootstrap-for-vue-CustomModal-wrapper-default">
      <div class="card">
        <div class="card-header d-flex align-items-center">
          <h5 class="mb-0">Issue Preview</h5>
          <input-button class="btn btn-primary ml-auto" type="submit" @click.native.prevent="create">Create
          </input-button>
        </div>
        <div class="card-block preview" style="overflow: auto" v-html="contentHtml"></div>
      </div>
    </modal>
  </div>

  <footer class="text-center text-muted mb-3">
    <p>&hellip;</p>
    <small>Built with <a href="https://github.com/vuejs/vue-cli">vue-cli</a> &centerdot; Checkout source on <a
            href="https://github.com/znck/vue-issue">Github</a></small>
  </footer>
</div>
</template>

<script lang="babel">
import { formHelper } from 'bootstrap-for-vue'
import copy from 'copy-to-clipboard'
import marked from 'marked'
import repos from './repos'
import { versionCompare } from './version-compare'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})

export default {
  name: 'App',

  data: () => ({
    attrs: {
      title: '',
      version: '',
      reproduction: '',
      steps: '',
      expected: '',
      actual: ''
    },
    content: '',
    show: false,
    preview: false,
    repo: '',
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
    },

    repos: () => (repos),

    contentHtml () {
      return marked(this.content)
    },

    title () {
      return encodeURIComponent(this.attrs.title).replace(/%2B/gi, '+')
    },

    body () {
      return encodeURIComponent(this.content).replace(/%2B/gi, '+')
    }
  },

  methods: {
    generate () {
      this.content =
          `
## Version
${this.attrs.version}

## Reproduction Link
[${this.attrs.reproduction}](${this.attrs.reproduction})

## Steps to Reproduce
- ${this.attrs.steps.split('\n').join('\n- ')}

## What is expected?
${this.attrs.expected}

## What is actually happening?
${this.attrs.actual}

<!-- generated by vue-issues. DO NOT REMOVE -->
      `.trim()

      copy(this.content)

      this.show = true
    },

    create () {
      window.open(`https://github.com/${this.repo}/issues/new?title=${this.title}&body=${this.body}`)
    },

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
    }
  },

  created () {
    this.repo = getParameterByName('repo') || 'vuejs/vue'
  },

  watch: {
    repo (repo) {
      if (!this.versions[repo]) {
        this.fetchVersions()
      } else {
        this.attrs.version = this.versions[repo][0].id
      }
    }
  },

  mixins: [formHelper]
}

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
</script>

<style lang="scss">
$brand-primary: #4fc08d;

@import './node_modules/bootstrap/scss/variables';
@import './node_modules/bootstrap/scss/bootstrap';
@import './node_modules/bootstrap-for-vue/dist/scss/bootstrap-for-vue';

.preview {
  h1, h2 {
    font-size: 18px !important;
  }
}

@include media-breakpoint-down(md) {
  .navbar {
    padding-left: 0;
    padding-right: 0;

    > .container {
      width: 100%;
    }
  }
}
</style>
