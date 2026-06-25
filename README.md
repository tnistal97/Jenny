# Jennifer Makeup Artist — Landing + Portfolio + Admin

Sitio premium (estética editorial de belleza) para una maquilladora profesional en
Capital Federal (CABA). Incluye landing, portfolio filtrable con lightbox, bloque de
conversión para Google Ads y un panel de administración para editar el contenido sin tocar código.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · `next/image`
· export estático listo para Netlify.

---

## 1. Correr localmente

Requisitos: Node.js 18.18+ (recomendado 20).

```bash
npm install
npm run dev
```

Abrir http://localhost:3000 — y http://localhost:3000/admin para el panel.

> `npm run dev` y `npm run build` ejecutan automáticamente `scripts/gen-placeholders.mjs`,
> que genera las imágenes placeholder en `public/images` si no existen.

### Variables de entorno

Copiá `.env.example` a `.env.local` y ajustá:

```bash
NEXT_PUBLIC_JENNIFER_ADMIN_PASS=jennifer2026   # contraseña del panel /admin
NEXT_PUBLIC_SITE_URL=https://jennifermakeup.com.ar
NEXT_PUBLIC_GTAG_ID=                            # GA4/Google Ads (G-... o AW-...). Vacío = sin tag.
NEXT_PUBLIC_GADS_CONVERSION=                    # Label de conversión Ads para el clic de WhatsApp
```

**Google Ads / Analytics:** con `NEXT_PUBLIC_GTAG_ID` cargado, el sitio inyecta gtag y
trackea cada clic de WhatsApp (hero, novias, paquetes, barra mobile, formulario, etc.) como
evento `whatsapp_click`. Con `NEXT_PUBLIC_GADS_CONVERSION` además dispara el evento
`conversion` de Google Ads. Sin variables, no se carga nada (dev limpio) pero igual se
empuja a `dataLayer` para GTM.

---

## 2. Editar el contenido

Hay **dos formas**, y conviven:

### A) Panel de administración (`/admin`) — recomendado para la clienta
1. Entrá a `/admin` e ingresá la contraseña (`NEXT_PUBLIC_JENNIFER_ADMIN_PASS`).
2. Editá cualquier sección (General, Hero, Sobre mí, Servicios, **Portfolio**, Proceso,
   **Novias**, Testimonios, Conversión, SEO). Podés **agregar, eliminar y reordenar**
   servicios, categorías, proyectos, imágenes, testimonios, pasos y beneficios.
3. **Portfolio:** se administra por **categorías** y **proyectos**:
   - Creá/edití/reordená **categorías** (nombre, slug, descripción, portada).
   - Dentro creá **proyectos** (título, categoría, descripción, ubicación, fecha,
     tipo de evento) con **varias imágenes** por proyecto (cada una con su etiqueta).
   - Marcá un proyecto como **Destacado** para que aparezca en la Home.
4. **Testimonios:** podés asociar cada uno a una **categoría** (Novias, Social, etc.).
5. **Imágenes:** pegá una ruta (`/images/...`) o una URL, o tocá *Subir archivo*
   (se guarda embebida como *data URL*).
6. Tocá **Guardar**. El contenido queda en `localStorage` del navegador y el sitio lo
   refleja al instante (incluso en otra pestaña abierta).

> El sitio lee primero `localStorage`; si no hay nada, usa el contenido por defecto.

### B) Editar el contenido por defecto (en código)
El contenido base vive en [`src/lib/content.ts`](src/lib/content.ts). Editá ese archivo para
cambiar los textos/imágenes que ven Google y quienes entran sin configuración guardada.
**El SEO indexable (title, description, JSON-LD) se toma de este archivo**, no de `localStorage`.

---

## 3. Exportar / Importar configuración

Desde `/admin`:

- **Exportar** → descarga `jennifer-config.json` con todo el contenido actual.
- **Importar** → cargás un `jennifer-config.json` y se aplica + guarda.
- **Restablecer** → vuelve al contenido por defecto.

Esto permite hacer backups, mover la configuración entre dispositivos o, más adelante,
versionar el contenido. Para volverlo "oficial", pegá el JSON exportado dentro de
`src/lib/content.ts`.

---

## 4. Imágenes

Las imágenes por defecto son **placeholders editoriales** (SVG con gradientes nude/blush,
luz de estudio y grano) generados por `scripts/gen-placeholders.mjs`. Están pensadas para
reemplazarse por fotos reales:

- **Opción rápida:** desde `/admin`, subí las fotos reales en cada slot.
- **Opción por archivos:** dejá tus fotos en `public/images/` con el mismo nombre
  pero `.jpg` (ej: `hero.jpg`). El generador **no sobreescribe** un `.jpg` existente;
  luego actualizá la ruta en `src/lib/content.ts` o en el admin.

