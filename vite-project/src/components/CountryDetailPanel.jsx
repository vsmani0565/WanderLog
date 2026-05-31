import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCountries } from '../contexts/CountriesContext'
import { useCountryLists } from '../contexts/CountryListsContext'
import {
  AreaIcon,
  BackIcon,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  HeartIcon,
  MapPinIcon,
  MoneyIcon,
  UsersIcon,
} from './Icons'
import {
  formatArea,
  formatPopulation,
  getCapital,
  getContinents,
  getCountryName,
  getCurrencies,
  getFlag,
  getLanguages,
  getRegion,
  getTimezones,
} from '../utils/country'
import { fetchCountryByCode } from '../services/api'

function StatItem({ icon, label, value }) {
  return (
    <div className="detail-stat">
      <span className="detail-stat__icon">{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  )
}

function ListBlock({ title, items, emptyText }) {
  return (
    <div className="list-block">
      <div className="list-block__header">
        <strong>{title}</strong>
        <span>{items.length}</span>
      </div>
      {items.length > 0 ? (
        <div className="list-block__items">
          {items.map((item) => (
            <Link key={item.code} className="list-pill" to={`/app/country/${item.code}`}>
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="list-block__empty">{emptyText}</p>
      )}
    </div>
  )
}

export default function CountryDetailPanel() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { getCountry, findCountry } = useCountries()
  const {
    bucket,
    visited,
    bucketCount,
    visitedCount,
    bucketPopulation,
    hasBucketItem,
    hasVisitedItem,
    toggleBucket,
    toggleVisited,
    clearLists,
  } = useCountryLists()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(Boolean(code))
  const [error, setError] = useState('')

  const localCountry = useMemo(() => (code ? findCountry(code) : null), [code, findCountry])

  useEffect(() => {
    let active = true

    async function loadCountry() {
      if (!code) {
        setCountry(null)
        setLoading(false)
        setError('')
        return
      }

      setLoading(true)
      setError('')

      try {
        const data = (await fetchCountryByCode(code)) ?? localCountry ?? (await getCountry(code))
        if (!active) return
        setCountry(data ?? null)
      } catch (countryError) {
        if (!active) return
        setError(countryError.message || 'Unable to load country details.')
        setCountry(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCountry()

    return () => {
      active = false
    }
  }, [code, getCountry, localCountry])

  const neighborCountries = useMemo(() => {
    if (!country?.borders?.length) return []
    return country.borders
      .map((borderCode) => findCountry(borderCode) ?? { cca3: borderCode, name: { common: borderCode } })
      .filter(Boolean)
      .slice(0, 8)
  }, [country, findCountry])

  if (!code) {
    return (
      <section className="panel panel--detail panel--detail-empty">
        <div className="detail-hero detail-hero--empty">
          <div className="detail-hero__copy">
            <span className="eyebrow">Country detail</span>
            <h2>Select a country to inspect the full profile</h2>
            <p>
              Choose any country card on the left to see its flag, population, currencies, timezones,
              neighboring countries, and one-click bucket-list actions.
            </p>
            <div className="detail-actions">
              <button type="button" className="primary-button" onClick={() => navigate('/app/country/JPN')}>
                Open a sample country
              </button>
              <button type="button" className="secondary-button" onClick={clearLists}>
                Clear my lists
              </button>
            </div>
          </div>
          <div className="detail-hero__list-wrap">
            <div className="summary-card">
              <div className="summary-card__top">
                <span>Bucket list</span>
                <strong>{bucketCount}</strong>
              </div>
              <p>{formatPopulation(bucketPopulation)} people across saved destinations.</p>
            </div>
            <div className="summary-card">
              <div className="summary-card__top">
                <span>Visited</span>
                <strong>{visitedCount}</strong>
              </div>
              <p>{visited.length > 0 ? 'Your explored destinations are persisted here.' : 'No visited countries yet.'}</p>
            </div>
          </div>
        </div>

        <ListBlock title="Bucket list" items={bucket} emptyText="Save countries from the grid to build your travel plan." />
        <ListBlock title="Visited" items={visited} emptyText="Mark places you have already visited." />
      </section>
    )
  }

  if (loading) {
    return (
      <section className="panel panel--detail panel--detail-empty">
        <div className="loading-panel">Loading country detail...</div>
      </section>
    )
  }

  if (error || !country) {
    return (
      <section className="panel panel--detail panel--detail-empty">
        <div className="error-panel">
          <strong>Country detail unavailable.</strong>
          <p>{error || 'The selected country could not be found.'}</p>
          <button type="button" className="primary-button" onClick={() => navigate('/app')}>
            Back to explore
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="panel panel--detail">
      <div className="detail-topbar">
        <button type="button" className="ghost-button ghost-button--compact" onClick={() => navigate('/app')}>
          <BackIcon className="button-icon" />
          Back
        </button>
        <span className="eyebrow">Country detail</span>
      </div>

      <div className="detail-hero">
        <div className="detail-hero__flag">
          <img src={getFlag(country)} alt={`${getCountryName(country)} flag`} />
        </div>
        <div className="detail-hero__copy">
          <h2>{getCountryName(country)}</h2>
          <p className="detail-subtitle">
            <MapPinIcon className="inline-icon" />
            {getCapital(country)} • {getRegion(country)}
          </p>
          <div className="detail-actions">
            <button type="button" className={`primary-button ${hasBucketItem(country.cca3) ? 'primary-button--active' : ''}`} onClick={() => toggleBucket(country)}>
              <HeartIcon className="button-icon" />
              {hasBucketItem(country.cca3) ? 'Saved to bucket' : 'Add to bucket list'}
            </button>
            <button type="button" className={`secondary-button ${hasVisitedItem(country.cca3) ? 'secondary-button--active' : ''}`} onClick={() => toggleVisited(country)}>
              <CheckIcon className="button-icon" />
              {hasVisitedItem(country.cca3) ? 'Marked visited' : 'Mark as visited'}
            </button>
          </div>
        </div>
      </div>

      <div className="detail-stats-grid">
        <StatItem icon={<UsersIcon className="button-icon" />} label="Population" value={formatPopulation(country.population)} />
        <StatItem icon={<AreaIcon className="button-icon" />} label="Area" value={formatArea(country.area)} />
        <StatItem icon={<GlobeIcon className="button-icon" />} label="Continent" value={getContinents(country)} />
        <StatItem icon={<MoneyIcon className="button-icon" />} label="Currencies" value={getCurrencies(country)} />
        <StatItem icon={<ClockIcon className="button-icon" />} label="Timezones" value={getTimezones(country)} />
        <StatItem icon={<MapPinIcon className="button-icon" />} label="Languages" value={getLanguages(country)} />
      </div>

      <div className="detail-info-grid">
        <div>
          <span>Subregion</span>
          <strong>{country.subregion ?? 'Unknown'}</strong>
        </div>
        <div>
          <span>Capital</span>
          <strong>{getCapital(country)}</strong>
        </div>
        <div>
          <span>Region</span>
          <strong>{getRegion(country)}</strong>
        </div>
        <div>
          <span>Country code</span>
          <strong>{country.cca3}</strong>
        </div>
      </div>

      <div className="neighbor-list">
        <div className="list-block__header">
          <strong>Neighboring countries</strong>
          <span>{neighborCountries.length}</span>
        </div>
        {neighborCountries.length > 0 ? (
          <div className="list-block__items">
            {neighborCountries.map((neighbor) => (
              <button key={neighbor.cca3} type="button" className="list-pill" onClick={() => navigate(`/app/country/${neighbor.cca3}`)}>
                {neighbor.name.common}
              </button>
            ))}
          </div>
        ) : (
          <p className="list-block__empty">No border data is available for this country.</p>
        )}
      </div>

      <div className="detail-lists-grid">
        <ListBlock title="Bucket list" items={bucket} emptyText="Your bucket list is empty right now." />
        <ListBlock title="Visited" items={visited} emptyText="No visited countries yet." />
      </div>
    </section>
  )
}
