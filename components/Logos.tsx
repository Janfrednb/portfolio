export function ReactLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6">
      <circle cx="20" cy="20" r="3" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="2" fill="none">
        <ellipse cx="20" cy="20" rx="16" ry="6.5" />
        <ellipse cx="20" cy="20" rx="16" ry="6.5" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="16" ry="6.5" transform="rotate(120 20 20)" />
      </g>
    </svg>
  );
}

export function NextLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6">
      <circle cx="20" cy="20" r="18" fill="black" />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        N
      </text>
    </svg>
  );
}

export function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6">
      <rect x="2" y="2" width="36" height="36" rx="6" fill="#3178C6" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        TS
      </text>
    </svg>
  );
}

export function TailwindLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6">
      <path
        d="M8 20c2-6 6-9 12-9s10 3 12 9c-2-4-6-6-10-6s-8 3-10 7c-1-1-3-1-4-1z"
        fill="#38BDF8"
      />
      <path
        d="M4 27c2-6 6-9 12-9s10 3 12 9c-2-4-6-6-10-6s-8 3-10 7c-1-1-3-1-4-1z"
        fill="#0EA5E9"
        opacity="0.75"
      />
    </svg>
  );
}

export function FirebaseLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6">
      <defs>
        <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFCA28" />
          <stop offset="50%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>
      </defs>
      <path d="M12 34 L16 6 L22 14 L26 4 L32 34 Z" fill="url(#fireGrad)" />
    </svg>
  );
}

export function GitLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6">
      <g fill="none" stroke="#F05033" strokeWidth="2" strokeLinecap="round">
        <path d="M10 13 V27" />
        <path d="M13 20 H25" />
      </g>
      <circle cx="10" cy="10" r="3" fill="#F05033" />
      <circle cx="10" cy="30" r="3" fill="#F05033" />
      <circle cx="28" cy="20" r="3" fill="#F05033" />
    </svg>
  );
}
