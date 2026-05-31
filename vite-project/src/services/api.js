const REQRES_URL = 'https://reqres.in/api'
const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1'
const REQRES_API_KEY = import.meta.env.VITE_REQRES_API_KEY?.trim()
const COUNTRY_FIELDS = [
  'name',
  'cca3',
  'capital',
  'region',
  'subregion',
  'population',
  'area',
  'flags',
  'continents',
  'borders',
].join(',')

function createToken(prefix, email) {
  const seed = `${prefix}:${email}:${Date.now()}:${Math.random().toString(36).slice(2)}`
  return btoa(seed).replace(/=+$/g, '')
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = payload?.error || payload?.message || 'Something went wrong. Please try again.'
    throw new Error(message)
  }

  return payload
}

function mockLogin(email, password) {
  if (email !== 'eve.holt@reqres.in' || !password) {
    throw new Error('Invalid email or password')
  }

  return {
    token: createToken('login', email),
  }
}

function mockRegister(email, password) {
  if (email !== 'sydney@fife' || !password) {
    throw new Error('Invalid email or password')
  }

  return {
    id: Math.floor(Math.random() * 9000) + 1000,
    token: createToken('register', email),
  }
}

export function loginRequest(email, password) {
  if (!REQRES_API_KEY) {
    return Promise.resolve(mockLogin(email, password))
  }

  return requestJson(`${REQRES_URL}/login`, {
    method: 'POST',
    headers: {
      'x-api-key': REQRES_API_KEY,
      'X-Reqres-Env': 'prod',
    },
    body: JSON.stringify({ email, password }),
  })
}

export function registerRequest(email, password) {
  if (!REQRES_API_KEY) {
    return Promise.resolve(mockRegister(email, password))
  }

  return requestJson(`${REQRES_URL}/register`, {
    method: 'POST',
    headers: {
      'x-api-key': REQRES_API_KEY,
      'X-Reqres-Env': 'prod',
    },
    body: JSON.stringify({ email, password }),
  })
}

export async function fetchCountries() {
  return requestJson(`${REST_COUNTRIES_URL}/all?fields=${COUNTRY_FIELDS}`)
}

export async function fetchCountryByCode(code) {
  const payload = await requestJson(`${REST_COUNTRIES_URL}/alpha/${encodeURIComponent(code)}`)
  return Array.isArray(payload) ? payload[0] ?? null : payload ?? null
}
