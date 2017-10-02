import Vue from 'vue'
import i18n from './i18n/plugin'
import VueResource from 'vue-resource'
import BootstrapForVue from 'bootstrap-for-vue'

import App from './components/App.vue'

window.jQuery = window.$ = require('jquery')
window.Tether = require('tether')
require('bootstrap')

Vue.use(i18n)
Vue.use(VueResource)
Vue.use(BootstrapForVue, { all: true, custom: true })

window.addEventListener('dragover', e => {
  e.preventDefault()
})

window.addEventListener('drop', e => {
  e.preventDefault()
  alert(app.i18n('drop-warn'))
})

const app = new Vue({
  el: '#app',
  ...App
})
