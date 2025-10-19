import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

import Connection from './database/db.js';
import DefaultData from './default.js';
import Routes from './routes/route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Use express built-in/body-parser middleware before routes
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', Routes);

// Start server after DB connection is established
async function start() {
    try {
        // Only try to connect to DB if credentials are provided and not placeholders
        if (username && password && username !== 'your_mongodb_username' && password !== 'your_mongodb_password') {
            await Connection(username, password);
            // Only import default data in non-production to avoid accidental data wipes
            if (process.env.NODE_ENV !== 'production') {
                await DefaultData();
            }
        } else {
            console.log('MongoDB credentials not provided. Server will run without database connection.');
            console.log('To connect to database, update .env file with valid MongoDB credentials.');
        }

        app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        // Start server anyway without database
        app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT} (without database)`));
    }
}start();

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'kunaltyagi@gmail.com';
paytmParams['MOBILE_NO'] = '1234567852';
