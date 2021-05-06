import { createApp } from 'vue'
import i18n from './i18n/plugin'
import VueUi from '@vue/ui'
import App from './components/App.vue'

const app = createApp(App)

app.use(i18n)
app.use(VueUi)

window.addEventListener('dragover', e => {
  e.preventDefault()
})

window.addEventListener('drop', e => {
  e.preventDefault()
  alert(root.i18n('drop-warn'))
})

const root = app.mount('#app')
