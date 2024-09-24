const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

function calculateReturn(boughtAt, marketPrice, quantity) {
  return (marketPrice - boughtAt) * quantity;
}

function calculateTotalReturns(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}

function calculateReturnPercentage(boughtAt, returns) {
  return (returns / boughtAt) * 100;
}

function calculateTotalReturnPercentage(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}

function getStatus(returnPercentage) {
  if (returnPercentage > 0) return 'profit';
  else return 'loss';
}

app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseFloat(req.query.quantity);

  res.send(calculateReturn(boughtAt, marketPrice, quantity).toString());
});

app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  res.send(calculateTotalReturns(stock1, stock2, stock3, stock4).toString());
});

app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);

  res.send(calculateReturnPercentage(boughtAt, returns).toString());
});

app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  res.send(
    calculateTotalReturnPercentage(stock1, stock2, stock3, stock4).toString()
  );
});

app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);

  res.send(getStatus(returnPercentage));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
