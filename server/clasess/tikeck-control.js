const fs = require('fs')


class Tikect {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TikeckControl {

    constructor() {
        this.ultimo = 0;
        this.tikects = [];
        this.ultimos4tickets = [];
        this.hoy = new Date().getDate();
        let data = require('../data/data.json')

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo
            this.tikects = data.tikects
            this.ultimos4tickets = data.ultimos4tickets;

        } else {
            // es otro dia de trabajo y toca actualizar la data del server
            this.reiniciarConteo()
        }
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tikects = [];
        this.ultimos4tickets = [];
        this.grabarData();
    }


    getTicketActual() {
        return this.ultimo;
    }

    getUltimos4Tikects() {
        return this.ultimos4tickets;
    }

    siguienteTikect() {
        this.ultimo = this.ultimo + 1;

        let tikect = new Tikect(this.ultimo, null);
        this.tikects.push(tikect)

        this.grabarData();

        return this.ultimo;
    }




    grabarData() {

        let jsonData = {
            hoy: this.hoy,
            ultimo: this.ultimo,
            tikects: this.tikects,
            ultimos4tickets: this.ultimos4tickets
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }


    atenderTikect(escritorio) {

        if (this.tikects.length === 0) {
            return 'No  hay tickest'
        }


        let numero = this.tikects[0].numero;
        this.tikects.shift()
        let tikectAtender = new Tikect(numero, escritorio)

        this.ultimos4tickets.unshift(tikectAtender);

        if (this.ultimos4tickets.length > 4) {
            this.ultimos4tickets.splice(-1, 1); // borra el ultimo elemento de la lista

        }


        this.grabarData();

        return tikectAtender;


    }



}


module.exports = TikeckControl;