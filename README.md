# Arena Store · prototipo funcional

**Arena Store** es una comunidad independiente de fans para explorar y documentar **cuentas completas** de Arena Breakout Mobile. Las misceláneas, cosméticos y recursos son atributos de cada cuenta, **no productos individuales**.

## Estado actual
- ✅ Web responsive (PC + móvil), navegación y fichas de cuentas completas.
- ✅ Filtros, búsqueda, favoritos, perfil, publicaciones, inventario visual con cantidades, comunidad y mensajería simulada.
- ✅ Persistencia local del navegador y ejemplos editables, sin servidor.
- ✅ Auto-despliegues de Vercel desactivados en `vercel.json`.
- ⏳ Autenticación, base de datos, imágenes finales, moderación real, pagos y transferencias NO conectados.

**Importante:** todo el contenido transaccional es una DEMO. Nunca introduzcas claves, correos de recuperación ni credenciales del juego. Los usuarios, precios y reseñas de ejemplo son ficticios. Proyecto no afiliado al juego ni a sus creadores.

## Ejecutar
Sin dependencias ni build:
```bash
python -m http.server 8000
```
Abre http://localhost:8000, o importa el repositorio en Vercel como proyecto estático (pero se debe publicar manualmente). La web usa módulos ES; abrir index.html directamente como archivo puede estar limitado por CORS del navegador.

## Estructura
- `index.html`: documento HTML inicial.
- `src/app.js`: navegación, formularios, catálogo, vistas e interacciones.
- `src/data.js`: artículos de inventario y cuentas de ejemplo.
- `src/styles.css`: diseño responsive.
- `assets/brand.svg`: identidad provisional vectorial (reemplazar por logo final autorizado).
- `supabase/schema.sql`: modelo de datos y seguridad RLS, no aplicado todavía.
- `docs/ROADMAP.md`: pendientes para versión pública.

## Política de despliegue
`vercel.json` usa `git.deploymentEnabled=false` para **no desplegar con cada commit**. Controla versiones en GitHub y realiza despliegues manuales cuando una versión esté revisada.

## Avisos
Verifica los términos del juego y el procesador de pagos antes de operar con cuentas de terceros. No custodiar dinero ni credenciales hasta contar con una solución autorizada y garantías.
