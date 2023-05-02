const { Sequelize } = require("sequelize");
const db = require("../models");
const Product = db.Product;
const transDetail = db.Transaction_detail;
const transHead = db.Transaction_header;

module.exports = {
  createTransaction: async (req, res) => {
    try {
      const { cart } = req.body;
      const totalPrice = cart.reduce((total, product) => {
        return total + product.product_price * product.qty;
      }, 0);

      const transactionHeader = await transHead.create({
        total_price: totalPrice,
        date: new Date(),
        user_id: req.userId,
      });

      const newTransactions = await transDetail.bulkCreate(
        cart.map((product) => {
          return {
            qty: product.qty,
            product_name: product.product_name,
            product_price: product.product_price,
            ProductId: product.ProductId,
            TransactionHeaderId: transactionHeader.id,
          };
        })
      );

      res.status(200).send({
        message: "Transaction successfully created",
        data: {
          Transaction_Header: transactionHeader,
          Transaction_detail: newTransactions,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const transactionDone = await transHead.findOne({
        where: { id: req.params.id },
      });

      await transDetail.destroy({
        where: { TransactionHeaderId: transactionDone.id },
      });

      await transHead.destroy({ where: { id: transactionDone.id } });

      res.status(200).send({
        message: "Transaction successfully deleted",
        data: {
          Transaction_Header: transactionDone,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
