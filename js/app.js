if('serviceWorker' in navigator) {

    //REGISTRAR SERVICE WORKER
    navigator.serviceWorker.register('./sw.js')
        .then( registrado => console.log('se instalo correctamente', registrado) )
        .catch( error => console.log('fallo la instalacion', error) );

} else {
    console.log('Service workers No Soportados');
}