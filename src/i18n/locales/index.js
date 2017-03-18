const langContext = require.context('./', true, /\.js$/)
const locales = {}

langContext.keys().forEach(file => {
  const match = file.match(/^\.\/([\w-_$]+)\/index\.js$/)
  if (match) {
    const lang = match[1]
    locales[lang] = langContext(file)
  }
})

export default locales
