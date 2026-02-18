import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const api = {
    getTickets: () => axios.get(`${API_URL}tickets/`),
    createTicket: (ticketData) => axios.post(`${API_URL}tickets/`, ticketData),
    classify: (description) => axios.post(`${API_URL}tickets/classify/`, { description }),
    
    // Updates a ticket (used for closing)
    updateTicket: (id, data) => axios.patch(`${API_URL}tickets/${id}/`, data),
    
    // Deletes a ticket
    deleteTicket: (id) => axios.delete(`${API_URL}tickets/${id}/`),
};