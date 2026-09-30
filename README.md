# ANAKIN — sitio oficial

Web de **ANAKIN**, banda de Mendoza, Argentina. Una página del internet underground de 1997, hecha con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4. Sin backend: todo el contenido está en archivos TypeScript.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # tests de fechas (getNextShow, isPastShow, ...)
npm run lint
npm run build && npm start
```

## Cómo editar el contenido

Todo lo editable está en `src/data/`. No hace falta tocar componentes.

| Qué | Archivo |
| --- | --- |
| Fechas de shows | `src/data/shows.ts` |
| Discos | `src/data/releases.ts` |
| Integrantes y bio | `src/data/members.ts` |
| Fotos | `src/data/photos.ts` + archivos en `public/images/photos/` |
| Redes y mail de booking | `src/data/social.ts` |
| Dominio, título, descripción, foto de banda | `src/data/site.ts` |

- **Shows**: agregá un objeto con `date` en formato `AAAA-MM-DD`. El orden no importa. El próximo show y el archivo de shows pasados se calculan solos (hora de Mendoza). No borres las fechas viejas: forman el archivo. Campos opcionales: `ticketUrl`, `eventUrl`, `mapUrl`, `description`.
- **Redes**: si un link queda vacío (`""`), se muestra como "SOON".
- **Fotos**: subí los originales sin editar. El efecto fotocopia se aplica con CSS y el lightbox muestra la foto original.
- **Logo**: reemplazá `src/assets/source/logo-original.jpg` (fondo blanco) y corré `npm run logo && npm run icons`. Se recorta el fondo y se regeneran el logo de la web y los favicons.
- **Portadas**: agregá `cover: "/images/covers/archivo.jpg"` a cada disco. Sin portada se genera una provisoria.

## Antes de publicar (pendientes)

- [ ] Dominio real en `src/data/site.ts` (o `NEXT_PUBLIC_SITE_URL`). Se usa para canonical, sitemap y Open Graph.
- [ ] Mail de booking real (hoy `booking@example.com`).
- [ ] Más fotos: por ahora el archivo tiene la foto B/N y el flyer de la gira.
- [ ] Portadas y links propios de cada disco (hoy apuntan a los perfiles de Spotify y Bandcamp).
- [ ] Confirmar tipo de cada disco (álbum/EP) y el tracklist de *Fiesta Distroy Vol. 1*: los temas salen de la maqueta del brief y el tercero figura como "El Pináculo...".
- [ ] Revisar la bio de `members.ts` (es provisoria).

## Estructura

```
src/
├── app/            páginas (/, /music, /shows, /band, /photos, /contact), 404, SEO, íconos
├── components/     layout, retro (design system), home, music, shows, band, photos, contact
├── data/           contenido editable
├── lib/            lógica de fechas (+ tests), metadata, JSON-LD, imagen OG
└── styles/retro.css   texturas y efectos
scripts/            generadores de favicon/cursores y fotos provisorias
```

## Contador de visitas

El contador del footer es real: usa [Abacus](https://abacus.jasoncameron.dev), un servicio gratuito sin cuenta. Suma una visita por sesión de navegador y en `npm run dev` solo lee, así las pruebas locales no suman. La clave está en `visitCounter` (`src/data/site.ts`). Si el servicio no responde, el contador se oculta y el resto de la página funciona igual.

## Easter eggs

- Código Konami: ↑ ↑ ↓ ↓ ← → ← → B A.
