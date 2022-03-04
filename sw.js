

// Cuando se instala el serviceWorker
self.addEventListener('install', e => {
    console.log('Instalado el serviceWorker');

    console.log(e);
})

//Activar el serviceWorker
self.addEventListener('activate', e => {
    console.log('Service Worker Activado');

    console.log(e);
})