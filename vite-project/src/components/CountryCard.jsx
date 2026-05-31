import { useNavigate } from 'react-router-dom'
import { HeartIcon, CheckIcon, MapPinIcon, UsersIcon } from './Icons'
import { formatPopulation, getCapital, getCountryName, getFlag, getRegion } from '../utils/country'

export default function CountryCard({ country, bucketed, visited, onToggleBucket, onToggleVisited }) {
  const navigate = useNavigate()

  function openDetail() {
    navigate(`/app/country/${country.cca3}`)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openDetail()
    }
  }

  return (
    <article className="country-card" role="button" tabIndex={0} onClick={openDetail} onKeyDown={handleKeyDown}>
      <div className="country-card__flag" aria-hidden="true">
        <img src={getFlag(country)} alt="" />
      </div>

      <div className="country-card__body">
        <div className="country-card__title-row">
          <h3>{getCountryName(country)}</h3>
          <span className={`mini-status ${visited ? 'mini-status--active' : ''}`}>{visited ? 'Visited' : 'Open'}</span>
        </div>

        <div className="country-card__meta">
          <span>
            <MapPinIcon className="inline-icon" />
            {getCapital(country)}
          </span>
          <span>
            <UsersIcon className="inline-icon" />
            {formatPopulation(country.population)}
          </span>
          <span>{getRegion(country)}</span>
        </div>
      </div>

      <div className="country-card__footer">
        <button
          type="button"
          className={`chip-action ${bucketed ? 'chip-action--active' : ''}`}
          onClick={(event) => {
            event.stopPropagation()
            onToggleBucket(country)
          }}
        >
          <HeartIcon className="inline-icon" />
          {bucketed ? 'Saved' : 'Bucket'}
        </button>

        <button
          type="button"
          className={`chip-action ${visited ? 'chip-action--active' : ''}`}
          onClick={(event) => {
            event.stopPropagation()
            onToggleVisited(country)
          }}
        >
          <CheckIcon className="inline-icon" />
          {visited ? 'Visited' : 'Done'}
        </button>
      </div>
    </article>
  )
}
