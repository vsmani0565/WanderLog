/* eslint-disable react-hooks/set-state-in-effect, react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginRequest, registerRequest } from '../services/api'

const AuthContext = createContext(null)
const STORAGE_KEY = 'wanderlog-auth'

function buildUser(email, mode) {
  const name = email.split('@')[0].replace(/[._-]/g, ' ')
  return {
    email,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    mode,
  }
}

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    ready: false,
    token: null,
    user: null,
  })

  useEffect(() => {
    const stored = safeParse(localStorage.getItem(STORAGE_KEY))
    if (stored?.token && stored?.user?.email) {
      setState({ ready: true, token: stored.token, user: stored.user })
      return
    }

    setState((current) => ({ ...current, ready: true }))
  }, [])

  useEffect(() => {
    if (!state.ready) return

    if (state.token && state.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: state.token, user: state.user }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [state])

  async function signIn(email, password) {
    const payload = await loginRequest(email, password)
    const user = buildUser(email, 'login')
    setState({ ready: true, token: payload.token, user })
    return { token: payload.token, user }
  }

  async function signUp(email, password) {
    const payload = await registerRequest(email, password)
    const user = buildUser(email, 'signup')
    setState({ ready: true, token: payload.token, user })
    return { token: payload.token, user }
  }

  function signOut() {
    setState({ ready: true, token: null, user: null })
  }

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token && state.user),
      signIn,
      signUp,
      signOut,
    }),
    [state],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
