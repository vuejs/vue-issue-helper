<template>
  <div class="col-12 intro bg-faded">
    <render-copy id="intro" @click-policy="show = true"/>
    <modal :open="show" @close="show = false">
      <div class="card">
        <render-copy class="card-header" id="policy-title"/>
        <render-copy class="card-block" id="policy"/>
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
  padding: 1.5em 2em;
  border-radius: 4px;
  margin: 0 15px 15px;
  h2 {
    font-size: 1.6em;
  }
}
</style>
