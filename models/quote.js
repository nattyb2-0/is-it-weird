const db = require('../lib/dbConnect.js');

function addQuote(req, res, next) {
  db.one(`INSERT INTO quotes (content) VALUES ($1)`, [req.body.content])
  .then(next())
  .catch(err => next(err));
}

function getAllQuotes(req, res, next) {
  console.log('models/quote getAllQuotes function');
  db.any(`SELECT
          q.*,
          row_to_json(c.*) as comments
          FROM quotes q
          LEFT JOIN comments c USING(id);`)
  .then((quotes) => {
    console.log(quotes);
    res.quotes = quotes;
    next();
  })
  .catch(error => next(error));
}

module.exports = {
  addQuote,
  getAllQuotes
}

