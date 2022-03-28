//Archivos en cache

const CACHE_EMENTS = [
    './',
    './index.html',
    './error.html',
    './css/bootstrap.css',
    './css/styles.css',
    './js/app.js',
    './js/apv.js',
     './manifest.json', 
     './img/icons'
];

const CACHE_NAME = 'apv-v7';
// Cuando se instala el serviceWorker
/* self.addEventListener('install', e => {
    console.log('Instalado el serviceWorker');

    //!creando cache
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('cacheando');
                cache.addAll(archivos);
            })
            .catch ( () => catches.match('error.html') )
    )
});

 */
/************** ( 'INSTALAR SERVICE WORKER' ) **************/

self.addEventListener('install', (e) => {

    console.log('Instalado el serviceWorker');
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache
                .addAll(CACHE_EMENTS)
                .then(() => {
                    self.skipWaiting();
                })
                .catch(console.log);
        })
    );
});

/* //Activar el serviceWorker
self.addEventListener('activate', e => {
    console.log('Service Worker Activado');

    //!borrar cache
    e.waitUntil(
        caches.keys()
        .then( keys  => {
            return Promise.all(
                keys.filter( key => key !== nombreCache )
                    .map( key => caches.delete(key) ) //! borras las versiones anteriores
            )
        })
    )
    
}) */


/************** ( 'BORRAR CACHE Y ACTIVAR SERVICE WORKER' ) **************/

self.addEventListener('activate', (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        return (
                            cacheWhitelist.indexOf(cacheName) === -1 &&
                            caches.delete(cacheName)
                        );
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});


/* 
// Evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch....', e);

    e.respondWith(

        //! leer cache
        caches.match(e.request)
        .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('error.html')))
    )
}) */

/************** ( 'FETCH SERVICE WORKER para descargar archivos estaticos' ) **************/

self.addEventListener('fetch', (e) => {
    console.log(e.request);
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                return res;
            }
            return fetch(e.request);
        })
    )
});
