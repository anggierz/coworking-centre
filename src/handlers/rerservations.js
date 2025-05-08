import { readJson, send, parseBody, writeJson } from "../utils.js";
import { isPastDate, sameSlot } from "../validations.js";
import { RESERVATIONS_FILE, ROOMS_FILE } from "../config.js";
import { randomUUID } from "node:crypto";

export async function getReservations(res) {
    const fields = await readJson(RESERVATIONS_FILE);
    send(res, 200, fields);
}


export async function postReservation(req, res) {
    const body = await parseBody(req);
    const { roomId, date, hour, userName } = body;

    if (!roomId || !date || !hour || !userName) {
        return send(res, 400, { error: "Missing required fields" });
    }

    if (isPastDate(date, hour))
        return send(res, 400, { error: "Date and hour must be in the future" });


    const [rooms, reservations] = await Promise.all([
        readJson(ROOMS_FILE),
        readJson(RESERVATIONS_FILE)
    ]);

    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        return send(res, 400, { error: "Room not found" });
    }

    if (reservations.some(r => sameSlot(r, body))) {
        return send(res, 400, { error: "A reservation exists for the requested time slot." });
    }

    const reservation = {
        id: randomUUID(),
        roomId,
        date,
        hour,
        userName
    }

    reservations.push(reservation);
    await writeJson(RESERVATIONS_FILE, reservations);
    send(res, 201, reservation);
}

export async function deleteReservation(id, res) {
    
    if (!id) {
        return send(res, 400, { error: "Missing reservation ID to delete" });
    }
    const reservations = await readJson(RESERVATIONS_FILE);
    const reservationIndex = reservations.findIndex(r => r.id === id);

    if (reservationIndex == -1) {
        return send(res, 404, { error: "Reservation not found" });
    }

    reservations.splice(reservationIndex, 1);
    await writeJson(RESERVATIONS_FILE, reservations);
    send(res, 204);
}