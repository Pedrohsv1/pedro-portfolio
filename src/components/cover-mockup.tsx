import type { CSSProperties } from 'react'

export type CoverMockupVariant = 'single-closeup' | 'duo-overlap' | 'desktop-mobile'
export type CoverMockupTheme = 'light' | 'dark'

export type CoverMockupConfig = {
  variant: CoverMockupVariant
  theme?: CoverMockupTheme
  primary: string
  /** Exact aspect ratio of the primary screen (e.g. '1280 / 832' or '16 / 9') so the image is never distorted or unevenly cropped. */
  primaryAspect?: string
  secondary?: string
  secondaryAspect?: string
}

/**
 * Clean, high-definition frame with zero 3D perspective blur.
 * Supports both light clay-blue and dark anodized slate hardware bezels.
 */
function CrispScreenFrame({
  src,
  alt,
  aspect = '1280 / 832',
  theme = 'light',
  className = '',
  style,
}: {
  src: string
  alt: string
  aspect?: string
  theme?: CoverMockupTheme
  className?: string
  style?: CSSProperties
}) {
  const isDark = theme === 'dark'

  return (
    <div
      style={style}
      className={
        isDark
          ? `rounded-[15px] bg-[#252b40] p-[6.5px] shadow-[0_28px_56px_-12px_rgba(0,0,0,0.75),0_8px_20px_-4px_rgba(0,0,0,0.55),inset_0_1.5px_0_rgba(255,255,255,0.18)] ring-1 ring-[#38415e] ${className}`
          : `rounded-[15px] bg-[#c1cdf0] p-[6.5px] shadow-[0_24px_48px_-14px_rgba(18,30,62,0.28),0_6px_16px_-4px_rgba(18,30,62,0.14),inset_0_1.5px_0_rgba(255,255,255,0.85)] ring-1 ring-[#a9b8e2] ${className}`
      }
    >
      <div
        style={{ aspectRatio: aspect }}
        className={
          isDark
            ? 'relative w-full overflow-hidden rounded-[9.5px] bg-[#141416] ring-1 ring-white/10'
            : 'relative w-full overflow-hidden rounded-[9.5px] bg-white ring-1 ring-black/10'
        }
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block size-full object-cover object-top select-none"
        />
      </div>
    </div>
  )
}

function CrispPhoneFrame({
  src,
  alt,
  aspect = '393 / 812',
  theme = 'light',
  className = '',
  style,
}: {
  src: string
  alt: string
  aspect?: string
  theme?: CoverMockupTheme
  className?: string
  style?: CSSProperties
}) {
  const isDark = theme === 'dark'

  return (
    <div
      style={style}
      className={
        isDark
          ? `rounded-[22px] bg-[#252b40] p-[6px] shadow-[0_28px_54px_-12px_rgba(0,0,0,0.78),0_8px_20px_-4px_rgba(0,0,0,0.55),inset_0_1.5px_0_rgba(255,255,255,0.18)] ring-1 ring-[#38415e] ${className}`
          : `rounded-[22px] bg-[#c1cdf0] p-[6px] shadow-[0_26px_48px_-12px_rgba(18,30,62,0.34),0_8px_18px_-4px_rgba(18,30,62,0.18),inset_0_1.5px_0_rgba(255,255,255,0.85)] ring-1 ring-[#a9b8e2] ${className}`
      }
    >
      {/* Dynamic Island pill */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[10px] left-1/2 z-10 h-[4.5px] w-[24px] -translate-x-1/2 rounded-full bg-[#081217]/85"
      />
      <div
        style={{ aspectRatio: aspect }}
        className={
          isDark
            ? 'relative w-full overflow-hidden rounded-[16px] bg-[#141416] ring-1 ring-white/10'
            : 'relative w-full overflow-hidden rounded-[16px] bg-white ring-1 ring-black/10'
        }
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block size-full object-cover object-top select-none"
        />
      </div>
    </div>
  )
}

export function CoverMockup({
  config,
  title,
}: {
  config: CoverMockupConfig
  title: string
}) {
  const {
    variant,
    theme = 'light',
    primary,
    primaryAspect = '1280 / 832',
    secondary,
    secondaryAspect = '1280 / 832',
  } = config

  const isDark = theme === 'dark'

  return (
    <div
      className={
        isDark
          ? 'relative size-full overflow-hidden bg-[#0e1222] select-none'
          : 'relative size-full overflow-hidden bg-[#dce1ec] select-none'
      }
    >
      {/* Studio backdrop — light clay studio or deep dark obsidian/navy studio */}
      <div
        aria-hidden
        className={
          isDark
            ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,#1e2540_0%,#111528_64%,#0b0e1a_100%)]'
            : 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#eef2f9_0%,#dce1ec_68%,#d1d8e8_100%)]'
        }
      />

      {variant === 'single-closeup' && (
        <div className="relative size-full">
          <CrispScreenFrame
            src={primary}
            alt={title}
            aspect={primaryAspect}
            theme={theme}
            className="absolute top-[7%] left-[6%] w-[96%] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.015]"
          />
        </div>
      )}

      {variant === 'duo-overlap' && (
        <div className="relative size-full">
          {/* Back right screen — large, bleeds off the right edge, overlaps ~14% with the front screen */}
          {secondary && (
            <CrispScreenFrame
              src={secondary}
              alt={title}
              aspect={secondaryAspect}
              theme={theme}
              className="absolute top-[6%] -right-[14%] z-10 w-[72%] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          )}

          {/* Front left screen — inset from the left so the full sidebar is clearly visible, bleeds at the bottom */}
          <CrispScreenFrame
            src={primary}
            alt={title}
            aspect={primaryAspect}
            theme={theme}
            className="absolute -bottom-[9%] left-[3.5%] z-20 w-[68%] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.015]"
          />
        </div>
      )}

      {variant === 'desktop-mobile' && (
        <div className="relative size-full">
          {/* Large desktop screen — inset on the left so the frame & left margin stay clean, bleeds slightly at bottom */}
          <CrispScreenFrame
            src={primary}
            alt={title}
            aspect={primaryAspect}
            theme={theme}
            className="absolute top-[7%] left-[3.5%] z-10 w-[78%] transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.015]"
          />

          {/* Overlapping mobile screen on the right — overlaps ~12% over the right edge of the desktop frame and bleeds at bottom */}
          {secondary && (
            <CrispPhoneFrame
              src={secondary}
              alt={`${title} Mobile`}
              aspect={config.secondaryAspect || '393 / 812'}
              theme={theme}
              className="absolute right-[3.5%] -bottom-[10%] z-20 w-[26.5%] transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            />
          )}
        </div>
      )}
    </div>
  )
}
