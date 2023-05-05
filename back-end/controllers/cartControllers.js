const Redis = require('ioredis');

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: process.env.REDIS_DB
});

module.exports = {
  getCart: async (req, res) => {
    try {

      redis.get(req.userId, async (err, data) => {
        const cart = JSON.parse(data)
        res.status(200).send({
          message: "Cart data successfully retrieved",
          user_id: req.userId,
          data: cart
        });
      })

    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  addToCart: async (req, res) => {
    try {
      redis.get(req.userId, async (err, data) => {
        let cart = JSON.parse(data);
        const product = req.body;
        
        if (!cart) {

          product.qty = 1;
          await redis.set(
            req.userId, 
            JSON.stringify([product])
          );

          res.status(200).send({
            message: "Successfully add new product to cart",
            user_id: req.userId,
            data: product
          });
        } else {
          const productExist = cart.find(p => p.ProductId == product.ProductId);
          console.log(productExist);

          if (!productExist) {
            product.qty = 1;
            cart.push(product)
            await redis.set(
              req.userId, 
              JSON.stringify(cart)
            );

            res.status(200).send({
              message: "Successfully add new product to cart",
              user_id: req.userId,
              data: product
            });

          } else {
            
            const updatedCart = cart.map(p => {
              if (p.ProductId == product.ProductId) {
                p.qty++;
                return p;
              } else {
                return p;
              }
            })

            await redis.set(
              req.userId, 
              JSON.stringify(updatedCart)
            );

            res.status(200).send({
              message: "Successfully add product qty",
              user_id: req.userId,
              data: productExist
            });

          }
        }
      })
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  removeFromCart: async (req, res) => {
    try {
      // console.log(req.params.product_id);
      await redis.get(req.userId, async (err, data) => {
        let cart = JSON.parse(data);

        if (cart) {
          const productIndex = await cart.map(p => p.ProductId).indexOf(Number(req.params.product_id));

          if (productIndex == -1) return res.status(400).send({
            message: "Product ID not found in cart"
          });
          
          if (cart[productIndex] && cart[productIndex].qty == 1) {
            cart.splice(productIndex, 1)
          } else if (cart[productIndex] && cart[productIndex].qty > 1) {
            cart[productIndex].qty--;
          } else {
            return res.status(400).send({
              message: "Product ID not found in cart"
            });
          }

          await redis.set(
            req.userId, 
            JSON.stringify(cart)
          );

          res.status(200).send({
            message: "Successfully update product qty",
            user_id: req.userId
          });

        }
      })

    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  clearCart: async (req, res) => {
    try {
      
      await redis.set(
        req.userId, 
        JSON.stringify([])
      );

      res.status(200).send({
        message: "Successfully clear cart",
        user_id: req.userId
      });

    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
