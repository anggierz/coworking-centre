import { readJson, send } from "../utils.js";
import { ROOMS_FILE } from "../config.js";

export async function getRooms(res) {
    const rooms = await readJson(ROOMS_FILE);
    send(res, 200, rooms);
}