# Encuentro por ejes - TecBA - XBA
Todo lo necesario para la charla del viernes 9/10/2026 en una carpeta. No requiere Claude para funcionar.

La versión publicada incorpora la primera tanda de mejoras UX y la migración a GitHub Pages + Google Sheets (9/10/2026).

## Direcciones
- Sitio a retirar: https://interoperar-ba.netlify.app/
- Sitio anterior de contingencia: https://encuentro-por-ejes.pages.dev/
- Sitio principal: https://jmiguez78.github.io/encuentro-por-ejes/ (GitHub Pages).
- Votos: planilla de Google "Respuestas encuentro por ejes" (hojas `donde-si` y `por-que-no`).

## Contenido
- `1_sitio/index.html`: la página completa en un solo archivo (fuentes, logos e ícono incluidos), lista para GitHub Pages y con Google Sheets como destino de votos.
- `1_sitio/encuentro.zip`: el mismo archivo empaquetado, para publicar en un host estático si se necesita una copia adicional.
- `2_QR/QR_encuentro_por_ejes_github_pages.svg`: QR editable para el sitio principal. El PDF imprimible está en `output/pdf/QR_encuentro_por_ejes_github_pages.pdf`.
- `3_respaldo_votos/respaldo_apps_script.gs`: script de Google que recibe y guarda los votos en la planilla.
- `.github/workflows/deploy-github-pages.yml`: publicación automática de `1_sitio/` en GitHub Pages al actualizar `main`.
- `4_capturas/`: vistas previas de los casos (celular y escritorio) y del favicon.
- `5_respaldo_ux/antes_primera_tanda/`: HTML y ZIP originales, guardados antes de las mejoras UX.

## Cómo funciona el envío de votos
La página envía cada respuesta directamente a la app web de Google Apps Script indicada en `FORM_PRINCIPAL` dentro de `index.html`. Apps Script guarda cada voto en la planilla, en las hojas `donde-si` y `por-que-no`. Netlify Forms ya no recibe envíos.

Cada envío incluye un identificador único. Si se interrumpe la conexión y la persona reintenta, Apps Script conserva ese identificador durante seis horas para evitar filas duplicadas. Cada intento tiene un límite de 15 segundos. La limitación técnica de Apps Script es que el navegador no puede leer el acuse final de una solicitud entre dominios; la confirmación visible significa que el navegador entregó la solicitud al endpoint de Google.

En "Dónde sí", un envío aceptado limpia los campos y permite sumar otro caso. En "Por qué no", un envío aceptado mantiene las razones y la nota visibles y bloquea su edición. Un error de red conserva la respuesta y permite reintentar con el mismo identificador.

## Checklist antes de la charla
1. Confirmar que la app web de Apps Script sigue disponible para cualquier persona. La implementación activa es la versión 2.
2. Confirmar que GitHub Pages responde en `https://jmiguez78.github.io/encuentro-por-ejes/`.
3. Imprimir o compartir `output/pdf/QR_encuentro_por_ejes_github_pages.pdf`, escanearlo con datos móviles y mandar una respuesta de prueba. Confirmar que llegó a ambas hojas de la planilla y borrarla.
4. Tener `1_sitio/index.html` abierto en la notebook como último recurso (funciona sin internet, pero no guarda votos).

## Cómo publicar y actualizar la página
1. Crear un repositorio público en GitHub y subir esta carpeta completa.
2. En el repositorio, abrir **Settings > Pages** y seleccionar **GitHub Actions** como fuente de publicación.
3. Hacer push a `main`. El flujo incluido publica únicamente `1_sitio/` y GitHub informará la URL definitiva.
4. Para actualizar el sitio, editar `1_sitio/index.html`, regenerar `1_sitio/encuentro.zip` y hacer push a `main`.

GitHub Pages en el plan Free se publica desde repositorios públicos; no subir credenciales ni datos personales al repositorio. La URL por defecto es `https://USUARIO.github.io/REPOSITORIO/`.

## Primera tanda UX — 9/10/2026
- Cifras completas dentro de las tarjetas en celular y tamaños intermedios; las etapas del caso también se acomodan al ancho disponible.
- Validaciones persistentes, asociadas a los campos y con foco al corregir. El límite de dos razones también muestra un error persistente.
- Estados de envío, error, recepción sin confirmar y confirmación con resumen. Los controles se bloquean durante el envío para evitar cambios y envíos simultáneos.
- Se conservaron los cuatro momentos, los textos de contenido, los casos, las cifras, los recursos embebidos y los campos que ahora recibe Google Sheets.
- Verificación local: casos sin desbordes en anchos de 320 a 1440 px; formularios vacíos, límite de dos razones, envío confirmado, fallo HTTP, respuesta opaca y controles durante un envío lento. También se verificó la cancelación a los 15 segundos con respuestas simuladas, sin enviar votos reales.
- Capturas de esta tanda: `4_capturas/ux_casos_320.jpg`, `4_capturas/ux_error_envio_320.jpg` y `4_capturas/ux_confirmacion_escritorio.jpg`. Las capturas de formularios muestran pruebas locales con recepción simulada.

## Pendiente
- Incorporar la idea "la interoperabilidad son los rieles de una Ciudad inteligente" (propuesta: cierre del segmento 1 y pregunta del segmento 3).
- Confirmar con el área la fuente de datos de "Deudor moroso" e "Ingresos Brutos" y el estado (en producción o no) de los dos casos de consorcios y proveedores.
- Confirmar la publicación del Decreto 347/2026 en el Boletín Oficial antes de citarlo, y las cifras del Registro de Empleadores con Trabajo y Empleo.
