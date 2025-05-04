import { promises as fs} from 'node:fs';
import { DATA_DIR } from './config.js';
import { Buffer } from 'node:buffer';


export async function ensureFile(file, defaultValue) {
    try {
        await fs.access(file);
    } catch (err) {
        console.log(`File ${file} not found, creating it...`);
        await fs.mkdir(DATA_DIR, { recursive: true } );
        await fs.writeFile(file, JSON.stringify(defaultValue, null, 2), 'utf-8');
    }
}


export const readJson = async (f) => {
    return JSON.parse(await fs.readFile(f, 'utf-8'));
}

export const writeJson = async (f, data) => {
    await fs.writeFile(f, JSON.stringify(data, null, 2), 'utf-8');
}


export function send(res, status, payload) {
    const body = JSON.stringify(payload);
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    });
    res.end(body);
}

export function parseBody(req) {
    return new Promise((resolve, reject) => {
        let buf = '';
        req.on('data', (chunk) => {
            buf += chunk.toString(); // Convert Buffer to string
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(buf);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    })
}