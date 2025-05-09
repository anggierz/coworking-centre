# 🏢 Coworking Centre
Coworking Centre es una API REST sencilla desarrollada con Node.js y el módulo HTTP, diseñada para gestionar reservas y salas en un espacio de coworking. Esta aplicación es la resolución a la actividad Fundamentos del Desarrollo Backend con Node.js de la asignatura DESARROLLO AVANZADO DE BACKEND Y APIS del máster universitario de Desarrollo Web de la UEM.

# 🚀 Características

Gestión de salas (rooms) con atributos: id, name, capacity.

Gestión de reservas (reservations) con atributos: id, roomId, date, hour, userName, roomReservedFor.

# 📬 Endpoints

### GET /rooms
 Lista todas las salas del centro.

### GET /reservations
 Lista todas las reservas activas.

### POST /reservations 
Crea una nueva reserva. Ejemplo de cuerpo de la solicitud:

{
  "roomId": "S-1",
  "date": "2025-05-09",
  "hour": "10",
  "userName": "Juan",
  "roomReservedFor" 4
}

Antes de crear la reserva, se procederá a comprobar que la solicitud contiene los datos necesarios y que estos son válidos para realizar la reserva.

Validaciones:

- Que la fecha de reserva de la sala no sea a pasado.
- Que la sala no esté ocupada en la fecha y hora de la reserva.
- Que el número de personas para la reserva no supere la capacidad de la sala.

### DELETE /reservations/delete/:id
Elimina una reserva específica por su ID.

# 📁 Estructura del Proyecto

```sh
coworking-centre/
├── data/
│   ├── rooms.json
│   └── reservations.json
├── src/
│   ├── config.js
│   ├── router.js
│   ├── utils.js
│   ├── validations.js
│   └── handlers/
│       ├── rooms.js
│       └── reservations.js
├── app.js
├── package.json
└── README.md
```

# 🛠️ Instalación
Clona el repositorio:

```bash
git clone https://github.com/anggierz/coworking-centre.git
cd coworking-centre
```

Inicia el servidor:

```bash
node app.js
```
El servidor estará escuchando en http://localhost:3000.