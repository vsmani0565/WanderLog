/* eslint-disable react-hooks/set-state-in-effect, react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import { compactCountry } from '../utils/country'

const CountryListsContext = createContext(null)
const STORAGE_PREFIX = 'wanderlog-lists:'

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function createEmptyLists() {
  return { bucket: [], visited: [] }
}

function storageKey(email) {
  return `${STORAGE_PREFIX}${email}`
}

function dedupe(list) {
  const seen = new Set()
  return list.filter((item) => {
    if (!item?.code || seen.has(item.code)) return false
    seen.add(item.code)
    return true
  })
}

function toggleItem(list, country) {
  const item = compactCountry(country)
  if (!item) return list

  if (list.some((entry) => entry.code === item.code)) {
    return list.filter((entry) => entry.code !== item.code)
  }

  return dedupe([item, ...list])
}

export function CountryListsProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [lists, setLists] = useState(createEmptyLists())

  useEffect(() => {
    if (!isAuthenticated || !user?.email) {
      setLists(createEmptyLists())
      return
    }

    const stored = safeParse(localStorage.getItem(storageKey(user.email)))
    if (stored?.bucket || stored?.visited) {
      setLists({
        bucket: Array.isArray(stored.bucket) ? dedupe(stored.bucket) : [],
        visited: Array.isArray(stored.visited) ? dedupe(stored.visited) : [],
      })
      return
    }

    setLists(createEmptyLists())
  }, [isAuthenticated, user?.email])

  useEffect(() => {
    if (!isAuthenticated || !user?.email) return
    localStorage.setItem(storageKey(user.email), JSON.stringify(lists))
  }, [lists, isAuthenticated, user?.email])

  function toggleBucket(country) {
    setLists((current) => ({
      ...current,
      bucket: toggleItem(current.bucket, country),
    }))
  }

  function toggleVisited(country) {
    setLists((current) => ({
      ...current,
      visited: toggleItem(current.visited, country),
    }))
  }

  function clearLists() {
    setLists(createEmptyLists())
  }

  const bucketPopulation = lists.bucket.reduce((total, country) => total + (country.population ?? 0), 0)

  const value = useMemo(
    () => ({
      bucket: lists.bucket,
      visited: lists.visited,
      bucketCount: lists.bucket.length,
      visitedCount: lists.visited.length,
      bucketPopulation,
      hasBucketItem: (code) => lists.bucket.some((entry) => entry.code === code),
      hasVisitedItem: (code) => lists.visited.some((entry) => entry.code === code),
      toggleBucket,
      toggleVisited,
      clearLists,
    }),
    [lists, bucketPopulation],
  )

  return <CountryListsContext.Provider value={value}>{children}</CountryListsContext.Provider>
}

export function useCountryLists() {
  const context = useContext(CountryListsContext)
  if (!context) {
    throw new Error('useCountryLists must be used within CountryListsProvider')
  }
  return context
}
