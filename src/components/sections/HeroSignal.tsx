export function HeroSignal() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-64 top-[6%] w-[36rem] opacity-50 sm:-right-52 sm:top-[1%] sm:w-[46rem] sm:opacity-70 md:-right-48 md:w-[54rem] lg:-right-28 lg:w-[62rem] xl:right-[-4rem] xl:w-[66rem]"
    >
      <svg viewBox="0 0 800 800" fill="none" className="h-auto w-full">
        <defs>
          <radialGradient id="hero-signal-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.1" />
            <stop offset="58%" stopColor="var(--color-accent)" stopOpacity="0.025" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="400" cy="400" r="236" fill="url(#hero-signal-core)" />

        <g stroke="var(--color-line-soft)">
          <line x1="400" y1="24" x2="400" y2="776" />
          <line x1="24" y1="400" x2="776" y2="400" />
          <circle cx="400" cy="400" r="156" />
          <circle cx="400" cy="400" r="236" />
        </g>

        <g className="hero-orbit" stroke="var(--color-line)">
          <circle cx="400" cy="400" r="370" />
          <circle
            cx="400"
            cy="400"
            r="326"
            strokeDasharray="1 15"
            strokeOpacity="0.9"
          />
          <circle
            cx="400"
            cy="400"
            r="358"
            strokeWidth="9"
            strokeDasharray="2 45"
            strokeOpacity="0.8"
          />
          <circle
            cx="400"
            cy="400"
            r="326"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="260 1788"
            strokeOpacity="0.9"
            transform="rotate(-58 400 400)"
          />
        </g>

        <g stroke="var(--color-line-soft)" strokeOpacity="0.8">
          <path d="M104 664 696 136" />
          <path d="M136 136 664 664" strokeOpacity="0.35" />
        </g>

        <g fill="var(--color-accent)">
          <circle cx="400" cy="30" r="3" />
          <circle cx="686" cy="554" r="2" fillOpacity="0.75" />
        </g>

        <rect
          x="394"
          y="394"
          width="12"
          height="12"
          stroke="var(--color-accent)"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
}
