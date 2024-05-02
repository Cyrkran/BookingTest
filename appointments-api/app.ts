import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Booking {
    id: string;
    locationId: string;
    startDate: Date;
    endDate: Date;
    price: number;
}

interface Location {
    id: string;
    location: string;
    type: string;
    price: number;
    image: string;
}

let locations: Location[] = JSON.parse(fs.readFileSync(path.join(__dirname, 'locations.json'), 'utf-8'));
let bookings: Array<Booking> = [];

const app = express();
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
  }
  
app.use(cors(corsOptions));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Booking API',
            version: '1.0.0',
            description: 'A simple Express Booking API',
        },
    },
    apis: ['./app.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

const generateRandomId = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
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
 *                   image:
 *                      type: string
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
 *                 image:
 *                    type: string
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
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: The booking was created successfully
 *       400:
 *         description: There is an overlap with an existing booking
 */
app.post('/bookings', (req: Request, res: Response) => {
    const { locationId, startDate, endDate, price } = req.body;
    // Check for overlapping bookings
    for (let booking of bookings) {
        if (((booking.startDate <= startDate && booking.endDate >= startDate) ||
            (booking.startDate <= endDate && booking.endDate >= endDate)) && (booking.locationId == locationId)) {
            return res.status(400).json({ message: "Cannot create booking. There is an overlap with an existing booking." });
        }
    }

    // Create new booking
    bookings.push({ id: generateRandomId(), locationId, startDate, endDate, price });
    fs.writeFileSync(path.join(__dirname, 'bookings.json'), JSON.stringify(bookings));
    res.status(201).json({ message: "Booking created successfully." });
});

/**
 * @openapi
 * /bookings/{id}:
 *   get:
 *     summary: Retrieve an booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: The booking was retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 location:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 price:
 *                   type: number
 *                 address:
 *                   type: string
 *       404:
 *         description: The booking was not found
 */
app.get('/bookings/:id', (req: Request, res: Response) => {
    const booking = bookings.find(a => a.id === req.params.id);
    if (booking) {
        res.json(booking);
    } else {
        res.status(404).json({ message: "Booking not found." });
    }
});

/**
 * @openapi
 * /bookings/{id}:
 *   put:
 *     summary: Update an booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: The booking was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 location:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 price:
 *                   type: number
 *       404:
 *         description: The booking was not found
 */
app.put('/bookings/:id', (req: Request, res: Response) => {
    const { id, locationId, startDate, endDate, price, address } = req.body;
    let index = bookings.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
        bookings[index] = { id, locationId, startDate, endDate, price };
        fs.writeFileSync(path.join(__dirname, 'bookings.json'), JSON.stringify(bookings));
        res.json({ message: "Booking updated successfully." });
    } else {
        res.status(404).json({ message: "Booking not found." });
    }
});

/**
 * @openapi
 * /bookings/{id}:
 *   delete:
 *     summary: Delete an booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: The booking was deleted successfully
 *       404:
 *         description: The booking was not found
 */
app.delete('/bookings/:id', (req: Request, res: Response) => {
    let index = bookings.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
        bookings.splice(index, 1);
        fs.writeFileSync(path.join(__dirname, 'bookings.json'), JSON.stringify(bookings));
        res.json({ message: "Booking deleted successfully." });
    } else {
        res.status(404).json({ message: "Booking not found." });
    }
});

/**
 * @openapi
 * /bookings/location/{locationId}:
 *   get:
 *     summary: Retrieve all bookings for a given location ID
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     responses:
 *       200:
 *         description: A list of bookings for the given location ID
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
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                   price:
 *                     type: number
 *       404:
 *         description: No bookings found for the given location ID
 */
app.get('/bookings/location/:locationId', (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    const bookingsForLocation = bookings.filter(a => a.locationId === locationId);
    if (bookingsForLocation.length > 0) {
        res.json(bookingsForLocation);
    } else {
        res.status(404).json({ message: "No bookings found for the given location ID." });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
