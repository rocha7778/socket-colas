const { io } = require('../server');
const TikectControl = require('../clasess/tikeck-control')

let tickectControl = new TikectControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', () => {

        let data = {
            tikect: tickectControl.siguienteTikect()
        }

        data = JSON.stringify(data);
        client.emit('siguienteTicket', data);

        console.log(data);



    });

    let data = {
        tikectActual: tickectControl.getTicketActual(),
        ultimos4Tickets: tickectControl.getUltimos4Tikects()

    }






    client.emit('ticketActual', data)


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {

            return callback({
                ok: false,
                message: 'El escritorio es necesario'

            })

        }

        let atenderTicket = tickectControl.atenderTikect(data.escritorio);



        let dataUltimos4Tickes = {
            tikectActual: tickectControl.getTicketActual(),
            ultimos4Tickets: tickectControl.getUltimos4Tikects()

        }

        client.emit('ticketActual', dataUltimos4Tickes)



        return callback(atenderTicket)


    })



});