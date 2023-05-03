const { Sequelize } = require("sequelize");
const db = require("../models");
const sequelize = db.sequelize;

module.exports = {
  getGrossIncome: async (req, res) => {
    try {
      const storeId = parseInt(req.params.store_id);
      let startDate, endDate;
  
      if (req.query.from && req.query.to) {
        startDate = new Date(req.query.from).toISOString().slice(0, 10);
        endDate = new Date(req.query.to).toISOString().slice(0, 10);
      } else {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        endDate = new Date().toISOString().slice(0, 10);
      }
  
      const result = await sequelize.query(
        `SELECT date, sum(qty * price) as gross_income FROM transaction_details
        JOIN products ON transaction_details.ProductId = products.id
        JOIN transaction_headers ON transaction_details.TransactionHeaderId = transaction_headers.id
        WHERE store_id = :store_id AND date BETWEEN :start_date AND :end_date
        GROUP BY date`,
        {
          replacements: {
            store_id: storeId,
            start_date: startDate,
            end_date: endDate
          },
          type: Sequelize.QueryTypes.SELECT
        }
      );
  
      res.status(200).json({
        message: "gross income report retrieved",
        data: result
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  
  
};



