import marked from 'marked'
import copies from './copy'

const lang = 'en' // TODO

export default {
  props: ['id'],
  render (h) {
    return h('div', {
      domProps: {
        innerHTML: marked(copies[lang][this.id], {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        })
      }
    })
  },
  mounted () {
    [...this.$el.querySelectorAll('a')].forEach(a => {
      a.setAttribute('tabindex', '-1')
      const href = a.getAttribute('href')
      if (href) {
        if (href.charAt(0) !== '#') {
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
