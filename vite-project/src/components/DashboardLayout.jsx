import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCountries } from '../contexts/CountriesContext'
import { useCountryLists } from '../contexts/CountryListsContext'
import { GlobeIcon, LogoutIcon } from './Icons'
import { formatPopulation } from '../utils/country'
import ExplorePanel from './ExplorePanel'

export default function DashboardLayout() {
  const { user, signOut } = useAuth()
  const { countries } = useCountries()
  const { bucketCount, visitedCount, bucketPopulation } = useCountryLists()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand-lockup" to="/app" aria-label="WanderLog home">
          <span className="brand-mark">
            <GlobeIcon className="brand-mark__icon" />
          </span>
          <span>
            <strong>WanderLog</strong>
            <small>Your journey. Your bucket list.</small>
          </span>
        </Link>

        <div className="topbar__stats">
          <div className="stat-chip">
            <span>Countries</span>
            <strong>{countries.length || '—'}</strong>
          </div>
          <div className="stat-chip">
            <span>Bucket list</span>
            <strong>{bucketCount}</strong>
          </div>
          <div className="stat-chip">
            <span>Visited</span>
            <strong>{visitedCount}</strong>
          </div>
          <div className="stat-chip">
            <span>Coverage</span>
            <strong>{formatPopulation(bucketPopulation)}</strong>
          </div>
        </div>

        <div className="topbar__user">
          <div>
            <span className="topbar__greeting">Signed in as</span>
            <strong>{user?.email}</strong>
          </div>
          <button className="ghost-button" type="button" onClick={handleLogout}>
            <LogoutIcon className="button-icon" />
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="dashboard-grid__browse">
          <ExplorePanel />
        </section>
        <aside className="dashboard-grid__detail">
          <Outlet />
        </aside>
      </main>
    </div>
  )
}
