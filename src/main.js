import Vue from 'vue'
import VueResource from 'vue-resource'
import BootstrapForVue from 'bootstrap-for-vue'
import RenderCopy from './copy/RenderCopy'

import App from './components/App.vue'

window.jQuery = window.$ = require('jquery')
window.Tether = require('tether')
require('bootstrap')

Vue.use(BootstrapForVue, { all: true, custom: true })
Vue.use(VueResource)
Vue.component('render-copy', RenderCopy)

new Vue({
  el: '#app',
  ...App
})
