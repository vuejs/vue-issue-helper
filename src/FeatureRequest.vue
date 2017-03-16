<template>
  <div class="col-12" style="padding:0">
    <div class="col-12">
      <input-textarea
        v-model="attrs.rationale"
        title="Rationale"
        required
        subtitle="yes">
        <div slot="subtitle">
          Why?
        </div>
      </input-textarea>
    </div>
  </div>
</template>

<script>
import { generate } from './generate'

export default {
  data: () => ({
    attrs: {
      rationale: ''
    }
  }),

  methods: {
    generate () {
      const { rationale } = this.attrs

      return generate(`
### Rationale
${rationale}
  `.trim())
    }
  }
}
</script>
