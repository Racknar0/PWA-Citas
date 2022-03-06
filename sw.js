//Archivos en cache
const nombreCache = 'apv-v6';
const archivos = [
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


// Cuando se instala el serviceWorker
self.addEventListener('install', e => {
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

//Activar el serviceWorker
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
    
})

// Evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch....', e);

    e.respondWith(

        //! leer cache
        caches.match(e.request)
        .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('error.html')))
    )
})