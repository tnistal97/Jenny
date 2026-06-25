import type { SiteContent } from '@/types/content';

// ════════════════════════════════════════════════════════════════════════
//  CONTENIDO POR DEFECTO — "fuente de verdad" del sitio.
//  Editá este archivo o usá el panel /admin (guarda en localStorage + export/import).
// ════════════════════════════════════════════════════════════════════════

const img = (id: string, src: string, caption: string) => ({ id, src, caption });

export const defaultContent: SiteContent = {
  general: {
    name: 'Jennifer',
    role: 'Makeup Artist',
    whatsapp: '5491134567890',
    whatsappMessage:
      'Hola Jennifer! Vi tu web y me gustaría consultar por un maquillaje. ¿Tenés disponibilidad?',
    instagram: 'jennifer.makeup',
    tiktok: 'jennifer.makeup',
    email: 'hola@jennifermakeup.com.ar',
    zone: 'Capital Federal (CABA) y alrededores',
    city: 'Buenos Aires, Argentina',
  },

  hero: {
    eyebrow: 'Maquilladora de novias · Capital Federal',
    titleLine1: 'Belleza que',
    titleLine2: 'te representa.',
    subtitle:
      'Soy Jennifer. Hace más de 8 años acompaño a novias en su día más importante con un maquillaje natural y luminoso, pensado para que te sientas plena, segura y te reconozcas en cada foto.',
    ctaPrimary: 'Consultá tu fecha',
    ctaSecondary: 'Ver mi trabajo',
    image: '/images/mk-hero.svg',
    trust: ['+8 años de experiencia', '+300 novias maquilladas', 'CABA y alrededores', 'Productos premium'],
    reviewQuote: 'La mejor decisión para mi casamiento.',
    reviewAuthor: 'Florencia · Novia',
  },

  about: {
    eyebrow: 'Sobre Jennifer',
    titleLine1: 'Pasión por realzar',
    titleLine2: 'tu mejor versión.',
    paragraphs: [
      'Soy Jennifer, maquilladora profesional radicada en Capital Federal. Hace más de 8 años acompaño a mujeres en sus días más importantes —casamientos, eventos y producciones— con un maquillaje pensado para cada rostro, cada piel y cada historia.',
      'Mi estilo es natural, luminoso y elegante: realzo tus rasgos sin recargarte, para que te reconozcas en el espejo y te sientas vos misma en tu mejor versión. Trabajo con productos premium de larga duración y técnicas profesionales que se sostienen impecables durante toda la jornada.',
      'Atiendo a novias, invitadas, quinceañeras, modelos y alumnas de automaquillaje. Cuido cada detalle antes, durante y después del evento: desde la preparación de la piel hasta los tips finales para que el look dure de principio a fin.',
    ],
    bullets: [
      'Atención 100% personalizada, sin apuro',
      'Realce de la belleza natural, nunca recargado',
      'Productos premium de larga duración',
      'Experiencia en novias, eventos y producciones',
      'Acompañamiento antes, durante y después del evento',
    ],
    highlights: [
      { value: '+8', label: 'años de experiencia' },
      { value: '300+', label: 'novias maquilladas' },
      { value: '100%', label: 'atención personalizada' },
      { value: 'Premium', label: 'productos de alta gama' },
    ],
    image: '/images/mk-about.svg',
    cta: 'Conocer más / Consultar',
  },

  services: [
    {
      id: 'novias',
      title: 'Maquillaje para novias',
      description:
        'El look de tu casamiento, diseñado a tu medida. Incluye prueba previa, preparación de piel y un resultado natural y de larga duración.',
      image: '/images/mk-bride-2.svg',
    },
    {
      id: 'social',
      title: 'Maquillaje social',
      description:
        'Para cumpleaños, civiles, cenas y graduaciones. Un look elegante que resalta tus rasgos y te acompaña toda la noche sin retoques.',
      image: '/images/mk-lips-2.svg',
    },
    {
      id: 'eventos',
      title: 'Maquillaje para eventos',
      description:
        'Quince años, fiestas y eventos empresariales. Maquillaje impecable para vos y tu grupo, coordinado y a tiempo para tu evento.',
      image: '/images/mk-mirror-2.svg',
    },
    {
      id: 'produccion',
      title: 'Producción editorial',
      description:
        'Beauty, moda y campañas. Trabajo en equipo con fotógrafos y dirección de arte para lograr el concepto exacto de cada producción.',
      image: '/images/mk-model-2.svg',
    },
    {
      id: 'clases',
      title: 'Clases de automaquillaje',
      description:
        'Aprendé a maquillarte vos misma con una clase personalizada según tus rasgos, tus productos y tu día a día. Práctica y cercana.',
      image: '/images/mk-palette-1.svg',
    },
    {
      id: 'asesoria',
      title: 'Asesoría personalizada',
      description:
        'Te ayudo a elegir productos, armar tu rutina y definir el look ideal para tu evento. Asesoramiento profesional, sin vueltas.',
      image: '/images/mk-eye-2.svg',
    },
  ],

  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Trabajos reales, clientas reales.',
    intro:
      'Cada proyecto es una clienta distinta y un look pensado a medida. Explorá por categoría y mirá el proceso completo: preparación, detalle y resultado final.',
    categories: [
      { id: 'cat-novias', name: 'Casamientos / Novias', slug: 'novias', description: 'Looks luminosos y de larga duración para el día más importante.', cover: '/images/mk-bride-1.svg' },
      { id: 'cat-social', name: 'Maquillaje social', slug: 'social', description: 'Cumpleaños, cenas, fiestas y eventos empresariales.', cover: '/images/mk-lips-1.svg' },
      { id: 'cat-editorial', name: 'Producciones / Editorial', slug: 'editorial', description: 'Modelos, campañas y beauty shots de estética más creativa.', cover: '/images/mk-model-1.svg' },
      { id: 'cat-clases', name: 'Clases de automaquillaje', slug: 'clases', description: 'Alumnas, proceso de aprendizaje y resultado final.', cover: '/images/mk-mirror-1.svg' },
      { id: 'cat-antes-despues', name: 'Antes y después', slug: 'antes-despues', description: 'Comparativas cuidadas y profesionales del trabajo realizado.', cover: '/images/mk-beforeafter-1.svg' },
    ],
    projects: [
      {
        id: 'pr-sofia',
        title: 'Sofía — Boda en Recoleta',
        categoryId: 'cat-novias',
        description:
          'Un look luminoso, natural y duradero, pensado para acompañar toda la jornada sin perder frescura. Foco en una piel impecable y una mirada definida pero suave.',
        location: 'Recoleta, CABA',
        date: '2025',
        eventType: 'Casamiento',
        featured: true,
        images: [
          img('sofia-1', '/images/mk-skin-1.svg', 'Preparación de piel'),
          img('sofia-2', '/images/mk-eye-1.svg', 'Maquillaje de ojos'),
          img('sofia-3', '/images/mk-glow-1.svg', 'Resultado final'),
          img('sofia-4', '/images/mk-bride-1.svg', 'Antes del evento'),
        ],
      },
      {
        id: 'pr-camila',
        title: 'Camila — Civil en Palermo',
        categoryId: 'cat-novias',
        description:
          'Para su civil, un maquillaje fresco y elegante con acabado dewy. Tonos nude cálidos que realzan sus rasgos sin recargar.',
        location: 'Palermo, CABA',
        date: '2025',
        eventType: 'Civil',
        featured: true,
        images: [
          img('camila-1', '/images/mk-skin-2.svg', 'Preparación de piel'),
          img('camila-2', '/images/mk-lips-1.svg', 'Labios nude'),
          img('camila-3', '/images/mk-glow-2.svg', 'Resultado final'),
          img('camila-4', '/images/mk-mirror-1.svg', 'Frente al espejo'),
        ],
      },
      {
        id: 'pr-martina',
        title: 'Martina — Fiesta en Puerto Madero',
        categoryId: 'cat-novias',
        description:
          'Un look algo más glam para una fiesta de noche: mirada ahumada en tonos cálidos y piel luminosa de larga duración.',
        location: 'Puerto Madero, CABA',
        date: '2024',
        eventType: 'Fiesta de casamiento',
        featured: false,
        images: [
          img('martina-1', '/images/mk-eye-2.svg', 'Mirada ahumada'),
          img('martina-2', '/images/mk-glow-3.svg', 'Resultado final'),
          img('martina-3', '/images/mk-lips-3.svg', 'Detalle de labios'),
          img('martina-4', '/images/mk-bride-3.svg', 'Antes del evento'),
        ],
      },
      {
        id: 'pr-valentina',
        title: 'Valentina — Cumpleaños de 30',
        categoryId: 'cat-social',
        description:
          'Un look de noche elegante y favorecedor para festejar: ojos definidos, piel jugosa y labios en tono cálido.',
        location: 'Belgrano, CABA',
        date: '2025',
        eventType: 'Cumpleaños',
        featured: true,
        images: [
          img('valen-1', '/images/mk-lips-2.svg', 'Look de noche'),
          img('valen-2', '/images/mk-eye-3.svg', 'Detalle de ojos'),
          img('valen-3', '/images/mk-glow-1.svg', 'Resultado final'),
        ],
      },
      {
        id: 'pr-cena',
        title: 'Cena de gala — Evento empresarial',
        categoryId: 'cat-social',
        description:
          'Maquillaje sobrio y prolijo para una cena de gala. Elegancia y naturalidad para destacar sin excesos.',
        location: 'Centro, CABA',
        date: '2024',
        eventType: 'Evento empresarial',
        featured: false,
        images: [
          img('cena-1', '/images/mk-glow-2.svg', 'Resultado final'),
          img('cena-2', '/images/mk-mirror-2.svg', 'Frente al espejo'),
          img('cena-3', '/images/mk-lips-1.svg', 'Detalle de labios'),
        ],
      },
      {
        id: 'pr-editorial-glow',
        title: 'Editorial Beauty — Glow',
        categoryId: 'cat-editorial',
        description:
          'Producción de belleza con foco en la textura de la piel y una mirada gráfica. Acabado jugoso y luminoso para cámara.',
        location: 'Estudio, CABA',
        date: '2025',
        eventType: 'Editorial beauty',
        featured: true,
        images: [
          img('ed1-1', '/images/mk-model-1.svg', 'Beauty shot'),
          img('ed1-2', '/images/mk-eye-2.svg', 'Detalle gráfico'),
          img('ed1-3', '/images/mk-glow-3.svg', 'Resultado final'),
        ],
      },
      {
        id: 'pr-campana-nude',
        title: 'Campaña — Nude Skin',
        categoryId: 'cat-editorial',
        description:
          'Campaña con estética nude y piel real. Maquillaje limpio que respeta la textura natural, trabajado en backstage con el equipo.',
        location: 'Producción, CABA',
        date: '2024',
        eventType: 'Campaña',
        featured: false,
        images: [
          img('ed2-1', '/images/mk-model-3.svg', 'Look de campaña'),
          img('ed2-2', '/images/mk-lips-2.svg', 'Detalle de labios'),
          img('ed2-3', '/images/mk-ringlight-1.svg', 'Backstage'),
        ],
      },
      {
        id: 'pr-clase-diaria',
        title: 'Clase 1:1 — Maquillaje día a día',
        categoryId: 'cat-clases',
        description:
          'Clase individual para aprender un maquillaje rápido y favorecedor para el día a día, adaptado a sus rasgos y a sus propios productos.',
        location: 'CABA',
        date: '2025',
        eventType: 'Clase individual',
        featured: true,
        images: [
          img('cl1-1', '/images/mk-palette-1.svg', 'Práctica con la paleta'),
          img('cl1-2', '/images/mk-mirror-3.svg', 'Frente al espejo'),
          img('cl1-3', '/images/mk-glow-2.svg', 'Resultado final'),
        ],
      },
      {
        id: 'pr-taller-ojos',
        title: 'Taller — Ojos ahumados',
        categoryId: 'cat-clases',
        description:
          'Taller enfocado en la técnica de ojos ahumados paso a paso: difuminado, intensidad y prolijidad.',
        location: 'CABA',
        date: '2024',
        eventType: 'Taller',
        featured: false,
        images: [
          img('cl2-1', '/images/mk-brushes-1.svg', 'Brochas y herramientas'),
          img('cl2-2', '/images/mk-eye-1.svg', 'Técnica de ojos'),
          img('cl2-3', '/images/mk-glow-1.svg', 'Resultado final'),
        ],
      },
      {
        id: 'pr-ad-natural',
        title: 'Antes y después — Natural',
        categoryId: 'cat-antes-despues',
        description:
          'Realce de rasgos naturales: unificar la piel, definir la mirada y dar luminosidad, manteniendo a la clienta reconocible.',
        location: 'CABA',
        date: '2025',
        eventType: 'Maquillaje social',
        featured: true,
        images: [
          img('ad1-1', '/images/mk-beforeafter-1.svg', 'Antes y después'),
          img('ad1-2', '/images/mk-glow-3.svg', 'Resultado final'),
        ],
      },
      {
        id: 'pr-ad-glam',
        title: 'Antes y después — Glam',
        categoryId: 'cat-antes-despues',
        description:
          'De un rostro al natural a un look glam para la noche: mirada intensa, piel luminosa y labios definidos.',
        location: 'CABA',
        date: '2024',
        eventType: 'Maquillaje de noche',
        featured: false,
        images: [
          img('ad2-1', '/images/mk-beforeafter-2.svg', 'Antes y después'),
          img('ad2-2', '/images/mk-glow-1.svg', 'Resultado final'),
        ],
      },
    ],
  },

  process: {
    eyebrow: 'Cómo trabajo',
    title: 'Un proceso pensado para vos.',
    intro:
      'Desde el primer mensaje hasta el día del evento, te acompaño en cada paso para que el resultado sea exactamente lo que imaginás.',
    steps: [
      { id: 's1', step: '01', title: 'Charla inicial', description: 'Hablamos por WhatsApp sobre tu evento, tu estilo y lo que buscás. Te paso disponibilidad y presupuesto sin compromiso.' },
      { id: 's2', step: '02', title: 'Referencias del look', description: 'Definimos juntas la dirección del maquillaje con imágenes de referencia, según tu vestuario y la ocasión.' },
      { id: 's3', step: '03', title: 'Preparación de piel', description: 'Empezamos por la piel: limpieza, hidratación y prep para lograr un acabado luminoso, parejo y duradero.' },
      { id: 's4', step: '04', title: 'Maquillaje personalizado', description: 'Diseño el look a medida de tus rasgos, realzando tu belleza natural con productos premium de larga duración.' },
      { id: 's5', step: '05', title: 'Ajustes finales', description: 'Revisamos cada detalle juntas y ajustamos lo que haga falta para que te sientas perfecta antes de salir.' },
      { id: 's6', step: '06', title: 'Tips para que dure', description: 'Te dejo recomendaciones para mantener el maquillaje impecable durante todo el evento.' },
    ],
  },

  bridal: {
    eyebrow: 'Especial novias',
    titleLine1: 'Tu día,',
    titleLine2: 'tu mejor versión.',
    intro:
      'El maquillaje de novia es único: tiene que durar horas, verse increíble en persona y en las fotos, y sobre todo, hacerte sentir vos misma. Por eso lo diseño con tiempo y a tu medida.',
    points: [
      { title: 'Prueba de maquillaje', description: 'Definimos tu look con anticipación para que el día del casamiento todo salga perfecto, sin sorpresas.' },
      { title: 'Diseño del look a medida', description: 'Según tu vestido, tu piel, el horario y el estilo del evento, para que todo combine con vos.' },
      { title: 'Maquillaje de larga duración', description: 'Productos premium y técnicas profesionales para que se mantenga impecable de la ceremonia a la fiesta.' },
      { title: 'Preparación de piel', description: 'Skincare previo y prep el mismo día para un acabado luminoso, parejo y natural.' },
      { title: 'Familiares e invitadas', description: 'Posibilidad de maquillar también a tu mamá, hermanas e invitadas, todo coordinado y a tiempo.' },
      { title: 'Atención en CABA y alrededores', description: 'Voy al lugar donde te prepares en Capital Federal y zonas cercanas.' },
    ],
    image: '/images/mk-bride-2.svg',
    cta: 'Consultar disponibilidad para mi fecha',
    availabilityNote: 'Agenda 2026 abierta · Pocas fechas en temporada alta (octubre a marzo).',
  },

  packages: {
    eyebrow: 'Experiencias',
    title: 'Una experiencia para cada ocasión.',
    intro:
      'Cada servicio se cotiza a medida según la ocasión, la cantidad de personas y el lugar. Escribime y te paso el presupuesto exacto sin compromiso.',
    note: 'Los valores varían según fecha, traslado y cantidad de maquillajes. Consultá disponibilidad para tu fecha.',
    items: [
      {
        id: 'pkg-novia',
        name: 'Novia',
        price: 'A consultar',
        description: 'La experiencia completa para el día de tu casamiento.',
        features: ['Prueba de maquillaje previa', 'Preparación de piel', 'Maquillaje de larga duración', 'Pestañas incluidas', 'A domicilio en CABA y zona'],
        featured: true,
      },
      {
        id: 'pkg-social',
        name: 'Social & Eventos',
        price: 'A consultar',
        description: 'Para invitadas, cumpleaños, civiles y eventos.',
        features: ['Asesoría del look', 'Maquillaje profesional', 'Larga duración', 'Opción para grupos', 'A domicilio o en estudio'],
        featured: false,
      },
      {
        id: 'pkg-clase',
        name: 'Clase de automaquillaje',
        price: 'A consultar',
        description: 'Aprendé a maquillarte vos misma, paso a paso.',
        features: ['Clase 1:1 personalizada', 'Adaptada a tus rasgos y productos', 'Material de apoyo', 'Tips profesionales', 'Presencial u online'],
        featured: false,
      },
    ],
  },

  testimonials: {
    eyebrow: 'Testimonios',
    title: 'Lo que dicen mis clientas.',
    rating: '5.0',
    ratingLabel: 'Opiniones reales de novias, invitadas y alumnas',
    items: [
      { id: 't1', name: 'Florencia S.', role: 'Novia', categorySlug: 'novias', source: 'Google', quote: 'Jennifer es una genia. Me maquilló para mi casamiento y me sentí yo misma, pero mucho más linda. Duró impecable toda la noche. Tal cual lo que soñaba.' },
      { id: 't2', name: 'Camila R.', role: 'Invitada', categorySlug: 'social', source: 'Instagram', quote: 'Profesional, detallista y súper amorosa. Me maquilló para un evento y aguantó perfecto desde la tarde hasta la madrugada. La recomiendo mil veces.' },
      { id: 't3', name: 'Lucía M.', role: 'Producción', categorySlug: 'editorial', source: 'Google', quote: 'Trabajamos juntas en una producción de beauty y fue un placer. Entendió el concepto al toque y el resultado en cámara fue espectacular.' },
      { id: 't4', name: 'Julieta P.', role: 'Alumna de automaquillaje', categorySlug: 'clases', source: 'Instagram', quote: 'Tomé una clase de automaquillaje y aprendí un montón. Explica todo con mucha paciencia y claridad, adaptado a mi cara y mis productos.' },
    ],
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Todo lo que querés saber.',
    intro: 'Y si te queda alguna duda, escribime por WhatsApp y la resolvemos al instante.',
    items: [
      { id: 'f1', question: '¿En qué zona trabajás?', answer: 'Trabajo en Capital Federal (CABA) y alrededores. Para novias y eventos voy al lugar donde te prepares; consultá si estás en Gran Buenos Aires.' },
      { id: 'f2', question: '¿Con cuánta anticipación conviene reservar?', answer: 'Para novias, lo ideal es reservar con 2 a 6 meses de anticipación, sobre todo en temporada alta. Para eventos sociales, con algunas semanas suele alcanzar.' },
      { id: 'f3', question: '¿La prueba de maquillaje está incluida?', answer: 'Para novias siempre hacemos una prueba previa para definir el look. La coordinamos con tiempo antes del casamiento.' },
      { id: 'f4', question: '¿Cómo reservo mi fecha?', answer: 'Escribime por WhatsApp con la fecha y el tipo de evento. Te paso disponibilidad y presupuesto, y la fecha se confirma con una seña.' },
      { id: 'f5', question: '¿Maquillás también a invitadas o familiares?', answer: 'Sí. Puedo maquillar a tu mamá, hermanas e invitadas el mismo día, todo coordinado y a tiempo. Consultá por el servicio para grupos.' },
      { id: 'f6', question: '¿Qué productos usás?', answer: 'Trabajo con productos premium de larga duración, pensados para que el maquillaje se mantenga impecable y se vea increíble en persona y en fotos.' },
    ],
  },

  contact: {
    eyebrow: 'Reservá tu fecha',
    title: 'Contemos tu historia.',
    intro: 'Completá tus datos y te respondo por WhatsApp con disponibilidad y presupuesto. Sin compromiso.',
    eventTypes: ['Novia / Casamiento', 'Maquillaje social', 'Evento / Quince', 'Producción / Editorial', 'Clase de automaquillaje', 'Otro'],
  },

  ads: {
    eyebrow: 'Reservá tu fecha',
    title: 'Reservá tu maquillaje profesional en Capital.',
    text: 'Maquillaje a medida para novias, eventos y producciones en CABA y alrededores. Looks naturales, elegantes y de larga duración, con atención 100% personalizada.',
    benefits: [
      'Looks naturales y de larga duración',
      'Atención personalizada de principio a fin',
      'Ideal para novias, eventos y fotos',
      'Trabajo en CABA y alrededores',
    ],
    cta: 'Consultar disponibilidad por WhatsApp',
  },

  finalCta: {
    eyebrow: 'Agendá tu cita',
    titleLine1: 'Es tu momento',
    titleLine2: 'de brillar.',
    text: 'Contame de tu evento y la fecha. Te respondo personalmente y vemos juntas cómo lograr tu mejor versión.',
    cta: 'Escribime y reservá tu fecha',
  },

  seo: {
    title: 'Jennifer Makeup Artist | Maquillaje profesional en CABA, Capital Federal',
    description:
      'Maquilladora profesional en Capital Federal (CABA). Maquillaje para novias, eventos, producciones y clases de automaquillaje. Looks naturales y de larga duración. Reservá por WhatsApp.',
    keywords: [
      'maquillaje profesional CABA',
      'maquilladora Capital Federal',
      'maquillaje novias Buenos Aires',
      'maquillaje eventos CABA',
      'makeup artist Buenos Aires',
      'maquillaje social',
      'clases de automaquillaje',
      'producción editorial beauty',
    ],
    ogImage: '/images/og.svg',
    siteUrl: 'https://jennifermakeup.com.ar',
  },
};
