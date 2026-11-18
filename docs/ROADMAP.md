# Arena Store — Roadmap para producto real

## Entregado (demo)
- Fichas de cuentas, no venta de artículos sueltos.
- Koen netos, valor de almacén, nivel 1–30, térmicas, skins y cantidades de misceláneas.
- Catálogo de misceláneas orientativo; solo filtro >=400k en el formulario.
- Búsqueda, filtros, favoritos, comentarios, perfiles ficticios y mensajes locales.
- Publicar/eliminar fichas con localStorage.
- Diseño responsive y despliegues Vercel manuales.

## Bloqueadores para lanzamiento real
1. Confirmar permiso para comercializar cuentas y uso autorizado de marca, imágenes y propiedad intelectual.
2. Autenticación real y autorización por usuarios. Configurar nuevo proyecto Supabase, variables de entorno y ejecutar schema.sql tras revisión.
3. Moderación y sistema de confianza antiabuso con roles administrativos, registro de auditoría, control de reportes y verificación auténtica.
4. Protección contra contenido engañoso, pruebas falsificadas y credenciales expuestas.
5. Política de privacidad, tratamiento de datos, consentimiento y comprobación de elegibilidad legal.
6. Revisión del procesador de pagos, política de devoluciones y mecanismo de disputa con proveedor autorizado; nunca custodiar contraseñas del juego ni fondos manualmente.
7. Sustituir logo vectorial provisional y emojis por los recursos aprobados, individualizados, livianos y sin fondo; añadir descripciones alternativas.
8. Tests e2e, accesibilidad, rendimiento, límites de tamaño de archivo, control de spam y rate limits.
9. Publicar manualmente cuando el sitio esté revisado; el repositorio usa git.deploymentEnabled=false.

## Diseño del inventario
Las misceláneas son propiedades de una cuenta (item_code, quantity). La clasificación visual del juego y el precio en Koen son datos distintos: no se debe asignar rareza por precio. Toda publicación debe contener un inventario veraz y validable.
