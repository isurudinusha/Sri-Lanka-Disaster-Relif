import serverless from 'serverless-http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as donationRoutes } from '../../server/routes/donations.js';
import { router as authRoutes } from '../../server/routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);
    cachedDb = connection;
    return connection;
}

const router = express.Router();

router.use('/donations', donationRoutes);
router.use('/auth', authRoutes);

// Mount the router at /api so it matches /api/donations
app.use('/api', router);

// Also mount at root just in case the rewrite strips /api
app.use('/', router);


const httpHandler = serverless(app);

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await connectToDatabase();

    return httpHandler(event, context);
};
