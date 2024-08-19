
//referencias del html
const lblOnline = document.querySelector('#lblOnline')
const lblOffline =  document.querySelector('#lblOffline')
const txtMensaje =  document.querySelector('#txtMensaje')
const btnEnviar =  document.querySelector('#btnEnviar')

//socket
const socket = io();

//cuando se conecte
socket.on('connect', () => {

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

//cuando se desconecte
socket.on('disconnect', () => {

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

//escuchamos cuando el servidor emita el enviar-mensaje
socket.on('enviar-mensaje', (payload) => {
    console.log(payload)

})

//evento de boton enviar, se extrae el valor del texto, se crea un objeto y se
btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    //emites el enviar mensaje al servidor
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id )
    });

});

