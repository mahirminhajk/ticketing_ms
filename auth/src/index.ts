import express from 'express';
import { currentUserRouter, signoutRouter, signupRouter, signinRouter } from './routes';

//* app
const app = express();

//* middleware
app.use(express.json());

app.use('/api', currentUserRouter);
app.use('/api', signinRouter);
app.use("/api", signupRouter);
app.use('/api', signoutRouter);

//* listen
app.listen(3000, () => {
  console.log('Auth service listening on port 3000');
});
