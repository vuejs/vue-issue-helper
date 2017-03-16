<template>
  <div class="col-12" style="padding:0">
    <div class="col-12">
      <input-textarea
        v-model="attrs.rationale"
        title="What problem does this feature solve?"
        required
        subtitle="yes">
        <p slot="subtitle">
          Explain your use case, context and rationale behind this feature request.
          An important design goal of Vue is keeping the API surface small and
          straighforward. In general, we only consider adding new features that
          solve a problem that cannot be easily dealt with using existing APIs
          (i.e. not just an alternative way of doing things that can already be
          done). The problem should also be common enough to justify the addition.
        </p>
      </input-textarea>
    </div>

    <div class="col-12">
      <input-textarea
        v-model="attrs.proposal"
        title="What does the proposed API look like?"
        required
        subtitle="yes">
        <p slot="subtitle">
          Describe how you propose to solve the problem, and provide code
          samples of how the API would work once implemented. Note you can use
          <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
           Markdown
          </a> to format your code blocks.
        </p>
      </input-textarea>
    </div>
  </div>
</template>

<script>
import { generate } from './generate'

export default {
  data: () => ({
    attrs: {
      rationale: '',
      proposal: ''
    }
  }),

  methods: {
    generate () {
      const { rationale, proposal } = this.attrs

      return generate(`
### What problem does this feature solve?
${rationale}

### What does the proposed API look like?
${proposal}
  `.trim())
    }
  }
}
</script>
