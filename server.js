// imports
const { app } = require('./app');
const { initModels } = require('./models/initModels');

// utils
const { db } = require('./utils/db.util');

const startServer = async () => {
    try {
        await db.authenticate();

        // establish relations models
        initModels();

        await db.sync();

        app.listen(4000, () => {
			console.log('Express app running!', 4000);
		});
    } catch (err) {
        console.log(err);
    }
}

startServer();