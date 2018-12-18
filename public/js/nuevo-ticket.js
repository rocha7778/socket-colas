var socket = io();

let labelTicket = $("#lblNuevoTicket");

socket.on('connect', () => {
    console.log('Conectado al servidor');
})


socket.on('disconnect', () => {
    console.log('Desconectado del server');
})

socket.on('siguienteTicket', (data) => {
    labelTicket.text(data)

})


socket.on('ticketActual', (data) => {
    labelTicket.text(data.tikectActual)

})

$('button').on('click', function() {

    socket.emit('siguienteTicket', () => {})


})