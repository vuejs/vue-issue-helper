<template>
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
</template>

<script>
export default {
  props: ['repo']
}
</script>
