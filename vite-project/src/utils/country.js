const formatter = new Intl.NumberFormat('en-US')

export function formatPopulation(value) {
  if (value == null) return 'Unknown'
  return formatter.format(value)
}

export function formatArea(value) {
  if (value == null) return 'Unknown'
  return `${formatter.format(Math.round(value))} km²`
}

export function getCountryName(country) {
  return country?.name?.common ?? 'Unknown country'
}

export function getCapital(country) {
  return country?.capital?.[0] ?? 'Unknown'
}

export function getFlag(country) {
  return country?.flags?.svg || country?.flags?.png || ''
}

export function getRegion(country) {
  return country?.region ?? 'Unknown'
}

export function getCurrencies(country) {
  const currencies = country?.currencies ?? {}
  const labels = Object.entries(currencies).map(([code, value]) => `${value?.name ?? code} (${code})`)
  return labels.length > 0 ? labels.join(', ') : 'Unknown'
}

export function getLanguages(country) {
  const languages = country?.languages ?? {}
  const labels = Object.values(languages)
  return labels.length > 0 ? labels.join(', ') : 'Unknown'
}

export function getTimezones(country) {
  const timezones = country?.timezones ?? []
  return timezones.length > 0 ? timezones.join(', ') : 'Unknown'
}

export function getContinents(country) {
  const continents = country?.continents ?? []
  return continents.length > 0 ? continents.join(', ') : 'Unknown'
}

export function compactCountry(country) {
  if (!country) return null

  return {
    code: country.cca3,
    name: getCountryName(country),
    capital: getCapital(country),
    region: getRegion(country),
    population: country.population ?? 0,
    flag: getFlag(country),
  }
}

export function compareText(a, b) {
  return a.localeCompare(b, undefined, { sensitivity: 'base' })
}
