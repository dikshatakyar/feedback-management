import { createApp } from './app.js';
import { openDatabase } from './db/database.js';

const port = Number(process.env.PORT ?? 3001);
const app = createApp(openDatabase(process.env.DB_PATH ?? 'pulse.db'));

app.listen(port, () => console.log(`Pulse API listening on :${port}`));
