import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3000;

// Allow starting without DB while you are still learning Docker/DB.
// If you set USE_DB=true later we will attempt a real connection (TODO once DB layer ready).
if (process.env.USE_DB === 'true') {
  (async () => {
    try {
      const { connectDatabase } = await import('./database/connection');
      await connectDatabase();
      app.listen(PORT, () => console.log(`Server (DB) running http://localhost:${PORT}`));
    } catch (err) {
      console.error('Failed to start with DB:', err);
      process.exit(1);
    }
  })();
} else {
  app.listen(PORT, () => console.log(`Server (in-memory) running http://localhost:${PORT}`));
}
