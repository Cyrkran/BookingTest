import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Appointment {
    id: string;
    location: string;
    beginningDate: Date;
    endingDate: Date;
    price: number;
    address: string;
}

interface Location {
    id: string;
    location: string;
    type: string;
    price: number;
}

let locations: Location[] = JSON.parse(fs.readFileSync(path.join(__dirname, 'locations.json'), 'utf-8'));
let appointments: Array<Appointment> = [];

const app = express();
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Appointment API',
            version: '1.0.0',
            description: 'A simple Express Appointment API',
        },
    },
    apis: ['./app.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/**
 * @openapi
 * /locations:
 *   get:
 *     summary: Retrieve all locations
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   location:
 *                     type: string
 *                   type:
 *                     type: string
 *                   price:
 *                     type: number
 */
app.get('/locations', (req: Request, res: Response) => {
    res.json(locations);
});

/**
 * @openapi
 * /locations/{id}:
 *   get:
 *     summary: Retrieve a location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     responses:
 *       200:
 *         description: A location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 location:
 *                   type: string
 *                 type:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: The location was not found
 */
app.get('/locations/:id', (req: Request, res: Response) => {
    const location = locations.find(l => l.id === req.params.id);
    if (location) {
        res.json(location);
    } else {
        res.status(404).json({ message: "Location not found." });
    }
});


/**
 * @openapi
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               location:
 *                 type: string
 *               beginningDate:
 *                 type: string
 *                 format: date-time
 *               endingDate:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: The appointment was created successfully
 *       400:
 *         description: There is an overlap with an existing appointment
 */
app.post('/appointments', (req: Request, res: Response) => {
    const { id, location, beginningDate, endingDate, price, address } = req.body;
    // Check for overlapping appointments
    for (let appointment of appointments) {
        if (appointment.id === id && 
            ((appointment.beginningDate <= beginningDate && appointment.endingDate >= beginningDate) ||
            (appointment.beginningDate <= endingDate && appointment.endingDate >= endingDate))) {
            return res.status(400).json({ message: "Cannot create appointment. There is an overlap with an existing appointment." });
        }
    }

    // Create new appointment
    appointments.push({ id, location, beginningDate, endingDate, price, address });
    fs.writeFileSync(path.join(__dirname, 'appointments.json'), JSON.stringify(appointments));
    res.status(201).json({ message: "Appointment created successfully." });
});

/**
 * @openapi
 * /appointments/{id}:
 *   get:
 *     summary: Retrieve an appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: The appointment was retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 location:
 *                   type: string
 *                 beginningDate:
 *                   type: string
 *                   format: date-time
 *                 endingDate:
 *                   type: string
 *                   format: date-time
 *                 price:
 *                   type: number
 *                 address:
 *                   type: string
 *       404:
 *         description: The appointment was not found
 */
app.get('/appointments/:id', (req: Request, res: Response) => {
    const appointment = appointments.find(a => a.id === req.params.id);
    if (appointment) {
        res.json(appointment);
    } else {
        res.status(404).json({ message: "Appointment not found." });
    }
});

/**
 * @openapi
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               location:
 *                 type: string
 *               beginningDate:
 *                 type: string
 *                 format: date-time
 *               endingDate:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: The appointment was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 location:
 *                   type: string
 *                 beginningDate:
 *                   type: string
 *                   format: date-time
 *                 endingDate:
 *                   type: string
 *                   format: date-time
 *                 price:
 *                   type: number
 *                 address:
 *                   type: string
 *       404:
 *         description: The appointment was not found
 */
app.put('/appointments/:id', (req: Request, res: Response) => {
    const { id, location, beginningDate, endingDate, price, address } = req.body;
    let index = appointments.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
        appointments[index] = { id, location, beginningDate, endingDate, price, address };
        fs.writeFileSync(path.join(__dirname, 'appointments.json'), JSON.stringify(appointments));
        res.json({ message: "Appointment updated successfully." });
    } else {
        res.status(404).json({ message: "Appointment not found." });
    }
});

/**
 * @openapi
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: The appointment was deleted successfully
 *       404:
 *         description: The appointment was not found
 */
app.delete('/appointments/:id', (req: Request, res: Response) => {
    let index = appointments.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
        appointments.splice(index, 1);
        fs.writeFileSync(path.join(__dirname, 'appointments.json'), JSON.stringify(appointments));
        res.json({ message: "Appointment deleted successfully." });
    } else {
        res.status(404).json({ message: "Appointment not found." });
    }
});

/**
 * @openapi
 * /appointments/location/{locationId}:
 *   get:
 *     summary: Retrieve all appointments for a given location ID
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     responses:
 *       200:
 *         description: A list of appointments for the given location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   location:
 *                     type: string
 *                   beginningDate:
 *                     type: string
 *                     format: date-time
 *                   endingDate:
 *                     type: string
 *                     format: date-time
 *                   price:
 *                     type: number
 *                   address:
 *                     type: string
 *       404:
 *         description: No appointments found for the given location ID
 */
app.get('/appointments/location/:locationId', (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    const appointmentsForLocation = appointments.filter(a => a.location === locationId);
    if (appointmentsForLocation.length > 0) {
        res.json(appointmentsForLocation);
    } else {
        res.status(404).json({ message: "No appointments found for the given location ID." });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
