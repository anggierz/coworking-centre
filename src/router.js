import url from 'node:url';
import { send } from './utils.js';
import { getRooms } from './handlers/rooms.js';
import { getReservations } from './handlers/rerservations.js';

export async function router(req, res) {

    const pathname = url.parse(req.url);

    if (req.method === 'GET' && pathname.pathname === '/rooms') {
        return getRooms(res);
    }
    else if (req.method === 'GET' && pathname.pathname === '/reservations') {
        return getReservations(res);
    }

    send(res, 404, { error: "Endpoint not found"});

}