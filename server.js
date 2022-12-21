// imports
const { app } = require('./app');
const { initModels } = require('./models/initModels');

// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// utils
const { db } = require('./utils/db.util');

const startServer = async () => {
    try {
        await db.authenticate();

        // establish relations models
        initModels();

        await db.sync();

        const PORT = process.env.PORT || 4000;

        app.listen(PORT, () => {
            console.log(`your server is running in port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

startServer();