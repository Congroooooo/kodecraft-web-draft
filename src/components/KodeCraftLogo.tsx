export function KodeCraftLogo() {
  return (
    <svg
      className="h-auto w-[clamp(8.5rem,13vw,11.25rem)]"
      width="180"
      height="28"
      viewBox="0 0 180 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="KodeCraft"
    >
      <defs>
        <linearGradient id="frontChevron" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a9a4e" />
          <stop offset="100%" stopColor="#8bc53f" />
        </linearGradient>
      </defs>
      <polygon points="23,4 17,4 8,14 17,24 23,24 14,14" fill="url(#frontChevron)" />
      <polygon points="0,16 6,16 15,26 9,26" fill="#2d6e3a" />
      <text
        x="30"
        y="20"
        fontFamily="Geist, system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="0.14em"
        fill="currentColor"
      >
        KODECRAFT
      </text>
    </svg>
  )
}
