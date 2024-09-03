import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import api from '../../services/api'; 

const localizer = momentLocalizer(moment);

function Calendario() {
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await api.get("/api/Agendamento");
                console.log("Dados Recebidos:", response.data);
                const data = response.data.dados.map(agendamento => ({
                    id: agendamento.id, 
                    title: agendamento.title, 
                    start: new Date(agendamento.start),
                    end: new Date(agendamento.end),
                }));
                setEventos(data);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };

        fetchAgendamentos();
    }, []);

    const moverEventos = async ({ event, start, end }) => {
        const updatedEvents = eventos.map((evt) => {
            if (evt.id === event.id) {
                return {
                    ...evt,
                    start: new Date(start),
                    end: new Date(end),
                };
            }
            return evt;
        });

        setEventos(updatedEvents);

        try {
            await api.put(`/api/Agendamento/${event.id}`, {
                ...event,
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString(),
            });
        } catch (error) {
            console.error('Erro ao atualizar agendamento:', error);
        }
    };

    const handleEventClick = (evento) => {
        setEventoSelecionado(evento);
    };

    const handleEventClose = () => {
        setEventoSelecionado(null);
    };

    const handleEventDelete = async (eventId) => {
        const updatedEvents = eventos.filter((event) => event.id !== eventId);
        setEventos(updatedEvents);
        setEventoSelecionado(null);

        try {
            await api.delete(`/api/Agendamento/${eventId}`);
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
        }
    };

    return (
        <div className='calendario'>
            <Calendar
                localizer={localizer}
                events={eventos}
                defaultView="week"
                selectable
                popup
                style={{ height: 500 }}
                min={new Date(moment().set({ hour: 8, minute: 0 }))}
                max={new Date(moment().set({ hour: 18, minute: 0 }))}
                onEventDrop={moverEventos}
                onEventResize={moverEventos}
                onSelectEvent={handleEventClick}
            />
        </div>
    );
}

export default Calendario;
