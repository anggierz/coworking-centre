import http from 'http';
import { PORT, DATA_DIR, RESERVATIONS_FILE, ROOMS_FILE } from './src/config.js';
import { router } from './src/router.js';



http.createServer(async(req, res) => {
    try {
        await router(req, res);
    } catch (err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({error: "Error interno"}));
    }
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
