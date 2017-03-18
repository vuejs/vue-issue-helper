const langContext = require.context('./', true, /\.(md|js)$/)
const locales = {}

langContext.keys().forEach(file => {
  if (/index\.js$/.test(file)) {
    const match = file.match(/^\.\/(\w+)\/(.*)\.js$/)
    if (match) {
      const lang = match[1]
      locales[lang] = langContext(file)
    }
  }
})

export default locales
