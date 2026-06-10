# B2B Guardrail — Landing page

Sitio de marketing público de B2B Guardrail. Proyecto Next.js **independiente y
autónomo**: no contiene nada de la app de Shopify (ni Polaris, App Bridge,
Prisma, base de datos o claves). Solo páginas estáticas.

## Páginas

- `/` — landing principal ([app/components/Landing.tsx](app/components/Landing.tsx))
- `/privacy` — política de privacidad ([app/privacy/page.tsx](app/privacy/page.tsx))

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Variables de entorno (opcional)

| Variable                  | Por defecto                               | Para qué sirve                          |
| ------------------------- | ----------------------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_INSTALL_URL` | `https://apps.shopify.com/b2b-guardrail`  | Destino de todos los botones de "Install" |

Si el listing aún no existe, déjala sin definir y se usa el fallback.

## Desplegar en Vercel

Este proyecto vive en la carpeta `landing/` dentro del repo de la app. Para
publicar **solo la landing** sin exponer el código de Shopify, súbela como un
repositorio propio:

```bash
# desde dentro de la carpeta landing/
git init
git add .
git commit -m "B2B Guardrail landing page"
git branch -M main
git remote add origin git@github.com:<tu-usuario>/b2b-guardrail-landing.git
git push -u origin main
```

Luego en Vercel: **Add New → Project → importa el repo** `b2b-guardrail-landing`.
Vercel detecta Next.js automáticamente; no hay que configurar nada más. Si
quieres, añade `NEXT_PUBLIC_INSTALL_URL` en **Settings → Environment Variables**.

> Alternativa sin repo nuevo: si prefieres subir todo el monorepo, en Vercel
> pon **Root Directory = `landing`**. Pero eso publica también el código de la
> app en GitHub, así que para mantener Shopify privado usa el repo separado de
> arriba.
