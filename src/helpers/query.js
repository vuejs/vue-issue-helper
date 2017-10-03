import qs from 'qs'

export function getQuery () {
  return qs.parse(window.location.search.slice(1))
}

export function updateQuery (query) {
  window.location.search = qs.stringify(
    { ...getQuery(), ...query },
    { encode: false }
  )
}
