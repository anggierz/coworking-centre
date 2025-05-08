import url from 'node:url';
import { send } from './utils.js';
import { getRooms } from './handlers/rooms.js';
import { getReservations, postReservation, deleteReservation } from './handlers/rerservations.js';

export async function router(req, res) {

    const pathname = url.parse(req.url);

    if (req.method === 'GET' && pathname.pathname === '/rooms') {
        return getRooms(res);
    }
    else if (req.method === 'GET' && pathname.pathname === '/reservations') {
        return getReservations(res);
    }
    else if (req.method === 'POST' && pathname.pathname === '/reservations') {
        return postReservation(req, res);
    }
    else if (req.method === 'DELETE' && pathname.pathname.startsWith('/reservations/delete/')) {
        //Se extrae el último elemento de la ruta, que es el id de la reserva a eliminar
        const id = pathname.pathname.split('/').pop();
        return deleteReservation(id, res);
    }

    send(res, 404, { error: "Endpoint not found"});

}