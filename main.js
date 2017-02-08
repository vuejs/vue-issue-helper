import Vue from 'vue'
import BootstrapForVue from 'bootstrap-for-vue'

import App from './App.vue'

window.jQuery = window.$ = require('jquery')
window.Tether = require('tether')
require('bootstrap')

Vue.use(BootstrapForVue, { all: true, custom: true })

new Vue({
  el: '#app',
  ...App
})
