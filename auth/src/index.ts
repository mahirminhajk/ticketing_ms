import express from 'express';

//* app
const app = express();

//* middleware
app.use(express.json());

app.get('/api/users/currentuser', (req, res) => { 
  res.send('Hi there!');
 });

//* listen
app.listen(3000, () => {
  console.log('Auth service listening on port 3000');
});
