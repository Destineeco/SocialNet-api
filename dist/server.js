import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';
await db();
const PORT = process.env.PORT || 3001;
const app = express();
// Middleware to parse incoming request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use routes for handling requests
app.use(routes);
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
