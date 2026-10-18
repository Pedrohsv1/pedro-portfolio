/**
 * Edit everything about you here — name, links, bio and photo.
 * Put your photo in /public (e.g. /public/me.jpg) and update `photo`.
 */
export const profile = {
  name: 'Pedro Varela',
  role: 'Designer Júnior UI/UX & Product Designer',
  tagline: 'Pesquisar, projetar, codar, lançar. Repetir.',
  photo: '/me.jpg',
  email: 'pedro.varela.dev@gmail.com',
  location: 'Natal, Brasil',
  /** Shown huge at the bottom of the footer. */
  fullName: 'Pedro Henrique de Sousa Varelas',
  footerNote: '1.204 bolos depois, sem planos de parar',
  bio: [
    'Sou Designer UI/UX apaixonado pela interseção entre design e código. Me importo com os pequenos detalhes: movimento, tipografia e a sensação que uma interface deixa para trás.',
    'Ultimamente tenho projetado aplicações responsivas e dashboards, participando também do desenvolvimento graças às minhas habilidades técnicas com código. Quando não estou criando, provavelmente estou assistindo esports ou rascunhando ideias para o próximo projeto.',
  ],
  links: [
    { type: 'linkedin', label: 'linkedin.com/in/pedro-varela', href: 'https://www.linkedin.com/in/pedro-varela-185051220/' },
    { type: 'github', label: 'github.com/pedrohsv1', href: 'https://github.com/pedrohsv1' },
  ],
} as const

export type LinkType = 'linkedin' | 'github' | 'x'
