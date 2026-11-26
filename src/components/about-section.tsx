import { MapPin } from 'lucide-react'

import { profile } from '@/data/profile'

/**
 * Shopify Polaris structured "Sobre & Trajetória" section (Mini-CV for Junior Web Designer applications).
 * Uses crisp 1px hairline dividers inside a clean neutral card, matching Shopify's summary card anatomy.
 */
export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto w-full max-w-[1360px] scroll-mt-16 px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-[900px]">
        <header className="mb-6">
          <p className="text-[12px] font-medium tracking-[-0.01em] text-muted-foreground">Sobre mim</p>
          <h2 className="mt-1 text-[22px] leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-[26px]">
            Trajetória e ferramentas
          </h2>
          <p className="mt-1 text-[14.5px] text-muted-foreground">
            Design de interfaces, prototipagem e front-end para produtos web.
          </p>
        </header>

        <div className="polaris-card overflow-hidden rounded-[20px]">
          {/* Bio & Location */}
          <div className="grid gap-4 p-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8 sm:p-6">
            <div>
              <h3 className="text-[12.5px] font-medium text-foreground">Perfil</h3>
              <p className="mt-1.5 inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span>{profile.location}</span>
              </p>
            </div>
            <div className="space-y-3 text-[14px] leading-[1.65] text-foreground/85">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Experience rows with hairline dividers */}
          {profile.experiences.length > 0 && (
            <div className="border-t border-border p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
                <h3 className="text-[12.5px] font-medium text-foreground">Experiência</h3>
                <ul className="divide-y divide-border">
                  {profile.experiences.map((exp, idx) => (
                    <li
                      key={`${exp.organization}-${exp.period}`}
                      className={idx === 0 ? 'pb-4' : idx === profile.experiences.length - 1 ? 'pt-4' : 'py-4'}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[14px] font-medium tracking-[-0.01em] text-foreground">
                          {exp.role}{' '}
                          <span className="font-normal text-muted-foreground">· {exp.organization}</span>
                        </p>
                        <span className="text-[12px] text-muted-foreground tabular-nums">{exp.period}</span>
                      </div>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                        {exp.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Education */}
          {profile.education.length > 0 && (
            <div className="border-t border-border p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
                <h3 className="text-[12.5px] font-medium text-foreground">Formação</h3>
                <ul className="divide-y divide-border">
                  {profile.education.map((edu, idx) => (
                    <li
                      key={`${edu.institution}-${edu.course}`}
                      className={
                        profile.education.length === 1
                          ? ''
                          : idx === 0
                            ? 'pb-3.5'
                            : idx === profile.education.length - 1
                              ? 'pt-3.5'
                              : 'py-3.5'
                      }
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[14px] font-medium tracking-[-0.01em] text-foreground">
                          {edu.course}
                        </p>
                        <span className="text-[12px] text-muted-foreground tabular-nums">{edu.period}</span>
                      </div>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">{edu.institution}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Skills / Tools */}
          {profile.skills.length > 0 && (
            <div className="border-t border-border p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
                <h3 className="text-[12.5px] font-medium text-foreground">Ferramentas</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex h-7 items-center rounded-full border border-border bg-secondary/60 px-3 text-[12px] font-medium tracking-[-0.01em] text-foreground/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Languages */}
          {profile.languages && profile.languages.length > 0 && (
            <div className="border-t border-border p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
                <h3 className="text-[12.5px] font-medium text-foreground">Idiomas</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[13.5px]">
                  {profile.languages.map((lang) => (
                    <p key={lang.name} className="text-foreground">
                      <span className="font-medium">{lang.name}</span>{' '}
                      <span className="text-muted-foreground">· {lang.level}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
