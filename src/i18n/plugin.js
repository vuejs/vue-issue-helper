import marked from 'marked'
import locales from './locales/index'

export default Vue => {
  // add locale and setLang() method to root instance
  Vue.mixin({
    beforeCreate () {
      if (this.$root === this) {
        Vue.util.defineReactive(this, 'locale', locales.en)
        this.setLang = lang => {
          this.locale = locales[lang]
        }
      }
    }
  })

  // global i18n method for simple phrases in text interpolations
  Vue.prototype.i18n = function (id) {
    return this.$root.locale.phrases[id]
  }

  // component for rendering an i18n locale markdown file
  Vue.component('i18n', {
    props: ['id'],
    render (h) {
      return h('div', {
        domProps: {
          innerHTML: marked(this.$root.locale[this.id])
        }
      })
    },
    mounted: processLinks,
    updated: processLinks
  })

  function processLinks () {
    [...this.$el.querySelectorAll('a')].forEach(a => {
      // avoid interferring with form input tab focus
      a.setAttribute('tabindex', '-1')
      const href = a.getAttribute('href')
      if (href) {
        if (href.charAt(0) !== '#') {
          // make external links open in new tab
          a.setAttribute('target', '_blank')
        } else {
          // hash link, emit event
          a.addEventListener('click', () => {
            this.$emit(`click-${href.slice(1)}`)
          })
        }
      }
    })
  }
}
