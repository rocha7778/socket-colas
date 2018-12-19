var socket = io();

var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicket3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')


var escritorio1 = $('#lblEscritorio1')
var escritorio2 = $('#lblEscritorio2')
var escritorio3 = $('#lblEscritorio3')
var escritorio4 = $('#lblEscritorio4')



var tickests = [lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
]

var escritorios = [escritorio1,
    escritorio2,
    escritorio3,
    escritorio4
]






socket.on('ticketActual', function(data) {

    actualizarTableroDeTickets(data.ultimos4Tickets)

})


function actualizarTableroDeTickets(ultimos4Tickets) {


    var totalTikes = ultimos4Tickets.length - 1

    for (var i = 0; i <= totalTikes; i++) {

        tickests[i].text('Ticket ' + ultimos4Tickets[i].numero);
        escritorios[i].text('Escritorio ' + ultimos4Tickets[i].escritorio)



    }


}