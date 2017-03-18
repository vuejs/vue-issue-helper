<template>
  <div class="col-12">
    <i18n id="intro" class="intro bg-faded" @click-modal="show = true"/>
    <modal :open="show" @close="show = false">
      <div class="card">
        <div class="card-header">
          <h4 class="mb-0">{{ i18n('intro-modal-title') }}</h4>
        </div>
        <i18n class="card-block" id="intro-modal"/>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  })
}
</script>

<style lang="scss">
.intro {
  font-size: .9em;
  padding: 1.5em 2em .5em;
  border-radius: 4px;
  margin-bottom: 15px;
  h2 {
    font-size: 1.6em;
  }
}
</style>
