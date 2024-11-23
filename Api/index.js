import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { solveSudoku, generateSudoku } from './controller/solver.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/solve', (req, res) => {
  const { grid } = req.body;
  const solution = solveSudoku(grid);
  res.json({ solution });
});

app.get('/generate', (req, res) => {
  const grid = generateSudoku();
  res.json({ grid });
});

app.listen(5000, () => console.log('Server running on port 5000'));
