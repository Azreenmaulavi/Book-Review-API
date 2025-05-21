require('dotenv').config();
const connectDB = require('./app/config/db');
const logger = require('./app/utils/logger');
const app = require('./app'); // use the proper app setup from app.js

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
