import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ArrowRightIcon, GlobeIcon } from './Icons'

const initialForm = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
}

const signupForm = {
  email: 'sydney@fife',
  password: 'pistol',
}

export default function AuthPage({ mode = 'login' }) {
  const isSignup = mode === 'signup'
  const { signIn, signUp, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState(() => (isSignup ? signupForm : initialForm))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirectTo = location.state?.from?.pathname || '/app'

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true })
    }
  }, [isAuthenticated, navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignup) {
        await signUp(form.email.trim(), form.password)
      } else {
        await signIn(form.email.trim(), form.password)
      }

      navigate(redirectTo, { replace: true })
    } catch (authError) {
      setError(authError.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-brand-panel">
        <div className="brand-mark brand-mark--hero">
          <GlobeIcon className="brand-mark__icon" />
        </div>
        <h1>WanderLog</h1>
        <p>Your travel bucket list, powered by real-world data.</p>
        <div className="auth-highlights">
          <div>
            <span>Explore</span>
            <strong>Search, filter, and sort countries.</strong>
          </div>
          <div>
            <span>Plan</span>
            <strong>Save bucket-list places and visited countries.</strong>
          </div>
          <div>
            <span>Persist</span>
            <strong>Your session and lists stay in localStorage.</strong>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-card__header">
          <span className="eyebrow">{isSignup ? 'Create account' : 'Welcome back'}</span>
          <h2>{isSignup ? 'Start your travel plan' : 'Sign in to continue'}</h2>
          <p>
            Use the Reqres demo credential <strong>eve.holt@reqres.in</strong> with any password for a
            successful auth flow on login. For sign up, use <strong>sydney@fife</strong> with <strong>pistol</strong>.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="eve.holt@reqres.in"
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Any password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
              minLength="4"
            />
          </label>

          {error ? <div className="form-alert form-alert--error">{error}</div> : null}

          <button className="primary-button primary-button--wide" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Sign in'}
            <ArrowRightIcon className="button-icon" />
          </button>
        </form>

        <div className="auth-card__footer">
          <p>
            {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
            <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Sign in' : 'Create account'}</Link>
          </p>
          <p className="fine-print">
            Reqres only accepts a fixed test set for success responses. Error handling is built in on
            purpose.
          </p>
        </div>
      </section>
    </main>
  )
}
