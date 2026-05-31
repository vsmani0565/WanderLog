import { useMemo, useState } from 'react'
import CountryCard from './CountryCard'
import { RefreshIcon, SearchIcon, SortIcon } from './Icons'
import { compareText, getCountryName } from '../utils/country'
import { useCountries } from '../contexts/CountriesContext'
import { useCountryLists } from '../contexts/CountryListsContext'

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'population', label: 'Population' },
  { value: 'area', label: 'Area' },
]

export default function ExplorePanel() {
  const { countries, loading, error, refetch } = useCountries()
  const { bucket, visited, hasBucketItem, hasVisitedItem, toggleBucket, toggleVisited } = useCountryLists()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  const visibleCountries = useMemo(() => {
    const searchText = query.trim().toLowerCase()

    return [...countries]
      .filter((country) => {
        const matchesQuery = !searchText || getCountryName(country).toLowerCase().includes(searchText)
        const matchesRegion = region === 'All' || country.region === region
        return matchesQuery && matchesRegion
      })
      .sort((a, b) => {
        if (sortBy === 'population') return (b.population ?? 0) - (a.population ?? 0)
        if (sortBy === 'area') return (b.area ?? 0) - (a.area ?? 0)
        return compareText(getCountryName(a), getCountryName(b))
      })
  }, [countries, query, region, sortBy])

  return (
    <section className="panel panel--browse">
      <div className="panel__header">
        <div>
          <span className="eyebrow">Explore</span>
          <h2>Find your next destination</h2>
          <p>Search countries, filter by region, and save places to your bucket list or visited stack.</p>
        </div>

        <button className="ghost-button" type="button" onClick={refetch}>
          <RefreshIcon className="button-icon" />
          Refresh
        </button>
      </div>

      <div className="explore-controls">
        <label className="search-box">
          <SearchIcon className="button-icon search-box__icon" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search countries..."
          />
        </label>

        <div className="select-group">
          <label>
            <span>
              <SortIcon className="button-icon" /> Sort
            </span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Region</span>
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="chip-row">
        {regions.map((item) => (
          <button
            key={item}
            type="button"
            className={`filter-chip ${region === item ? 'filter-chip--active' : ''}`}
            onClick={() => setRegion(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mini-stats">
        <div className="mini-stat">
          <span>Showing</span>
          <strong>{visibleCountries.length}</strong>
        </div>
        <div className="mini-stat">
          <span>Bucket list</span>
          <strong>{bucket.length}</strong>
        </div>
        <div className="mini-stat">
          <span>Visited</span>
          <strong>{visited.length}</strong>
        </div>
      </div>

      {loading ? <div className="loading-panel">Loading countries from REST Countries...</div> : null}
      {error ? (
        <div className="error-panel">
          <strong>Could not load countries.</strong>
          <p>{error}</p>
          <button type="button" className="primary-button" onClick={refetch}>
            Try again
          </button>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="country-grid">
          {visibleCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              bucketed={hasBucketItem(country.cca3)}
              visited={hasVisitedItem(country.cca3)}
              onToggleBucket={toggleBucket}
              onToggleVisited={toggleVisited}
            />
          ))}
        </div>
      ) : null}

      {!loading && !error && visibleCountries.length === 0 ? (
        <div className="empty-state">
          <strong>No countries match that filter.</strong>
          <p>Try a different search term or reset the region filter.</p>
        </div>
      ) : null}
    </section>
  )
}
