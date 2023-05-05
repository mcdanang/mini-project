const Redis = require('ioredis');

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: process.env.REDIS_DB
});

module.exports = {
  addToCart: async () => {
    redis.set("cart", JSON.stringify({
      cart: [
        {name: "T-shirt", price: 199000},
        {name: "Jaket", price: 399000},
      ]
    }));
  },
  getCart: async () => {
    redis.get("cart", async (err, data) => {
      console.log(JSON.parse(data));
    })
  }
}