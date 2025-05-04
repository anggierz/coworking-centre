import { readJson, send } from "../utils.js";
import { RESERVATIONS_FILE } from "../config.js";

export async function getReservations(res) {
    console.log('1');
    const fields = await readJson(RESERVATIONS_FILE);
    send(res, 200, fields);
}