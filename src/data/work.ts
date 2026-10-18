import type { CoverMockupConfig } from '@/components/cover-mockup'

export type WorkKind = 'project' | 'snippet'

export type CaseStudySection = {
  eyebrow: string
  title: string
  description: string
  bullets?: string[]
  images: {
    src: string
    alt: string
    caption?: string
    aspect?: 'wide' | 'modal'
  }[]
}

export type CaseStudy = {
  subtitle: string
  client: string
  role: string
  period: string
  platform: string
  figmaUrl?: string
  heroImage: string
  overviewTitle?: string
  overview: string[]
  metrics: { label: string; value: string; detail: string }[]
  palette: { name: string; hex: string; textLight?: boolean }[]
  sections: CaseStudySection[]
}

export type WorkItem = {
  id: string
  kind: WorkKind
  title: string
  href?: string
  pinned?: boolean
  /** Image in /public. Snippets can omit it and render a live component instead. */
  image?: string
  /** Real 3D hardware mockup composition using actual exported Figma screens on a unified studio background. */
  mockup?: CoverMockupConfig
  /** Key of a live snippet component (see components/snippets.tsx). */
  snippet?: 'orb' | 'code' | 'magnetic'
  /** Full case study details page data. */
  caseStudy?: CaseStudy
}

export const work: WorkItem[] = [
  {
    id: 'innotraining',
    kind: 'project',
    title: 'Innotraining: Gestão de Treinamentos e Carreira',
    image: '/projects/innotraining/colaborador-details.png',
    mockup: {
      variant: 'duo-overlap',
      primary: '/projects/innotraining/colaborador-details.png',
      primaryAspect: '1280 / 832',
      secondary: '/projects/innotraining/colaboradores-list.png',
      secondaryAspect: '1280 / 832',
    },
    href: '#project/innotraining',
    pinned: false,
    caseStudy: {
      subtitle: 'Treinamentos obrigatórios, ASO e matriz de competências em um lugar só.',
      client: 'Innomotics',
      role: 'UI/UX & Product Designer',
      period: '2026',
      platform: 'Web App (Desktop B2B)',
      figmaUrl: 'https://www.figma.com/design/sh28037PqRldnb7ggYgTcL/INNOTRAINING?node-id=294-731',
      heroImage: '/projects/innotraining/colaborador-details.png',
      overviewTitle: 'Sem planilhas espalhadas',
      overview: [
        'Controlar NRs, exames ocupacionais (ASO) e competências técnicas de uma fábrica inteira costuma significar cinco planilhas diferentes e dezenas de e-mails vencidos. Eu queria tudo em uma única tela.',
        'O Innotraining junta RH, gestores e segurança do trabalho no mesmo fluxo: do upload de planilhas com validação na hora até a ficha individual onde o gestor avalia se o curso realmente funcionou na prática.',
      ],
      metrics: [
        {
          label: 'Escopo',
          value: '22 telas',
          detail: 'Lista, importação, ficha, ASO e eficácia',
        },
        {
          label: 'Perfis',
          value: '2 quadros',
          detail: 'Operacional e Administrativo',
        },
        {
          label: 'Auditoria',
          value: '100% rastreável',
          detail: 'Autor, data, hora e certificado anexo',
        },
      ],
      palette: [
        { name: 'Inno Lime', hex: '#E5F704', textLight: false },
        { name: 'Dark Slate', hex: '#081217', textLight: true },
        { name: 'Surface Light', hex: '#EDF2F5', textLight: false },
        { name: 'Alert Red', hex: '#D9383A', textLight: true },
      ],
      sections: [
        {
          eyebrow: 'Diretório e Filtros',
          title: 'Bateu o olho, achou a pendência',
          description:
            'A lista separa os times Operacional e Administrativo logo no topo. Se alguém está com exame ou NR vencida, o alerta vermelho aparece direto na linha da tabela, sem precisar abrir ficha por ficha.',
          bullets: [
            'Divisão Operacional / Adm.',
            'Filtro por NR e status',
            'Alertas direto na linha',
            'Agendamento rápido',
          ],
          images: [
            {
              src: '/projects/innotraining/colaboradores-list.png',
              alt: 'Listagem de Colaboradores no Innotraining',
              caption: 'Lista de colaboradores · filtros ativos e alertas de vencimento',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Ficha do Colaborador',
          title: 'Tudo sobre a pessoa, zero abas extras',
          description:
            'A ficha individual mostra o cargo vinculado ao Job Profile, a validade do ASO, os treinamentos e a matriz de competências lado a lado. Você vê na hora a diferença entre o nível atual da pessoa e o que o cargo pede.',
          bullets: [
            'Vínculo com Job Profile',
            'Validade e PDF do ASO',
            'Status de NRs por cor',
            'Matriz exigido vs. atual',
          ],
          images: [
            {
              src: '/projects/innotraining/colaborador-details.png',
              alt: 'Detalhes do colaborador Diego Martins',
              caption: 'Ficha de Diego Martins · cargo, ASO, cursos e competências',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Cadastro e Importação',
          title: 'Importar planilha sem medo de quebrar tudo',
          description:
            'Cadastrar dezenas de pessoas na mão ninguém merece. Mas importar planilha às cegas dá ainda mais trabalho. Aqui o sistema lê o arquivo antes de salvar, conta quantas linhas passaram e pinta de vermelho exatamente a célula que precisa de correção.',
          bullets: [
            'Prévia antes de salvar',
            'Células com erro em vermelho',
            'Contagem de prontos vs. erros',
            'Cadastro manual opcional',
          ],
          images: [
            {
              src: '/projects/innotraining/import-colaboradores.png',
              alt: 'Tela de importação de colaboradores com validação de erros',
              caption: 'Prévia de importação · 8 cadastros prontos, 2 com erro',
              aspect: 'wide',
            },
            {
              src: '/projects/innotraining/add-colaborador.png',
              alt: 'Tela de adicionar colaborador individual',
              caption: 'Cadastro manual · para quando é só uma pessoa nova',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Eficácia e Feedback',
          title: 'Fazer o curso é metade do caminho',
          description:
            'Depois do treinamento, o gestor precisa dizer se o aprendizado funcionou no dia a dia. Ele marca Eficaz ou Ineficaz, escreve o parecer e já sobe o nível da competência na mesma janela. Tudo fica assinado com nome, data e hora para auditoria.',
          bullets: [
            'Parecer Eficaz / Ineficaz',
            'Atualiza nível na hora',
            'Assinatura com data e hora',
            'Histórico para auditoria',
          ],
          images: [
            {
              src: '/projects/innotraining/modal-efficacy.png',
              alt: 'Modal de Detalhes do Treinamento e Eficácia',
              caption: 'Detalhes do treinamento · parecer assinado pelo gestor',
              aspect: 'modal',
            },
            {
              src: '/projects/innotraining/modal-add-efficacy.png',
              alt: 'Modal de avaliação de eficácia do colaborador',
              caption: 'Avaliação de eficácia · decisão + atualização de competência',
              aspect: 'modal',
            },
            {
              src: '/projects/innotraining/modal-feedback-details.png',
              alt: 'Modal de Feedback de Conhecimento',
              caption: 'Histórico de feedbacks · nível exigido vs. atual',
              aspect: 'modal',
            },
            {
              src: '/projects/innotraining/modal-filtros.png',
              alt: 'Modal de filtros avançados',
              caption: 'Filtros combinados · cargo, área, NR e status',
              aspect: 'modal',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'innofactoryquote',
    kind: 'project',
    title: 'InnoFactoryQuote: Cotação Industrial e Fluxo de Ofertas',
    image: '/projects/innofactoryquote/kanban-board.png',
    mockup: {
      variant: 'duo-overlap',
      primary: '/projects/innofactoryquote/kanban-board.png',
      primaryAspect: '16 / 9',
      secondary: '/projects/innofactoryquote/projects-list.png',
      secondaryAspect: '1280 / 832',
    },
    href: '#project/innofactoryquote',
    pinned: true,
    caseStudy: {
      subtitle:
        'Configurador de drives industriais (MLFB e X30), Kanban de propostas e fórum técnico para a Innomotics.',
      client: 'Innomotics',
      role: 'UI/UX & Product Designer',
      period: '2026',
      platform: 'Web App (Desktop B2B)',
      figmaUrl: 'https://www.figma.com/design/HsXpXDOLq4xouorRc2mZmE/INNO-FACTORY-QUOTE?node-id=0-1',
      heroImage: '/projects/innofactoryquote/project-details.png',
      overviewTitle: 'Menos e-mail perdido, mais proposta fechada',
      overview: [
        'Cotar um Drive industrial envolve vendas, engenharia elétrica e mecânica, compras e diretoria (LoA). Antes, tudo isso corria solto em planilhas e threads intermináveis de e-mail.',
        'O InnoFactoryQuote coloca todo mundo na mesma página. Você acompanha o funil em Kanban, configura cada equipamento pelo código MLFB com especiais X30 e resolve dúvidas técnicas num fórum colado na própria proposta.',
      ],
      metrics: [
        {
          label: 'Fluxo',
          value: '9 estágios',
          detail: 'Da triagem técnica até o LoA e proposta final',
        },
        {
          label: 'Engenharia',
          value: 'MLFB + X30',
          detail: 'Transformador, opcionais, flags e itens especiais',
        },
        {
          label: 'Comunicação',
          value: 'Fórum nativo',
          detail: 'Tópicos por projeto com @menções e PDFs',
        },
      ],
      palette: [
        { name: 'Inno Lime', hex: '#E5F704', textLight: false },
        { name: 'Dark Slate', hex: '#081217', textLight: true },
        { name: 'Surface Light', hex: '#EDF2F5', textLight: false },
        { name: 'Urgent Red', hex: '#D9383A', textLight: true },
      ],
      sections: [
        {
          eyebrow: 'Pipeline e Kanban',
          title: 'Nove etapas. Na ordem que você quiser.',
          description:
            'Vendas olha para as pontas do funil; Engenharia e Compras vivem no meio dele. Por isso, além de alternar entre tabela e Kanban com um clique, qualquer pessoa pode arrastar e reordenar as 9 colunas para deixar as suas fases na frente.',
          bullets: [
            'Visão Kanban ou Tabela',
            'Colunas reordenáveis',
            'Prioridade e prazo no card',
            'Contagem de drives por projeto',
          ],
          images: [
            {
              src: '/projects/innofactoryquote/kanban-board.png',
              alt: 'Visão Kanban de projetos no InnoFactoryQuote',
              caption: 'Quadro Kanban · prioridade, cliente, quantidade de drives e prazo',
              aspect: 'wide',
            },
            {
              src: '/projects/innofactoryquote/projects-list.png',
              alt: 'Listagem de Projetos em Tabela',
              caption: 'Visão em tabela · ideal para filtrar dezenas de cotações de uma vez',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Configurador de Drives',
          title: 'Especificação pesada sem cara de planilha',
          description:
            'Dentro da proposta, a engenharia cadastra cada Drive com código MLFB, potência, tensão, resfriamento e a lista de pedidos especiais X30. Quando termina sua parte, avança a etapa do projeto ali mesmo no topo.',
          bullets: [
            'Código MLFB completo',
            'Itens especiais X30',
            'Flags e alertas técnicos',
            'Duplicar drive em 1 clique',
          ],
          images: [
            {
              src: '/projects/innofactoryquote/project-details.png',
              alt: 'Tela de Detalhes do Projeto 01 / 2026',
              caption: 'Projeto 01 / 2026 · controle de fase e tabela de equipamentos',
              aspect: 'wide',
            },
            {
              src: '/projects/innofactoryquote/add-drive.png',
              alt: 'Configurador técnico Adicionar Drive',
              caption: 'Adicionar Drive · MLFB, transformador, opcionais e X30',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Fórum Técnico',
          title: 'A discussão fica onde a decisão acontece',
          description:
            'Peça fora de linha? Dúvida no transformador? Em vez de abrir outro e-mail por fora, a equipe cria um tópico dentro do próprio projeto, marca o colega com @ e anexa o PDF técnico. Meses depois, qualquer um sabe o que foi combinado.',
          bullets: [
            'Tópicos por assunto',
            'Menções com @',
            'Upload de PDF técnico',
            'Aviso de não lidas',
          ],
          images: [
            {
              src: '/projects/innofactoryquote/forum.png',
              alt: 'Fórum técnico do projeto',
              caption: 'Fórum do projeto · tópicos separados com PDFs e menções',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Fechamento e LoA',
          title: 'Travas simples na hora de assinar embaixo',
          description:
            'Passar de fase exige responsabilidade. Para liberar o LoA ou fechar a proposta comercial, modais diretos pedem apenas o essencial: número de aprovação, PDF final e confirmação do valor.',
          bullets: [
            'Trava de aprovação LoA',
            'Resumo final de valores',
            'Anexo da proposta comercial',
            'Organizador de colunas',
          ],
          images: [
            {
              src: '/projects/innofactoryquote/modal-end-offer.png',
              alt: 'Modal Finalizar Oferta',
              caption: 'Finalizar oferta · proposta anexa, drives e valor total',
              aspect: 'modal',
            },
            {
              src: '/projects/innofactoryquote/modal-approve-loa.png',
              alt: 'Modal Aguardando aprovar LoA',
              caption: 'Aprovação de LoA · registro obrigatório para liberar a cotação',
              aspect: 'modal',
            },
            {
              src: '/projects/innofactoryquote/kanban-column-organizer.png',
              alt: 'Modal Organizar colunas do Kanban',
              caption: 'Organizar colunas · cada área monta a sua ordem do funil',
              aspect: 'modal',
            },
            {
              src: '/projects/innofactoryquote/modal-filter-projects.png',
              alt: 'Modal Filtrar Projetos',
              caption: 'Filtros rápidos · prioridade, status, datas e responsável',
              aspect: 'modal',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'gehc',
    kind: 'project',
    title: 'GEHC: Site do Grupo Escoteiro Henrique Castriciano',
    image: '/projects/gehc/homepage.png',
    mockup: {
      variant: 'desktop-mobile',
      primary: '/projects/gehc/homepage.png',
      primaryAspect: '1280 / 832',
      secondary: '/projects/gehc/homepage-mobile.png',
    },
    href: '#project/gehc',
    pinned: true,
    caseStudy: {
      subtitle:
        'Site voluntário para o 52º Grupo Escoteiro Henrique Castriciano (Natal/RN), pensado para receber novas famílias e divulgar projetos dos jovens.',
      client: '52º GE Henrique Castriciano',
      role: 'UI/UX Designer (Voluntário)',
      period: '2025 a 2026',
      platform: 'Web Responsivo (Desktop, Tablet e Mobile)',
      figmaUrl: 'https://www.figma.com/design/AJmCDeMcaVn7KOKdbh2HiP/GEHC-Web?node-id=0-1',
      heroImage: '/projects/gehc/mockup-macbook-2.png',
      overviewTitle: 'De portas abertas desde 1997',
      overview: [
        'Quem descobre o grupo pelo Instagram geralmente chega com as mesmas dúvidas: com que idade pode entrar, onde ficam os encontros e como funciona o escotismo. Desenhei o site de forma voluntária para responder tudo isso sem rodeios.',
        'A identidade mistura o verde histórico do 52º GEHC com um layout leve em Bento Grid, dando espaço tanto para a história de Henrique Castriciano quanto para os projetos criados pelos próprios jovens (IBP).',
      ],
      metrics: [
        {
          label: 'Ramos',
          value: '4 seções (7 a 21 anos)',
          detail: 'Lobinhos, Escoteiros, Sêniors e Pioneiros',
        },
        {
          label: 'Formatos',
          value: '3 breakpoints',
          detail: 'Desktop (1280px), Tablet (834px) e Mobile (393px)',
        },
        {
          label: 'Jovens',
          value: 'Projetos IBP',
          detail: 'Iniciativas sociais e culturais do grupo',
        },
      ],
      palette: [
        { name: 'Mint Surface', hex: '#D8FFEA', textLight: false },
        { name: 'Scout Spring', hex: '#39EF8D', textLight: false },
        { name: 'Emerald Action', hex: '#05A650', textLight: true },
        { name: 'Deep Forest', hex: '#00331A', textLight: true },
      ],
      sections: [
        {
          eyebrow: 'Início e Contato',
          title: 'Primeira impressão leve, convite direto',
          description:
            'O topo em Bento Grid apresenta o espírito do grupo de cara: fotos reais de acampamento, explicação direta do método educativo, cartões das 4 faixas etárias e atalhos para copiar o e-mail ou mandar mensagem.',
          bullets: [
            'Topo em Bento Grid',
            '4 seções por idade',
            'Copiar e-mail em 1 clique',
            'Formulário de visita',
          ],
          images: [
            {
              src: '/projects/gehc/homepage.png',
              alt: 'Homepage completa do GEHC Web',
              caption: 'Página inicial · Bento Grid, método escoteiro, seções e contato',
              aspect: 'wide',
            },
            {
              src: '/projects/gehc/projeto-ibp-detalhe.png',
              alt: 'Página de Contato e Inscrição',
              caption: 'Contato · formulário direto para agendar uma visita ao grupo',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Nossa História',
          title: 'Quase três décadas de histórias no RN',
          description:
            'Conta quem foi o poeta Henrique Castriciano, pioneiro do escotismo no estado, e como o grupo nasceu em 1997 com o apoio de Noilde Ramalho. Fecha com o selo Grupo Padrão Ouro e o mapa da Sede Campestre.',
          bullets: [
            'Legado desde 1997',
            'Selo Padrão Ouro UEB',
            'Mapa da Sede Campestre',
            'Acervo de fotos reais',
          ],
          images: [
            {
              src: '/projects/gehc/historia.png',
              alt: 'Página Nossa História Henrique Castriciano',
              caption: 'Nossa História · patrono, fundação em 1997 e Sede Campestre',
              aspect: 'wide',
            },
            {
              src: '/projects/gehc/mockup-macbook-1.png',
              alt: 'Mockup Desktop da página Nossa História',
              caption: 'Versão Desktop · leitura editorial com fotos históricas',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Seções e Projetos IBP',
          title: 'Cada idade tem seu ritmo (e sua cor)',
          description:
            'Cada seção ganha a cor do seu ramo (amarelo no Lobinho, verde no Escoteiro, bordô no Sênior e vermelho no Pioneiro) e explica a rotina para os pais sem jargão difícil. Ao lado, os Projetos IBP destacam iniciativas dos próprios jovens, como o cancioneiro digital "Alguém puxa!".',
          bullets: [
            'Identidade por ramo',
            'Guia simples para os pais',
            'Vitrine de projetos IBP',
            'Download de materiais',
          ],
          images: [
            {
              src: '/projects/gehc/secao.png',
              alt: 'Página da Seção Ramo Lobinho',
              caption: 'Ramo Lobinho (6,5 a 10 anos) · rotina da Alcateia explicada para os pais',
              aspect: 'wide',
            },
            {
              src: '/projects/gehc/projetos-ibp.png',
              alt: 'Página de Projeto IBP Alguém puxa!',
              caption: 'Projeto IBP "Alguém puxa!" · cancioneiro escoteiro criado por uma jovem do grupo',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Mobile e Tablet',
          title: 'Pensado primeiro para quem vem do Instagram',
          description:
            'Quase todo visitante novo abre o site pelo link na bio do Instagram. Por isso, todos os blocos foram desenhados para funcionar tão bem em 393px no celular quanto no monitor.',
          bullets: [
            'Bento adaptado para mobile',
            'Alvos de toque amplos',
            'Tablet (834px) e Mobile (393px)',
          ],
          images: [
            {
              src: '/projects/gehc/mockup-iphone-1.png',
              alt: 'Mockup iPhone 15 Pro GEHC Mobile',
              caption: 'Mobile · página inicial no iPhone',
              aspect: 'wide',
            },
            {
              src: '/projects/gehc/mockup-iphone-2.png',
              alt: 'Mockup Mobile em destaque escuro',
              caption: 'Navegação mobile · seções e atalhos rápidos',
              aspect: 'wide',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'orgnuf',
    kind: 'project',
    title: 'Orgnuf: Organização Acadêmica e Hábitos',
    image: '/projects/orgnuf/home.png',
    mockup: {
      variant: 'duo-overlap',
      theme: 'dark',
      primary: '/projects/orgnuf/home.png',
      primaryAspect: '1440 / 1024',
      secondary: '/projects/orgnuf/atividades.png',
      secondaryAspect: '1440 / 1024',
    },
    href: '#project/orgnuf',
    pinned: false,
    caseStudy: {
      subtitle:
        'Entregas da faculdade, tarefas rápidas, constância de estudos e grade no padrão SIGAA em uma tela só.',
      client: 'Orgnuf (OrganizeUF)',
      role: 'Product Designer (UI/UX)',
      period: '2024 a 2025',
      platform: 'Web App Desktop (1440 × 1024)',
      figmaUrl: 'https://www.figma.com/design/yavGprX2DGidkrWbUucobZ/Orgnuf?node-id=0-1',
      heroImage: '/projects/orgnuf/home.png',
      overviewTitle: 'Menos abas abertas para estudar',
      overview: [
        'Para saber o que entregar na semana, o estudante universitário normalmente abre o SIGAA, um app de notas, a agenda e três pastas de PDF. Eu queria resolver tudo num lugar só, em tema escuro e sem firula.',
        'O segredo foi separar as coisas pelo peso que elas têm: Atividade Acadêmica tem prazo e PDFs anexos; Tarefa é um lembrete rápido de riscar; Meta é o hábito que se repete toda semana.',
      ],
      metrics: [
        {
          label: 'Estrutura',
          value: '4 blocos',
          detail: 'Atividades, Tarefas, Metas e Horários',
        },
        {
          label: 'Constância',
          value: 'Últimos 15 dias',
          detail: 'Gráfico diário de metas cumpridas',
        },
        {
          label: 'Velocidade',
          value: 'Atalho Ctrl+K',
          detail: 'Busca e criação rápida sem sair da tela',
        },
      ],
      palette: [
        { name: 'Electric Violet', hex: '#8862FF', textLight: true },
        { name: 'Soft Lavender', hex: '#A883FF', textLight: false },
        { name: 'Obsidian Canvas', hex: '#141416', textLight: true },
        { name: 'Elevated Surface', hex: '#232327', textLight: true },
        { name: 'Danger Crimson', hex: '#E5484D', textLight: true },
      ],
      sections: [
        {
          eyebrow: 'Painel Inicial',
          title: 'A semana inteira num relance',
          description:
            'No topo ficam as três listas do dia a dia. Embaixo, o gráfico de constância dos últimos 15 dias divide espaço com a grade de aulas de segunda a sábado, já no formato de códigos e turnos (12, 34, 56) das universidades federais.',
          bullets: [
            'Grade padrão SIGAA',
            'Frequência de 15 dias',
            'Menu lateral recolhível',
            'Botões + de criação rápida',
          ],
          images: [
            {
              src: '/projects/orgnuf/home.png',
              alt: 'Dashboard principal do Orgnuf',
              caption: 'Dashboard · listas da semana, constância de 15 dias e grade de aulas',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Atividades e Tarefas',
          title: 'Trabalho da faculdade não é lembrete de mercado',
          description:
            'Misturar um trabalho de cálculo com "comprar café" bagunça qualquer lista. Na aba de Atividades, cada card guarda o período de entrega e botões diretos para os PDFs e listas da matéria. Já Tarefas é enxuto: fez, marcou, sumiu.',
          bullets: [
            'Links de PDF direto no card',
            'Busca rápida Ctrl+K',
            'Filtro de Favoritas',
            'Prazo de início e fim',
          ],
          images: [
            {
              src: '/projects/orgnuf/atividades.png',
              alt: 'Tela dedicada de Atividades Acadêmicas',
              caption: 'Atividades · prazos de entrega e atalhos para PDFs da matéria',
              aspect: 'wide',
            },
            {
              src: '/projects/orgnuf/tarefas.png',
              alt: 'Tela dedicada de Tarefas',
              caption: 'Tarefas · lista limpa para pendências rápidas do dia',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Metas e Hábitos',
          title: 'Constância visível, sem culpa',
          description:
            'Metas são hábitos que se repetem na semana, como revisar aula ou fazer uma lista de exercícios. Cada meta concluída preenche a barra roxa dos últimos 15 dias logo abaixo.',
          bullets: [
            'Repetição por dia da semana',
            'Histórico visual de 15 dias',
            'Filtro Hoje / Ontem / Semana',
          ],
          images: [
            {
              src: '/projects/orgnuf/metas.png',
              alt: 'Tela dedicada de Metas e Hábitos',
              caption: 'Metas · hábitos recorrentes conectados ao gráfico dos últimos 15 dias',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Modais Rápidos',
          title: 'Criar, colar link e voltar pro que importa',
          description:
            'Nada de páginas longas de cadastro. Criar uma atividade, escolher os dias de uma meta ou editar a grade do semestre acontece em modais curtos por cima da tela atual.',
          bullets: [
            'Seletor S T Q Q S S D',
            'Anexo rápido de links',
            'Editor visual da grade',
          ],
          images: [
            {
              src: '/projects/orgnuf/modal-create-meta-3.png',
              alt: 'Modal Criar Atividade',
              caption: 'Criar Atividade · prazo, descrição e links da matéria',
              aspect: 'modal',
            },
            {
              src: '/projects/orgnuf/modal-create-meta-1.png',
              alt: 'Modal Criar Meta',
              caption: 'Criar Meta · escolha dos dias da semana em um clique',
              aspect: 'modal',
            },
            {
              src: '/projects/orgnuf/modal-create-meta-4.png',
              alt: 'Modal Criar Tarefa',
              caption: 'Criar Tarefa · apenas título e descrição',
              aspect: 'modal',
            },
            {
              src: '/projects/orgnuf/modal-create-meta-2.png',
              alt: 'Modal Adicionar Link',
              caption: 'Adicionar Link · anexa listas e PDFs ao card',
              aspect: 'modal',
            },
            {
              src: '/projects/orgnuf/modal-create-meta-5.png',
              alt: 'Modal de Edição de Horário Acadêmico',
              caption: 'Grade de horários · edição direta dos blocos 12, 34 e 56',
              aspect: 'wide',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'niko',
    kind: 'project',
    title: 'NIKO: Gestão de Digitalização de Acervos Físicos (INCRA & CSA)',
    image: '/projects/niko/fase-preparo-desktop.png',
    mockup: {
      variant: 'desktop-mobile',
      theme: 'dark',
      primary: '/projects/niko/fase-preparo-desktop.png',
      primaryAspect: '1440 / 1024',
      secondary: '/projects/niko/fases-mobile.png',
      secondaryAspect: '360 / 640',
    },
    href: '#project/niko',
    pinned: false,
    caseStudy: {
      subtitle:
        'Sistema desktop e mobile criado pela CSA em parceria com o INCRA para rastrear a digitalização de milhares de processos físicos.',
      client: 'CSA + INCRA',
      role: 'Product Designer (UI/UX)',
      period: '2022',
      platform: 'Web Desktop (1440 × 1024) e Mobile (360 × 640)',
      figmaUrl: 'https://www.figma.com/design/mjZgPxGU2l4k2H1t1oJa89/Prot%C3%B3tipos?node-id=0-1',
      heroImage: '/projects/niko/fase-preparo-desktop.png',
      overviewTitle: 'Da caixa empoeirada ao PDF catalogado',
      overview: [
        'Digitalizar o acervo físico de um órgão público como o INCRA é uma linha de montagem real: caixas chegam no caminhão, o papel é higienizado, catalogado por assentamento, escaneado, revisado e arquivado. Se um lote se perde no meio do galpão, trava tudo.',
        'O NIKO deu uma cor e um ícone para cada uma das 6 fases dessa esteira. Coordenadores acompanham as metas no computador, enquanto os operadores usam o celular direto nas bancadas para puxar lotes e avisar pendências.',
      ],
      metrics: [
        {
          label: 'Esteira',
          value: '6 fases por cor',
          detail: 'Recepção, Preparo, Catalogação, Scan, Upload e Arquivo',
        },
        {
          label: 'Operação',
          value: 'Desktop + Mobile',
          detail: 'Coordenação no PC e operadores de bancada no celular',
        },
        {
          label: 'Controle',
          value: 'Lote a lote',
          detail: 'Caixas, páginas, PDFs, turnos e assentamentos INCRA',
        },
      ],
      palette: [
        { name: 'NIKO Orange', hex: '#EE7D22', textLight: false },
        { name: 'Action Green', hex: '#34D164', textLight: false },
        { name: 'Scan Blue', hex: '#2D90F5', textLight: true },
        { name: 'Catalog Gold', hex: '#F2C900', textLight: false },
        { name: 'Dark Slate', hex: '#14171F', textLight: true },
      ],
      sections: [
        {
          eyebrow: 'Esteira de 6 Fases',
          title: 'Seis fases, seis cores, nenhuma caixa perdida',
          description:
            'No galpão de triagem, ninguém tem tempo de ler tabelas complexas. Cada etapa ganhou uma cor forte no topo da tela e divide os lotes em três colunas simples: Disponíveis, Em andamento e Concluídos.',
          bullets: [
            'Recepção · Preparo · Catalogação',
            'Digitalização · Upload · Arquivamento',
            'Sinalização de prioridade',
            'Avarias físicas na recepção',
          ],
          images: [
            {
              src: '/projects/niko/fase-preparo-desktop.png',
              alt: 'Tela da fase de Preparo no NIKO Desktop',
              caption: 'Fase de Preparo · lotes disponíveis, em andamento e concluídos',
              aspect: 'wide',
            },
            {
              src: '/projects/niko/fase-catalogacao-desktop.png',
              alt: 'Tela da fase de Catalogação no NIKO Desktop',
              caption: 'Fase de Catalogação · múltiplos operadores no mesmo lote e alertas',
              aspect: 'wide',
            },
            {
              src: '/projects/niko/fase-recepcao-desktop.png',
              alt: 'Tela da fase de Recepção de Remessas',
              caption: 'Recepção · entrada de caixas e registro de avarias no papel',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Ficha do Lote',
          title: 'Duas visões para o mesmo lote',
          description:
            'O operador só precisa ver as etiquetas do INCRA (como PA Maisa, Crédito, Mapas), deixar uma observação e concluir sua etapa. Já o coordenador vê a mesma tela com controles extras para trocar responsáveis, voltar fase ou excluir o lote.',
          bullets: [
            'Visão Operador vs. Coordenador',
            'Tags de assentamento INCRA',
            'Contagem de folhas e PDFs',
            'Histórico de observações',
          ],
          images: [
            {
              src: '/projects/niko/lote-coordenador-desktop.png',
              alt: 'Página de Lote na visão do Coordenador',
              caption: 'Lote 117 (Coordenador) · atribuir equipe, voltar ou avançar fase',
              aspect: 'wide',
            },
            {
              src: '/projects/niko/lote-operador-desktop.png',
              alt: 'Página de Lote na visão do Operador',
              caption: 'Lote 117 (Operador) · foco nas tags do lote e botão de concluir',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Gestão e Turnos',
          title: 'Ritmo da fábrica em tempo real',
          description:
            'A coordenação acompanha quantos lotes passaram por cada fase no mês, monta a escala dos turnos da manhã e da tarde e confere o percentual concluído em cada categoria de documento.',
          bullets: [
            'Balanço por período',
            'Escala Manhã e Tarde',
            'Avanço por categoria (%)',
            'Histórico por operador',
          ],
          images: [
            {
              src: '/projects/niko/painel-2-desktop.png',
              alt: 'Painel gerencial de lotes e remessas no NIKO',
              caption: 'Painel gerencial · 172 lotes rastreados pelas 6 fases',
              aspect: 'wide',
            },
            {
              src: '/projects/niko/atividades-coordenador-desktop.png',
              alt: 'Gestão de Atividades por Turno no NIKO',
              caption: 'Escala de turnos · distribuição da equipe entre manhã e tarde',
              aspect: 'wide',
            },
            {
              src: '/projects/niko/categorias-desktop.png',
              alt: 'Progresso por Categorias de documentos',
              caption: 'Categorias · progresso de Administrativo, Financeiro e Receita',
              aspect: 'wide',
            },
            {
              src: '/projects/niko/perfil-desktop.png',
              alt: 'Perfil do Usuário e estatísticas de Lotes Completos',
              caption: 'Perfil do operador · lotes concluídos em cada etapa',
              aspect: 'wide',
            },
          ],
        },
        {
          eyebrow: 'Mobile na Bancada',
          title: 'No bolso de quem está entre as estantes',
          description:
            'Quem higieniza documentos ou opera o scanner não fica sentado na frente de um monitor. Pelo celular, o operador puxa o próximo lote da fila, pausa o serviço se encontrar páginas faltando e avisa a coordenação na hora.',
          bullets: [
            'Puxar lote pelo celular',
            'Pausar e relatar pendência',
            'Alto contraste no escuro',
            'Multi-órgão (INCRA / CAERN)',
          ],
          images: [
            {
              src: '/projects/niko/fases-mobile.png',
              alt: 'Visão Mobile das 6 Fases do NIKO',
              caption: 'Fases no mobile · resumo rápido de lotes ativos e pausados',
              aspect: 'modal',
            },
            {
              src: '/projects/niko/home-mobile.png',
              alt: 'Tela Inicial Mobile para pegar lotes',
              caption: 'Início mobile · fila de lotes prontos para começar',
              aspect: 'modal',
            },
            {
              src: '/projects/niko/lote-pendencia-mobile.png',
              alt: 'Detalhamento de Lote e Pendências no Mobile',
              caption: 'Pendências · aviso de páginas sem verso direto da bancada',
              aspect: 'modal',
            },
            {
              src: '/projects/niko/projetos-mobile.png',
              alt: 'Seleção de Projetos e Órgãos (INCRA e CAERN)',
              caption: 'Projetos · alternância entre operações INCRA e CAERN',
              aspect: 'modal',
            },
            {
              src: '/projects/niko/modal-incra-mobile.png',
              alt: 'Gestão de membros do projeto INCRA',
              caption: 'Equipe · permissões de Coordenador, Gerente, Operador e Cliente',
              aspect: 'modal',
            },
            {
              src: '/projects/niko/recepcao-mobile.png',
              alt: 'Histórico de remessas na Recepção Mobile',
              caption: 'Recepção mobile · registro de caixas no ato da entrega',
              aspect: 'modal',
            },
          ],
        },
      ],
    },
  },
]
