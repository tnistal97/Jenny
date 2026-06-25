import type { SiteContent } from '@/types/content';

// ════════════════════════════════════════════════════════════════════════
//  CONTENIDO POR DEFECTO — "fuente de verdad" del sitio.
//  Editá este archivo o usá el panel /admin (guarda en localStorage + export/import).
// ════════════════════════════════════════════════════════════════════════

const img = (id: string, src: string, caption: string) => ({ id, src, caption });

export const defaultContent: SiteContent = {
  general: {
    name: 'Jenny Rojas',
    role: 'Makeup · Hair · Brows',
    whatsapp: '5491100000000',
    whatsappMessage:
      'Hola Jenny! Vi tu web y quería consultar por un turno. ¿Tenés disponibilidad?',
    instagram: 'jennyrojas.makeup',
    tiktok: '',
    email: 'jennyrojas.makeup@gmail.com',
    zone: 'Las Cañitas · Palermo, CABA',
    city: 'Buenos Aires, Argentina',
  },

  hero: {
    eyebrow: 'Jenny Rojas · Makeup · Hair · Brows',
    titleLine1: 'Makeup, Hair',
    titleLine2: '& Brows.',
    subtitle:
      'Soy Jenny Rojas. Diseño looks dewy, con glow y piel real, pensados para verse impecables en persona y frente a cámara. Makeup, hair y cejas, en Las Cañitas.',
    ctaPrimary: 'Escribime',
    ctaSecondary: 'Ver trabajos',
    image: '/images/hero/hero.jpg',
    trust: ['Makeup · Hair · Brows', 'Las Cañitas · Palermo', 'Dewy & glow skin', 'Producciones & figuras'],
    reviewQuote: 'Sos la reina, ese talento. 🔥',
    reviewAuthor: 'desde Instagram',
  },

  about: {
    eyebrow: 'Sobre Jenny',
    titleLine1: 'Hola, soy Jenny.',
    titleLine2: 'Makeup & brow artist.',
    paragraphs: [
      'Soy Jenny Rojas, makeup, hair & brow artist con base en Las Cañitas, Palermo. Vivo del maquillaje porque amo lo que pasa cuando una clienta se mira al espejo y se siente ella misma, en su mejor versión.',
      'Mi sello es el look dewy: piel con glow, fresca y luminosa, cejas prolijas que enmarcan la mirada y un acabado que se ve increíble en persona y en cámara. Nada recargado, todo a tu medida.',
      'Trabajo con creadoras de contenido, figuras y clientas de todos los días, en eventos, producciones editoriales y contenido para redes. Cuando hace falta, armo equipo con peinadores y fotógrafos para que el resultado sea de otro nivel.',
    ],
    bullets: [
      'Estilo dewy: piel con glow real',
      'Makeup + Hair + Brows en un solo lugar',
      'Looks pensados para cámara y vida real',
      'Experiencia con producciones y figuras',
      'Atención cercana en Las Cañitas, Palermo',
    ],
    highlights: [
      { value: 'Dewy', label: 'glow skin' },
      { value: '3-en-1', label: 'makeup · hair · brows' },
      { value: 'CABA', label: 'Las Cañitas, Palermo' },
      { value: 'Editorial', label: 'producciones & figuras' },
    ],
    image: '/images/about/jenny.jpg',
    cta: 'Escribime',
  },

  services: [
    {
      id: 'makeup',
      title: 'Makeup',
      description:
        'Mi especialidad: looks dewy con piel luminosa y glow real. Naturales o glam, siempre a tu medida y pensados para que duren impecables.',
      image: '/images/portfolio/look-1.jpg',
    },
    {
      id: 'hair',
      title: 'Hair styling',
      description:
        'Peinado para completar el look: ondas, recogidos y acabados prolijos. Makeup + hair coordinados en un solo lugar.',
      image: '/images/portfolio/look-3.jpg',
    },
    {
      id: 'brows',
      title: 'Brows',
      description:
        'Diseño y maquillaje de cejas que enmarcan la mirada y equilibran el rostro. Una de las cosas que más me piden.',
      image: '/images/portfolio/look-5.jpg',
    },
    {
      id: 'eventos',
      title: 'Eventos',
      description:
        'Cumpleaños, fiestas, cenas y noches especiales. Un look favorecedor y de larga duración para que disfrutes sin retoques.',
      image: '/images/portfolio/look-4.jpg',
    },
    {
      id: 'producciones',
      title: 'Producciones',
      description:
        'Editorial, campañas y beauty shots. Trabajo en equipo con fotógrafos y peinadores para lograr el concepto exacto de cada producción.',
      image: '/images/portfolio/look-2.jpg',
    },
    {
      id: 'contenido',
      title: 'Contenido para redes',
      description:
        'Makeup para creadoras de contenido y figuras: looks que se ven increíbles en cámara, fotos y reels.',
      image: '/images/portfolio/look-6.jpg',
    },
  ],

  portfolio: {
    eyebrow: 'Trabajos',
    title: 'Looks reales, glow real.',
    intro:
      'Una selección de mi trabajo en beauty, editorial y eventos. Piel dewy, cejas prolijas y resultados pensados para verse impecables en cámara y en persona.',
    categories: [
      { id: 'cat-beauty', name: 'Beauty', slug: 'beauty', description: 'Glam y nude looks con piel luminosa y glow.', cover: '/images/portfolio/beauty/glam-luminoso.jpg' },
      { id: 'cat-editorial', name: 'Editorial', slug: 'editorial', description: 'Producciones y beauty shots para cámara.', cover: '/images/portfolio/featured/sofi-fernandez.jpg' },
      { id: 'cat-social', name: 'Social', slug: 'social', description: 'Eventos y noches especiales.', cover: '/images/portfolio/featured/china-dominicci.jpg' },
      { id: 'cat-hair', name: 'Hair', slug: 'hair', description: 'Makeup + hair en un solo look.', cover: '/images/portfolio/featured/caro-calvagni.jpg' },
      { id: 'cat-brows', name: 'Brows', slug: 'brows', description: 'Cejas que enmarcan la mirada.', cover: '/images/portfolio/featured/cami-mayan.jpg' },
    ],
    projects: [
      {
        id: 'pr-caro',
        title: 'Caro Calvagni',
        categoryId: 'cat-hair',
        description:
          'Un look natural con glow real y peinado suelto. Piel dewy, mirada cálida y acabado fresco para cámara.',
        location: 'CABA',
        date: '2025',
        eventType: 'Beauty · Hair',
        featured: true,
        credits: ['Makeup · Jenny Rojas', 'Hair · @celerobledo.hs', 'Talent · @carocalvagni'],
        permalink: 'https://www.instagram.com/jennyrojas.makeup/p/DY3Ob8GDvbW/',
        images: [img('caro-1', '/images/portfolio/featured/caro-calvagni.jpg', 'Resultado')],
      },
      {
        id: 'pr-sofi',
        title: 'Sofi Fernández',
        categoryId: 'cat-editorial',
        description:
          'Producción editorial con piel jugosa y mirada definida. Un glam fuerte pensado para cámara, en equipo.',
        location: 'Producción, CABA',
        date: '2025',
        eventType: 'Editorial',
        featured: true,
        credits: ['Makeup · Jenny Rojas', 'Hair · @mauromaxdebrito', 'Talent · @sofifernandez'],
        permalink: 'https://www.instagram.com/sofifernandez/p/DZ8WoezCRbu/',
        images: [img('sofi-1', '/images/portfolio/featured/sofi-fernandez.jpg', 'Editorial')],
      },
      {
        id: 'pr-cami',
        title: 'Cami Mayan',
        categoryId: 'cat-brows',
        description:
          'Glam con foco en cejas prolijas y piel con glow. Un look cuidado, listo para cámara y para la noche.',
        location: 'Belgrano, CABA',
        date: '2025',
        eventType: 'Beauty · Brows',
        featured: true,
        credits: ['Makeup · Jenny Rojas', 'Talent · @camimayan'],
        permalink: 'https://www.instagram.com/jennyrojas.makeup/p/DXSTujlltiP/',
        images: [img('cami-1', '/images/portfolio/featured/cami-mayan.jpg', 'Resultado')],
      },
      {
        id: 'pr-china',
        title: 'China Dominicci',
        categoryId: 'cat-social',
        description:
          'Look de noche con mirada intensa y piel luminosa. Glam de larga duración para un evento.',
        location: 'CABA',
        date: '2025',
        eventType: 'Social',
        featured: true,
        credits: ['Makeup · Jenny Rojas', 'Talent · @chinadominicci'],
        permalink: 'https://www.instagram.com/chinadominicci/p/DXSuApNDldf/',
        images: [img('china-1', '/images/portfolio/featured/china-dominicci.jpg', 'Resultado')],
      },
      {
        id: 'pr-glam-luminoso',
        title: 'Glam luminoso',
        categoryId: 'cat-beauty',
        description:
          'Un glam fresco con piel dewy, mirada cálida y cejas prolijas. Favorecedor y natural, increíble de cerca.',
        location: 'Las Cañitas, CABA',
        date: '2025',
        eventType: 'Beauty',
        featured: true,
        credits: ['Makeup · Jenny Rojas'],
        images: [img('gl-1', '/images/portfolio/beauty/glam-luminoso.jpg', 'Resultado')],
      },
      {
        id: 'pr-editorial-glow',
        title: 'Editorial glow',
        categoryId: 'cat-editorial',
        description:
          'Un look editorial más oscuro y sofisticado: piel con glow, mirada ahumada y acabado de campaña.',
        location: 'Producción, CABA',
        date: '2024',
        eventType: 'Editorial',
        featured: true,
        credits: ['Makeup · Jenny Rojas'],
        images: [img('eg-1', '/images/portfolio/editorial/editorial-glow.jpg', 'Beauty shot')],
      },
      {
        id: 'pr-soft-glam',
        title: 'Soft glam',
        categoryId: 'cat-beauty',
        description:
          'Un glam suave y favorecedor: ojos cálidos, labios nude y piel con glow. Equilibrado y elegante.',
        location: 'Las Cañitas, CABA',
        date: '2024',
        eventType: 'Beauty',
        featured: false,
        credits: ['Makeup · Jenny Rojas'],
        images: [img('sg-1', '/images/portfolio/beauty/soft-glam.jpg', 'Resultado')],
      },
      {
        id: 'pr-nude-glow',
        title: 'Nude glow',
        categoryId: 'cat-beauty',
        description:
          'Maquillaje nude con foco en la piel: glow real, acabado fresco y natural. Para verse bien sin parecer maquillada.',
        location: 'Las Cañitas, CABA',
        date: '2024',
        eventType: 'Beauty',
        featured: false,
        credits: ['Makeup · Jenny Rojas'],
        images: [img('ng-1', '/images/portfolio/beauty/nude-glow.jpg', 'Resultado')],
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
    eyebrow: 'Lo que dicen',
    title: 'Lo que dicen en Instagram.',
    rating: '5.0',
    ratingLabel: 'Comentarios reales de su Instagram',
    items: [
      { id: 't1', name: '@barbymencia', role: 'Comunidad', source: 'Instagram', quote: '¡Increíble, Jenny! Sos la reina. Ese talento. 🔥👏' },
      { id: 't2', name: '@sammrld', role: 'Clienta', source: 'Instagram', quote: 'Sos talentosa, amorosa, increíble. Tu trabajo es magia. 💝' },
      { id: 't3', name: '@celerobledo.hs', role: 'Peinadora', source: 'Instagram', quote: 'Amo trabajar con ustedes. ❤️' },
      { id: 't4', name: '@atriomaria', role: 'Clienta', source: 'Instagram', quote: 'Jenny, te amo. Sos una genia. 😍' },
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
    eyebrow: 'Turnos disponibles',
    titleLine1: 'Hagamos',
    titleLine2: 'tu mejor look.',
    text: 'Contame qué necesitás —evento, producción o un look para vos— y coordinamos tu turno. Te respondo personalmente.',
    cta: 'Escribime',
  },

  seo: {
    title: 'Jenny Rojas | Makeup, Hair & Brow Artist en Las Cañitas, CABA',
    description:
      'Jenny Rojas — makeup, hair & brow artist en Las Cañitas, Palermo (CABA). Looks dewy con glow real para eventos, producciones y contenido. Trabajo con creadoras y figuras. Turnos por Instagram.',
    keywords: [
      'maquilladora Las Cañitas',
      'makeup artist Palermo CABA',
      'maquillaje dewy glow',
      'maquillaje producciones Buenos Aires',
      'brow artist CABA',
      'hair y makeup CABA',
      'maquillaje editorial Buenos Aires',
      'Jenny Rojas makeup',
    ],
    ogImage: '/images/portfolio/look-1.jpg',
    siteUrl: 'https://jennyrojas.com.ar',
  },
};
