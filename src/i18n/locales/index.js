const langContext = require.context('./', true, /\.(md|js)$/)
const allFiles = langContext.keys()

const locales = {}

allFiles.forEach(file => {
  const match = file.match(/^\.\/(\w+)\/(.*)\.(md|js)$/)
  if (!match) return
  const [_, lang, name] = match
  if (!locales[lang]) {
    locales[lang] = {}
  }
  locales[lang][name] = langContext(file)
})

export default locales
