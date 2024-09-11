import express from 'express';

//* app
const app = express();

//* middleware
app.use(express.json());



//* listen
app.listen(3000, () => {
  console.log('Auth service listening on port 3000');
});
