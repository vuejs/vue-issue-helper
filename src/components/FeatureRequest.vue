<template>
  <div class="col-12" style="padding:0">
    <div class="col-12">
      <input-textarea
        v-model="attrs.rationale"
        :title="i18n('rationale-title')"
        required
        subtitle="yes">
        <i18n slot="subtitle" id="rationale-subtitle"/>
      </input-textarea>
    </div>

    <div class="col-12">
      <input-textarea
        v-model="attrs.proposal"
        :title="i18n('proposal-title')"
        required
        subtitle="yes">
        <i18n slot="subtitle" id="proposal-subtitle"/>
      </input-textarea>
    </div>
  </div>
</template>

<script>
import { generate } from '../helpers'

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
