<template>
  <div class="feature-request">
    <div class="common-fields">
      <VueFormField
        :title="i18n('rationale-title')"
      >
        <VueInput
          type="textarea"
          rows="4"
          v-model="attrs.rationale"
          required
        />
        <i18n slot="subtitle" id="rationale-subtitle"/>
      </VueFormField>

      <VueFormField
        :title="i18n('proposal-title')"
      >
        <VueInput
          type="textarea"
          rows="4"
          v-model="attrs.proposal"
          required
        />
        <i18n slot="subtitle" id="proposal-subtitle"/>
      </VueFormField>
    </div>
  </div>
</template>

<script>
import { generate } from '../helpers'

export default {
  data () {
    return {
      attrs: {
        rationale: '',
        proposal: ''
      },
    }
  },

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
