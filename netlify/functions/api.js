import serverless from 'serverless-http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import donationRoutes from '../../server/routes/donations.js';
import authRoutes from '../../server/routes/auth.js';

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

// Routes - Mount at /api since the redirect will pass the full path
// Or if using /api/* -> /.netlify/functions/api/*, the path seen by express might be /api/donations or /donations
// To be safe, we can mount on a router that handles both or check the path.
// Usually serverless-http with the redirect /.netlify/functions/api/:splat strips the function name but keeps the splat.
// So /api/donations -> /.netlify/functions/api/donations. 
// The event.path will be /.netlify/functions/api/donations.
// serverless-http usually strips the /.netlify/functions/api prefix if configured, or we can just mount at /api/donations.

// Let's try mounting at /api to be safe, or use a router.
const router = express.Router();
router.use('/donations', donationRoutes);
router.use('/auth', authRoutes);

// Mount the router at /api so it matches /api/donations
app.use('/api', router);

// Also mount at root just in case the rewrite strips /api
app.use('/', router);


export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await connectToDatabase();

    const serverlessHandler = serverless(app);
    return serverlessHandler(event, context);
};
