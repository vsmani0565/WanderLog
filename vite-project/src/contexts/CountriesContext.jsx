/* eslint-disable react-hooks/set-state-in-effect, react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCountryByCode, fetchCountries } from '../services/api'

const CountriesContext = createContext(null)

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCountries() {
    setLoading(true)
    setError('')

    try {
      const data = await fetchCountries()
      setCountries(Array.isArray(data) ? data : [])
    } catch (fetchError) {
      setError(fetchError.message || 'Unable to load countries right now.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCountries()
  }, [])

  const getCountry = useCallback(
    async (code) => {
      const normalizedCode = code?.toUpperCase?.() ?? code
      const localMatch = countries.find((country) => country.cca3 === normalizedCode)
      if (localMatch) return localMatch

      return fetchCountryByCode(normalizedCode)
    },
    [countries],
  )

  const findCountry = useCallback(
    (code) => countries.find((country) => country.cca3 === code?.toUpperCase?.()),
    [countries],
  )

  const value = useMemo(
    () => ({
      countries,
      loading,
      error,
      refetch: loadCountries,
      getCountry,
      findCountry,
    }),
    [countries, loading, error, getCountry, findCountry],
  )

  return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>
}

export function useCountries() {
  const context = useContext(CountriesContext)
  if (!context) {
    throw new Error('useCountries must be used within CountriesProvider')
  }
  return context
}
