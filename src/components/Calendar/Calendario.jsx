import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Input, DatePicker, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'; 
import api from '../../services/api';
import OrderForm from '../../pages/Orders/ordersForm';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);
const { TextArea } = Input;

function Calendario() {
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState({});
    const [isOrderFormVisible, setIsOrderFormVisible] = useState(false); 

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await api.get("/api/Agendamento");
                const data = response.data.dados.map(agendamento => ({
                    id: agendamento.id,
                    title: agendamento.title || '',
                    start: moment.utc(agendamento.start).toDate(),
                    end: moment.utc(agendamento.end).toDate(),
                    description: agendamento.description || '',
                    OrdemGerada: agendamento.OrdemGerada || false,
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
                start: moment(start).utc().toISOString(),
                end: moment(end).utc().toISOString(),
            });
        } catch (error) {
            console.error('Erro ao atualizar agendamento:', error.response ? error.response.data : error.message);
        }
    };

    const handleEventClick = (evento) => {
        setEventoSelecionado(evento);
        setEditedEvent(evento);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setIsEditing(false);
        setEventoSelecionado(null);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const updatedEvent = {
                ...editedEvent,
                start: new Date(editedEvent.start),
                end: new Date(editedEvent.end),
            };

            await api.put(`/api/Agendamento/${updatedEvent.id}`, {
                ...updatedEvent,
                start: moment(updatedEvent.start).utc().toISOString(),
                end: moment(updatedEvent.end).utc().toISOString(),
            });

            setEventos(eventos.map(evt => (evt.id === updatedEvent.id ? updatedEvent : evt)));
            setIsEditing(false);
            setIsModalVisible(false);
            setEventoSelecionado(null);
        } catch (error) {
            console.error('Erro ao salvar alterações:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/Agendamento/${eventoSelecionado.id}`);
            setEventos(eventos.filter(evt => evt.id !== eventoSelecionado.id));
            setIsModalVisible(false);
            setEventoSelecionado(null);
        } catch (error) {
            console.error('Erro ao deletar agendamento:', error.response ? error.response.data : error.message);
        }
    };

    const handleInputChange = (field, value) => {
        setEditedEvent({ ...editedEvent, [field]: value });
    };

    const handleOrderSaved = async () => {
        try {
            await api.put(`/api/Agendamento/${eventoSelecionado.id}`, {
                ...eventoSelecionado,
                OrdemGerada: true // Atualiza o campo OrdemGerada
            });
            // Recarregue os eventos do servidor
            const response = await api.get("/api/Agendamento");
            const data = response.data.dados.map(agendamento => ({
                id: agendamento.id,
                title: agendamento.title || '',
                start: moment.utc(agendamento.start).toDate(),
                end: moment.utc(agendamento.end).toDate(),
                description: agendamento.description || '',
                OrdemGerada: agendamento.OrdemGerada || false,
            }));
            setEventos(data);
            setIsOrderFormVisible(false);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Erro ao atualizar coluna OrdemGerada:', error.response ? error.response.data : error.message);
            message.error('Erro ao atualizar ordem de serviço.');
        }
    };

    return (
        <div className='calendario'>
            <DragAndDropCalendar
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

            {/* Modal de detalhes do agendamento */}
            {eventoSelecionado && (
                <Modal
                    title={isEditing ? "Editar Agendamento" : "Detalhes do Agendamento"}
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={[
                        isEditing ? (
                            <Button key="save" type="primary" onClick={handleSaveEdit}>
                                Salvar
                            </Button>
                        ) : (
                            <Button key="edit" type="primary" onClick={handleEditClick}>
                                Editar
                            </Button>
                        ),
                        <Popconfirm
                            title="Tem certeza que deseja deletar este agendamento?"
                            onConfirm={handleDelete}
                            okText="Sim"
                            cancelText="Não"
                        >
                            <Button 
                                key="delete" 
                                type="primary" 
                                danger 
                                icon={<DeleteOutlined />}
                            >
                                Deletar
                            </Button>
                        </Popconfirm>,
                        // Condicional para mostrar o botão "Gerar Ordem de Serviço"
                        (!eventoSelecionado.OrdemGerada && (
                            <Button 
                                key="generate-order" 
                                style={{ backgroundColor: '#FFA500', borderColor: '#FFA500' }} // Estilo laranja
                                onClick={() => setIsOrderFormVisible(true)}
                            >
                                Gerar Ordem de Serviço
                            </Button>
                        )),
                        <Button key="close" onClick={handleModalClose}>
                            Fechar
                        </Button>,
                    ]}
                >
                    {isEditing ? (
                        <>
                            <Input
                                placeholder="Título"
                                value={editedEvent.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                            <DatePicker
                                showTime
                                format="DD/MM/YYYY HH:mm"
                                placeholder="Início"
                                value={moment(editedEvent.start)}
                                onChange={(date) => handleInputChange('start', date)}
                                style={{ marginTop: 10, width: '100%' }}
                            />
                            <DatePicker
                                showTime
                                format="DD/MM/YYYY HH:mm"
                                placeholder="Fim"
                                value={moment(editedEvent.end)}
                                onChange={(date) => handleInputChange('end', date)}
                                style={{ marginTop: 10, width: '100%' }}
                            />
                            <TextArea
                                placeholder="Descrição"
                                value={editedEvent.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                style={{ marginTop: 10 }}
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>Título:</strong> {eventoSelecionado.title}</p>
                            <p><strong>Início:</strong> {moment(eventoSelecionado.start).format('DD/MM/YYYY HH:mm')}</p>
                            <p><strong>Fim:</strong> {moment(eventoSelecionado.end).format('DD/MM/YYYY HH:mm')}</p>
                            <p><strong>Descrição:</strong> {eventoSelecionado.description}</p>
                        </>
                    )}
                </Modal>
            )}

            {/* Modal OrderForm */}
            {isOrderFormVisible && (
                <Modal
                    title="Nova Ordem de Serviço"
                    visible={isOrderFormVisible}
                    onCancel={() => setIsOrderFormVisible(false)}
                    footer={null} 
                    width={800}
                >
                    <OrderForm onClose={() => setIsOrderFormVisible(false)} onOrderSaved={handleOrderSaved} />
                </Modal>
            )}
        </div>
    );
}

export default Calendario;
