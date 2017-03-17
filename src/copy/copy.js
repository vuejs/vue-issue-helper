const langContext = require.context('./', true, /\.md$/)
const allFiles = langContext.keys()

const langs = {}
allFiles.forEach(file => {
  const [_, lang, name] = file.match(/^\.\/(\w+)\/(.*)\.md$/)
  if (!langs[lang]) {
    langs[lang] = {}
  }
  langs[lang][name] = langContext(file)
})

export default langs
