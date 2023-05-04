const jwt = require("jsonwebtoken");
const db = require("../models");
const user_store = db.User_store;

module.exports = {
  isLogin : async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token) throw {
        message: "Unauthorized"
      }
      token = token.split(" ")[1];
      const userData = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = userData.id;
      
      const userStoreData = await user_store.findOne({
        where: {
          user_id: userData.id
        },
      });

      req.storeId = userStoreData.id;
      // console.log(req);
      next();

    } catch (err) {
      console.log(err);
      res.status(400).send(err)
    }
  },

  isOwner : async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token) throw {
        message: "Unauthorized"
      }
      token = token.split(" ")[1];
      const userData = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = userData.id;
      
      const userStoreData = await user_store.findOne({
        where: {
          user_id: userData.id
        },
      });

      if (req.params.store_id != userStoreData.id) {
        throw {
          message: "Unrelated user"
        };
      }

      req.storeId = userStoreData.id;

      next();

    } catch (err) {
      console.log(err);
      res.status(400).send(err)
    }
  },
}