import type { CSSProperties } from 'react'

import type { CoverMockupConfig, CoverMockupTheme } from '@/types/portfolio'

export type { CoverMockupConfig, CoverMockupTheme, CoverMockupVariant } from '@/types/portfolio'

/**
 * Clean, high-definition studio hardware frame in Shopify neutral soft tones
 * (soft alabaster/titanium light bezel or deep graphite/obsidian dark bezel).
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
          ? `rounded-[14px] bg-[#222226] p-[5.5px] shadow-[0_28px_56px_-14px_rgba(0,0,0,0.8),0_8px_20px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/[0.1] ${className}`
          : `rounded-[14px] bg-[#ffffff] p-[5.5px] shadow-[0_22px_48px_-14px_rgba(0,0,0,0.14),0_6px_16px_-6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-black/[0.08] ${className}`
      }
    >
      <div
        style={{ aspectRatio: aspect }}
        className={
          isDark
            ? 'relative w-full overflow-hidden rounded-[9px] bg-[#101012] ring-1 ring-white/[0.08]'
            : 'relative w-full overflow-hidden rounded-[9px] bg-white ring-1 ring-black/[0.06]'
        }
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
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
          ? `rounded-[22px] bg-[#222226] p-[5px] shadow-[0_28px_54px_-14px_rgba(0,0,0,0.82),0_8px_20px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] ring-1 ring-white/[0.1] ${className}`
          : `rounded-[22px] bg-[#ffffff] p-[5px] shadow-[0_24px_48px_-14px_rgba(0,0,0,0.16),0_8px_18px_-6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-black/[0.08] ${className}`
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-[9px] left-1/2 z-10 h-[4px] w-[22px] -translate-x-1/2 rounded-full bg-[#161618]/85"
      />
      <div
        style={{ aspectRatio: aspect }}
        className={
          isDark
            ? 'relative w-full overflow-hidden rounded-[17px] bg-[#101012] ring-1 ring-white/[0.08]'
            : 'relative w-full overflow-hidden rounded-[17px] bg-white ring-1 ring-black/[0.06]'
        }
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
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
          ? 'relative size-full overflow-hidden bg-[#101012] select-none'
          : 'relative size-full overflow-hidden bg-[#f1f1f3] select-none'
      }
    >
      {/* Neutral studio radial backdrop */}
      <div
        aria-hidden
        className={
          isDark
            ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,#202026_0%,#121215_62%,#0b0b0d_100%)]'
            : 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#fafafa_0%,#f1f1f3_66%,#e8e8ec_100%)]'
        }
      />

      {variant === 'single-closeup' && (
        <div className="relative size-full">
          <CrispScreenFrame
            src={primary}
            alt={title}
            aspect={primaryAspect}
            theme={theme}
            className="absolute top-[8%] left-[7%] w-[94%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.015]"
          />
        </div>
      )}

      {variant === 'duo-overlap' && (
        <div className="relative size-full">
          {secondary && (
            <CrispScreenFrame
              src={secondary}
              alt={title}
              aspect={secondaryAspect}
              theme={theme}
              className="absolute top-[8%] -right-[14%] z-10 w-[76%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          )}

          <CrispScreenFrame
            src={primary}
            alt={title}
            aspect={primaryAspect}
            theme={theme}
            className="absolute bottom-[6%] left-[5%] z-20 w-[74%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.015]"
          />
        </div>
      )}

      {variant === 'desktop-mobile' && (
        <div className="relative size-full">
          <CrispScreenFrame
            src={primary}
            alt={title}
            aspect={primaryAspect}
            theme={theme}
            className="absolute top-[10%] left-[5%] z-10 w-[80%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.015]"
          />

          {secondary && (
            <CrispPhoneFrame
              src={secondary}
              alt={`${title} Mobile`}
              aspect={config.secondaryAspect || '393 / 812'}
              theme={theme}
              className="absolute right-[5%] bottom-[4%] z-20 w-[29%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5"
            />
          )}
        </div>
      )}
    </div>
  )
}
