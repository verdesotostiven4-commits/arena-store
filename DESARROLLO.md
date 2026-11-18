# Vista previa de Arena Store sin gastar despliegues de Vercel

## GitHub Pages (recomendado para móvil)

Esta web es HTML, CSS y JavaScript estático: no necesita un servidor Node para mostrar la interfaz.

### Activación (solo una vez)
1. Abre https://github.com/verdesotostiven4-commits/arena-store/settings/pages
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Elige rama **desarrollo**, carpeta **/(root)** y pulsa **Save**.
4. Cuando GitHub Pages anuncie que está publicada, abre https://verdesotostiven4-commits.github.io/arena-store/

Los cambios que se envíen a desarrollo se publicarán en GitHub Pages sin utilizar despliegues de Vercel ni modificar main. GitHub Pages sí realiza su propia publicación gratuita para repositorios públicos.

## Separación de entornos
- Rama **main**: producción actual. No la mezcles con desarrollo hasta aprobar la interfaz.
- Rama **desarrollo**: mejoras visuales, formularios y vistas previas.
- Vercel: la configuración actual incluye `"deploymentEnabled": false`.
- No se requiere StackBlitz ni instalaciones en el teléfono para revisar el sitio de Pages.
- El catálogo, comentarios y publicaciones siguen funcionando solo localmente en el navegador por ahora; no existe registro real ni pagos.
- Nunca introducir credenciales del juego, contraseñas ni códigos de recuperación en el prototipo.

## Desarrollo local en PC
```bash
npm install
npm run dev
```
