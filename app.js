import http from 'http';
import { PORT, RESERVATIONS_FILE, ROOMS_FILE } from './src/config.js';
import { router } from './src/router.js';
import { ensureFile } from './src/utils.js';


(async () => {
    await ensureFile(ROOMS_FILE, [
        { "id": "S-1", "name": "Sala Alfa", "capacity": 4 },
        { "id": "S-2", "name": "Sala Beta", "capacity": 6 },
        { "id": "S-3", "name": "Sala Gamma", "capacity": 8 },
        { "id": "S-4", "name": "Sala Delta", "capacity": 10 }
      ]);

    await ensureFile(RESERVATIONS_FILE, []);
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
})();

