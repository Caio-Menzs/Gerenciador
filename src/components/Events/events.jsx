import moment from 'moment';

const eventosPadrao = [
    {
        id: 1,
        title: 'Reunião com Cliente X',
        start: moment().add(1, 'days').toDate(),
        end: moment().add(1, 'days').add(1, 'hour').toDate(),
        color: '#f56b00',
    },
    {
        id: 2,
        title: 'Manutenção de Veículo',
        start: moment().add(3, 'days').toDate(),
        end: moment().add(3, 'days').add(2, 'hours').toDate(),
        color: '#7265e6',
    },
    {
        id: 3,
        title: 'Entrega de Relatório',
        start: moment().add(5, 'days').toDate(),
        end: moment().add(5, 'days').add(1, 'hour').toDate(),
        color: '#ff4d4f',
    },
    {
        id: 4,
        title: 'Revisão Anual',
        start: moment().add(7, 'days').toDate(),
        end: moment().add(7, 'days').add(3, 'hours').toDate(),
        color: '#00a854',
    },
];

export default eventosPadrao;
