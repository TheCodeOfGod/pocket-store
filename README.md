# Documentacion del proceso de desarrollo del proyecto

## Creacion de primeros archivos del proyecto
![alt text](<capturas/creacion de archivos.png>)

## Busqueda de una API en JSONPlaceholder
Se utilizara la API de /users
![alt text](capturas/JSONPlaceholder_API.png)

Reponse de la API
![alt text](capturas/JSONPlaceholder_request.png)

## Configuracion del manifest.json
Se creó manifest.json con el nombre, nombre corto, start_url, modo standalone, colores corporativos (#4f46e5) y dos iconos (192x192 y 512x512) para permitir instalar la aplicación.
![alt text](capturas/manifest_configuracion.png)

## App Shell
Se diseñó la estructura estática (barra superior, contenedor principal y pie de página) en index.html y styles.css. Esta "Vista" carga al instante mientras el contenido dinámico llega después desde la API.

index.html:
![alt text](capturas/creacionIndexHTML.png)

styles.css:
![alt text](capturas/stylesCSS.png)

## Creacion del Service Worker y Caché
En sw.js se programó el ciclo de vida del Service Worker. En install se guarda el App Shell en caché, en activate se borran las cachés antiguas y en fetch se usa Network First para la API (datos actualizados, o la caché si no hay red) y Cache First para los archivos estáticos.
![alt text](capturas/serviceWorker.png)

## Contenido dinámico
 En app.js se registra el Service Worker y se consume la API https://jsonplaceholder.typicode.com/users con fetch(). Los usuarios se muestran como tarjetas dentro del App Shell, junto a un indicador de conexión Online/Offline.
![alt text](capturas/image.png)

 ## Probamos el proyecto
 Levantamos el servicio para cargar la aplicacion:
![alt text](capturas/image-1.png)

### Resultado en el navegador con conexion:
 ![alt text](capturas/navegadorConexion.png)

### Resuktado del navegador al estar offline
 ![alt text](capturas/navegadorOffline.png)


