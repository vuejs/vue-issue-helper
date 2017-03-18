import marked from 'marked'
import locales from './locales/index'

export default Vue => {
  // add locale and setLang() method to root instance
  Vue.mixin({
    beforeCreate () {
      if (this.$root === this) {
        Vue.util.defineReactive(this, 'locale', locales['zh-cn'])
        this.setLang = lang => {
          this.locale = locales[lang]
        }
      }
    }
  })

  // global i18n method for simple phrases in text interpolations
  Vue.prototype.i18n = function (id) {
    return this.$root.locale[id] || '!!! i18n content not found !!!'
  }

  // component for rendering an i18n locale markdown file
  Vue.component('i18n', {
    props: ['id'],
    render (h) {
      const content = this.$root.locale[this.id]
      return h('div', {
        domProps: {
          innerHTML: content
            ? marked(content.trim())
            : '<div style="color:red">i18n content not found</div>'
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
