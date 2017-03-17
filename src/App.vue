<template>
<div class="app" style="padding-top: 54px">
  <app-header :repo="repo"/>

  <div class="container py-3">
    <form class="row" @submit.prevent="generate">
      <div class="col-12 col-lg-8 offset-lg-2">
        <div class="row">
          <intro/>

          <div class="col-6">
            <input-select title="I am opening an issue for" v-model="repo" :options="repos"/>
          </div>

          <div class="col-6">
            <input-select title="This is a" v-model="type" :options="types"/>
          </div>

          <div class="col-12">
            <input-text v-model="title" title="Issue Title" required autofocus/>
          </div>

          <!-- content component -->
          <component :is="type" ref="content" :repo="repo" :title="title"/>

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
        <div class="card-block preview" style="overflow: auto" v-html="generated.html"></div>
      </div>
    </modal>
  </div>

  <footer class="text-center text-muted mb-3">
    <p>&hellip;</p>
    <small>Built with <a href="https://github.com/vuejs/vue-cli">vue-cli</a> &centerdot; Checkout source on <a
            href="https://github.com/vuejs/vue-issue">GitHub</a></small>
  </footer>
</div>
</template>

<script lang="babel">
import repos from './repos'
import { formHelper } from 'bootstrap-for-vue'

import Intro from './Intro.vue'
import AppHeader from './Header.vue'
import BugReport from './BugReport.vue'
import FeatureRequest from './FeatureRequest.vue'

export default {
  name: 'App',

  mixins: [formHelper],

  components: {
    Intro,
    AppHeader,
    BugReport,
    FeatureRequest
  },

  data: () => ({
    title: '',
    generated: {
      markdown: '',
      html: ''
    },
    show: false,
    preview: false,
    repo: '',
    repos,
    type: 'bug-report',
    types: [
      { id: 'bug-report', name: 'Bug Report' },
      { id: 'feature-request', name: 'Feature Request' }
    ],
    versions: {}
  }),

  methods: {
    generate () {
      this.generated = this.$refs.content.generate()
      this.show = true
    },

    create () {
      const title = encodeURIComponent(this.title).replace(/%2B/gi, '+')
      const body = encodeURIComponent(this.generated.markdown).replace(/%2B/gi, '+')
      const label = this.type === 'feature-request' ? '&labels=feature%20request' : ''
      window.open(`https://github.com/${this.repo}/issues/new?title=${title}&body=${body}${label}`)
    },
  },

  created () {
    const results = window.location.href.match(/[?&]repo(=([^&#]*)|&|#|$)/)
    if (results && results[2]) {
      this.repo = decodeURIComponent(results[2].replace(/\+/g, " "))
    } else {
      this.repo = 'vuejs/vue'
    }
  }
}
</script>

<style lang="scss">
$brand-primary: #4fc08d;

@import './node_modules/bootstrap/scss/variables';
@import './node_modules/bootstrap/scss/bootstrap';
@import './node_modules/bootstrap-for-vue/dist/scss/bootstrap-for-vue';

.preview {
  font-size: 0.9rem;
  h1, h2, h3 {
    font-size: 18px !important;
  }
  pre {
    padding: 15px 20px;
    background-color: #f3f3f3;
    border-radius: 4px;
  }
}

.app {
  input, textarea {
    font-size: 0.9rem;
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
