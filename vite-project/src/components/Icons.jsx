export function Icon({ children, className = '', title }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : 'presentation'}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

export function GlobeIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M3 12h18M12 3c3 3.25 3 14.75 0 18M12 3c-3 3.25-3 14.75 0 18" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M5.2 7.5c1.9 1 4.2 1.5 6.8 1.5s4.9-.5 6.8-1.5M5.2 16.5c1.9-1 4.2-1.5 6.8-1.5s4.9.5 6.8 1.5" />
    </Icon>
  )
}

export function SearchIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M16 16l4 4" />
    </Icon>
  )
}

export function LogoutIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M15 12H4" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M20 20V4" />
    </Icon>
  )
}

export function HeartIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6.8-4.25-8.8-8.4C1.6 8.85 3.6 6 6.8 6c1.8 0 3.1 1.1 3.8 2.35C11.35 7.1 12.6 6 14.4 6c3.2 0 5.2 2.85 3.6 6.6C18.8 16.75 12 21 12 21Z" />
    </Icon>
  )
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M8 12.5l2.4 2.5L16.5 9" />
    </Icon>
  )
}

export function MapPinIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 21s5.5-5.4 5.5-10a5.5 5.5 0 10-11 0c0 4.6 5.5 10 5.5 10Z" />
      <circle cx="12" cy="11" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  )
}

export function UsersIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M9.2 11.2a2.8 2.8 0 1 0-5.6 0 2.8 2.8 0 0 0 5.6 0Zm11.2 0a2.8 2.8 0 1 0-5.6 0 2.8 2.8 0 0 0 5.6 0Z" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3.8 19.2c.7-2.4 2.4-3.7 4.4-3.7s3.7 1.3 4.4 3.7m3.2 0c.4-1.8 1.8-3 3.6-3s3.1 1.2 3.6 3" />
    </Icon>
  )
}

export function ClockIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M12 7v5l3 2" />
    </Icon>
  )
}

export function MoneyIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M8.2 12h7.6M12 9.2v5.6" />
    </Icon>
  )
}

export function AreaIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M5 18h14M7 18V6h10v12" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M9 9h6M9 12h4" />
    </Icon>
  )
}

export function SortIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 12h5M8 17h2" />
    </Icon>
  )
}

export function RefreshIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M20 12a8 8 0 10-2.3 5.6M20 12v-4m0 4h-4" />
    </Icon>
  )
}

export function BackIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
    </Icon>
  )
}

export function ArrowRightIcon(props) {
  return (
    <Icon {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </Icon>
  )
}
