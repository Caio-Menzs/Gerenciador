import moment from 'moment';

const events = [
   
    {
      title: "Evento 1",
      start: moment().set({ hour: 9, minute: 0 }).toDate(),
      end: moment().set({ hour: 10, minute: 0 }).toDate(),
    },
    {
      title: "Evento 2",
      start: moment().set({ hour: 10, minute: 0 }).toDate(),
      end: moment().set({ hour: 11, minute: 0 }).toDate(),
    },
    {
      title: "Evento 3",
      start: moment().set({ hour: 11, minute: 30 }).toDate(),
      end: moment().set({ hour: 12, minute: 30 }).toDate(),
    },
    {
      title: "Evento 4",
      start: moment().set({ hour: 15, minute: 0 }).toDate(),
      end: moment().set({ hour: 16, minute: 0 }).toDate(),
    },
    {
      title: "Evento 5",
      start: moment().set({ hour: 16, minute: 0 }).toDate(),
      end: moment().set({ hour: 17, minute: 0 }).toDate(),
    },
   
  ];

export default events;
