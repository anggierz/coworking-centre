import http from 'http';
import { readFile, writeFile } from 'fs/promises'

const PORT = 3000;


//Helper functions

const readJsonFile = async (fileName) => {
    try {
        const route = './data/' + fileName;
        const data = await readFile(route, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file ${fileName}:`, err);
        throw err;
    }
};


const writeJsonFile = async (fileName, data) => {
    try {
        const route = './data/' + fileName;
        await writeFile(route, JSON.stringify(data));
    } catch (err) {
        console.error(`Error writing file ${fileName}:`, err);
        throw err;
    }
};


const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/rooms') {
        processGetRooms(res);
    }
    else if (req.method === 'GET' && req.url === '/reservations') {
        processGetReservations(res);
    }

    else if (req.method === 'POST' && req.url === '/reservations') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.log('POST recibido');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data', data: data}));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("JSON no válido");
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})


//Business Logic

function processGetRooms(res) {
    readJsonFile('rooms.json').then(data => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }).catch(err => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading rooms data');
    }).finally(() => {
        console.log('GET /rooms request processed');
    });
}

function processGetReservations(res) {
    readJsonFile('reservatio23ns.json').then(data => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }).catch(err => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading rooms data');
    }).finally(() => {
        console.log('GET /reservations request processed');
    });
}