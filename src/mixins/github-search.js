const API_ENDPOINT = 'https://api.github.com/search/issues'

function toArray(any) {
  return Array.isArray(any) ? any : [any]
}

export default {
  data: () => ({ _issues: [], showingAllIssues: false }),

  computed: {
    issues () {
      const issues = this.$data._issues
      const all = this.showingAllIssues

      return all ? issues : issues.slice(0, 5)
    }
  }
  ,

  methods: {
    async fetchIssues(term, filters) {
      const q = Object.keys(filters).map(
              key => toArray(filters[key]).map(value => `${key}:${value}`).join(' ')
          ).join(' ') + ' ' + term

      try {
        const response = await this.$http.get(API_ENDPOINT, { params: { q } })
        const { items } = await response.json()

        this.$data._issues = items || []
      } catch (e) {
        // ignore
      }
    }
  }
}