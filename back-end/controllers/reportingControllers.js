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

  getTotalTransaction: async (req, res) => {
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
        `SELECT date, sum(qty) as products_sold FROM transaction_details
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
        message: "total transaction report retrieved",
        data: result
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getTopSellingProducts: async (req, res) => {
    try {
      const storeId = parseInt(req.params.store_id);

      const result = await sequelize.query(
        `SELECT product_name, SUM(qty) AS total_qty_sold
        FROM transaction_details
        JOIN products ON transaction_details.ProductId = products.id
        JOIN transaction_headers ON transaction_details.TransactionHeaderId = transaction_headers.id
        WHERE store_id = :store_id
        GROUP BY product_name
        ORDER BY total_qty_sold DESC
        LIMIT 5`,
        {
          replacements: {
            store_id: storeId
          },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      res.status(200).json({
        message: "top selling report retrieved",
        data: result
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  
  getTopSellingProductsByCategory: async (req, res) => {
    try {
      const storeId = parseInt(req.params.store_id);
      const categoryId = parseInt(req.params.category_id);

      const result = await sequelize.query(
        `SELECT product_name, SUM(qty) AS total_qty_sold
        FROM transaction_details
        JOIN products ON transaction_details.ProductId = products.id
        JOIN transaction_headers ON transaction_details.TransactionHeaderId = transaction_headers.id
        WHERE store_id = :store_id AND category_id = :category_id
        GROUP BY product_name
        ORDER BY total_qty_sold DESC
        LIMIT 5`,
        {
          replacements: {
            store_id: storeId,
            category_id: categoryId
          },
          type: Sequelize.QueryTypes.SELECT
        }
      );

      res.status(200).json({
        message: "top selling report by category retrieved",
        data: result
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  
};



