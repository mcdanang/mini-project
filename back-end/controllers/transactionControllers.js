const {Sequelize} = require("sequelize")
const db = require("../models")
const product = db.Product
const transDetail = db.Transaction_detail
const transHead = db.Transaction_header

module.exports = {
    createTransaction: async(req,res) => {
        try{
            const { product_name, product_price, ProductId, qty,total_price} = req.body
            
            const headerTransaction = await transHead.create({
                total_price,
                date: new Date().toString(), 
                user_id: req.userId,
            })
            const newTransaction = await transDetail.create({
                qty,
                product_name,
                product_price,
                ProductId,
                TransactionHeaderId: headerTransaction.id
            })
            res.status(200).send({
                message: "Transaction successfully created",
                data: {
                    Transaction_Header: headerTransaction,
                    Transaction_detail: newTransaction
                }
            })
        } catch (err){
            console.log(err)
            res.status(500).send(err)
      
       }
    },

    deleteTransaction: async(req,res) => {
        try{
            const transactionDone = await transHead.findOne({
                where: {id: req.params.id},
            })
            
            // Delete the associated Transaction_detail record
            await transDetail.destroy({ where: { TransactionHeaderId: transactionDone.id } });
            
            // Delete the Transaction_header record
            await transHead.destroy({ where: { id: transactionDone.id } });
            
            res.status(200).send({
                message: "Transaction successfully deleted",
                data: {
                    Transaction_Header: transactionDone
                }
            })
        }catch (err){
            console.log(err)
            res.status(500).send(err)
        }
    }

}