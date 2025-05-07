import express, { json } from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import notesRoutes from './routes/note.js';

dotenv.config();

const app = express();
app.use(json());
app.use('/notes', notesRoutes);

connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
