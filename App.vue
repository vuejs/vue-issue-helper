<template lang="html">
  <div class="app" style="padding-top: 54px">
    <nav class="navbar navbar-light fixed-top bg-faded mb-3">
      <div class="container d-flex">
        <a class="navbar-brand" href="#">Vue Issue Helper</a>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link ml-auto" href="https://github.com/vuejs/vue/issues/new" target="_blank">Create Issue</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container py-3">
      <form class="row" @submit.prevent="generate">
        <div class="col-12 col-lg-8 offset-lg-2">
          <div class="row">
            <div class="col-12 col-lg-4">
              <input-select v-model="attrs.version" title="Version" :options="versions" required />
            </div>

            <div class="col-12 col-lg-8">
              <input-text type="url" v-model="attrs.reproduction" title="Reproduction Link" required autofocus />
            </div>

            <div class="col-12">
              <input-textarea v-model="attrs.steps" title="Steps to reproduce" required />
            </div>

            <div class="col-12 col-lg-6">
              <input-textarea v-model="attrs.expected" title="What is Expected?" required />
            </div>

            <div class="col-12 col-lg-6">
              <input-textarea v-model="attrs.actual" title="What is actually happening?" required />
            </div>

            <div class="col-12 col-lg-6">
              <checkbox-wrapper title="Show preview?">
                <input-box v-model="preview" title="Yes" :checkbox="true" inline/>
                <input-box v-model="preview" title="No" :checkbox="false" inline/>
              </checkbox-wrapper>
            </div>

            <div class="col-12 my-3 py-3 text-center">
              <input-button type="submit" :class="{ disabled: message }">{{ message || 'Generate & Copy' }}</input-button>
            </div>
          </div>
        </div>
      </form>

      <modal :open="show" @close="show = false" wrapper="bootstrap-for-vue-CustomModal-wrapper-default">
        <div class="card">
          <h5 class="card-header preview">Issue Preview</h5>
          <div class="card-block" style="overflow: auto" v-html="contentHtml"></div>
        </div>
      </modal>
    </div>

    <footer class="text-center text-muted mb-3">
      <p>&hellip;</p>
      <small>Built with <a href="https://github.com/vuejs/vue-cli">vue-cli</a> &centerdot; Checkout source on <a href="https://github.com/znck/vue-issue">Github</a></small>
    </footer>
  </div>
</template>

<script lang="babel">
import { formHelper } from 'bootstrap-for-vue'
import copy from 'copy-to-clipboard'
import marked from 'marked'

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
      version: '2.0.2',
      reproduction: '',
      steps: '',
      expected: '',
      actual: ''
    },
    content: '',
    show: false,
    preview: false,
    message: ''
  }),

  computed: {
    versions: () => [
      '2.0.1',
      '2.0.2',
    ].map(v => ({ id: v, name: v })),

    contentHtml () {
      return marked(this.content)
    }
  },

  methods: {
    generate () {
      this.content =
      `
## Vue.js Verion
${this.attrs.version}

## Reproduction Link
[${this.attrs.reproduction}](${this.attrs.reproduction})

## Steps to Reproduce
- ${this.attrs.steps.split('\n').join('\n- ')}

## What is expected?
${this.attrs.expected}

## What is actually happening?
${this.attrs.actual}
      `.trim()

      try {
        copy(this.content)
        this.message = 'Copied!'
      } catch (e) {}

      setTimeout(() => {
        this.message = ''
      }, 4000)

      if (this.preview) {
        this.show = true
      }
    }
  },

  mixins: [formHelper]
}
</script>

<style src="./node_modules/bootstrap/dist/css/bootstrap.min.css"></style>
<style src="./node_modules/bootstrap-for-vue/dist/bootstrap-for-vue.min.css"></style>
<style lang="css">
.preview h1, .preview h2 {
  font-size: 18px;
}
</style>