Recomendado: fotos verticales para portfolio, horizontal grande para el hero,
optimizadas (~1600px de ancho, JPG/WebP).

---

## 5. Subir a Netlify

El sitio se exporta de forma **estática** (`output: 'export'` → carpeta `out/`).

### Opción A — Git + Netlify (recomendado)
1. Subí el repo a GitHub/GitLab.
2. En Netlify: *Add new site → Import an existing project*.
3. Netlify detecta `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `out`
4. En *Site settings → Environment variables* agregá
   `NEXT_PUBLIC_JENNIFER_ADMIN_PASS` y `NEXT_PUBLIC_SITE_URL`.
5. Deploy.

### Opción B — Drag & drop / CLI
```bash
npm run build           # genera /out
npx netlify deploy --prod --dir=out
```

---

## 6. Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # fuentes, metadata, OG/Twitter, JSON-LD, ContentProvider
│   ├── page.tsx            # Home (Hero, About, Services, Proceso, Portfolio destacado,
│   │                       #       Especial novias, Testimonios, Ads, CTA final)
│   ├── portfolio/page.tsx  # Portfolio completo (categorías → proyectos → galería)
│   ├── admin/page.tsx      # Panel de administración (noindex)
│   ├── globals.css
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── layout/             # Header, Footer, Logo
│   ├── sections/           # Hero, About, Services, Process (Cómo trabajo),
│   │                       # PortfolioHome (destacados), Bridal (Especial novias),
│   │                       # Testimonials, AdsBlock, FinalCta
│   ├── portfolio/          # PortfolioExperience (categorías/proyectos/galería)
│   ├── ui/                 # Button, WhatsAppButton, Reveal, SectionHeading,
│   │                       # Lightbox, FloatingWhatsApp, icons
│   ├── admin/              # AdminApp, Login, AdminPanel, ui (form fields)
│   └── SeoJsonLd.tsx
├── lib/
│   ├── content.ts          # CONTENIDO POR DEFECTO (editable): categorías + proyectos
│   ├── content-context.tsx # ContentProvider (lee localStorage)
│   ├── storage.ts          # load/save/merge localStorage
│   └── whatsapp.ts         # helpers de enlaces
└── types/content.ts        # tipos del contenido
scripts/gen-placeholders.mjs # genera placeholders de maquillaje en public/images
```

### Modelo del portfolio
- **Categoría:** `{ id, name, slug, description, cover }`.
- **Proyecto:** `{ id, title, categoryId, description, location, date, eventType, featured, images[] }`.
- **Imagen de proyecto:** `{ id, src, caption }`.

La Home muestra solo los proyectos con `featured: true` (4–6) + las categorías + CTA al
portfolio completo. La página `/portfolio` permite navegar: **categorías → proyectos de la
categoría → galería del proyecto** (con lightbox). Soporta deep-links por hash:
`/portfolio#cat-novias` y `/portfolio#proj-<id>`.

---

## 7. SEO y performance

- `metadata`, Open Graph y Twitter Card en `app/layout.tsx`.
- **JSON-LD** `BeautySalon` / `ProfessionalService` en `components/SeoJsonLd.tsx`.
- `sitemap.xml` y `robots.txt` (excluye `/admin`).
- `next/image` con `lazy loading` en portfolio y servicios; hero con `priority`.
- Fuentes self-hosted vía `next/font` (sin requests externos).
- Accesibilidad: navegación por teclado en el lightbox (Esc / ← / →), `aria-label`s,
  foco visible, `prefers-reduced-motion` respetado en las animaciones.

---

## 8. Seguridad del admin (importante)

El login de `/admin` es una **protección visual del lado del cliente** (compara contra
`NEXT_PUBLIC_JENNIFER_ADMIN_PASS`, que viaja al navegador). **No es seguridad de producción.**

Cómo mejorarlo cuando haga falta:
- Autenticación real con **Netlify Identity**, **Supabase Auth** o **Clerk**.
- Mover el contenido a una base/CMS (**Supabase**, **Firebase**, **Sanity**, **Contentful**)
  y servir el contenido desde ahí en lugar de `localStorage`.

### Conectar un backend más adelante
El contenido ya está centralizado y tipado (`SiteContent`). Para migrar:
1. Guardá el JSON del contenido en tu base/CMS.
2. Reemplazá `loadStoredContent()` en `src/lib/storage.ts` (o el `ContentProvider`)
   por un fetch a tu API que devuelva el mismo shape `SiteContent`.
3. El resto del sitio no cambia.

---

## 9. Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build estático → `out/` |
| `npm run start` | Sirve el build (modo Node) |
| `npm run lint` | ESLint |
| `npm run placeholders` | Regenera las imágenes placeholder |

---

Hecho con dedicación para **Jennifer Makeup Artist** · Capital Federal, Buenos Aires.
