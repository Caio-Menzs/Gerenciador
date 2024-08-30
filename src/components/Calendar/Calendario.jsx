import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importação principal
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'; // Importação do addon
import eventosPadrao from '../Events/events.jsx';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {
    const [eventos, setEventos] = useState(eventosPadrao);
    const [eventoSelecionado, SeteventoSelecionado] = useState(null);
    const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);

    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    });

    const moverEventos = (data) => {
        const { start, end } = data;
        const updatedEvents = eventos.map((event) => {
            if (event.id === data.event.id) {
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end),
                };
            }
            return event;
        });
        setEventos(updatedEvents);
    };

    const handleEventClick = (evento) => {
        SeteventoSelecionado(evento);
    };

    const handleEventClose = () => {
        SeteventoSelecionado(null);
    };

    const handleEventDelete= (eventId) =>{
        // Lógica do banco (a ser implementada)
        const updatedEvents = eventos.filter((event) => event.id !== eventId)
        setEventos(updatedEvents);
        SeteventoSelecionado(null);
    };

    const handleEventUpdate = (updatedEvent) =>{
        // Lógica do banco (a ser implementada)
        const updatedEvents = eventos.map((event) =>{
            if(event.id === updatedEvent.id){
                return updatedEvent;
            }
            return event;
        });
        setEventos(updatedEvents);
        SeteventoSelecionado(null);
    }

    const handleSelecionarAtividades = (atividadesSelecionadas) =>{
        setEventosFiltrados(atividadesSelecionadas);
    }

    return (
        <div className='tela'>
            <div className='toolbar p-4' style={{maxHeight:'100vh', overflowY:'auto'}}>
                {}
            </div>

            <div className='calendario'>
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView='month'
                    events={eventosFiltrados}
                    localizer={localizer}
                    resizable
                    onEventDrop={moverEventos}
                    onEventResize={moverEventos}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyle}
                    style={{ height: '80vh' }} // Define uma altura para o calendário
                    className='calendar'
                />
            </div>
        </div>
    );
}

export default Calendario;
