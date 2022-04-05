const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: "mongodb+srv://toprate425:Highlighting1993425@cluster0.8udnj.mongodb.net/nft"
  // mongoUri: process.env.MONGODB_URI ||
  //   process.env.MONGO_HOST ||
  //   'mongodb://' + (process.env.IP || '127.0.0.1') + ':' +
  //   (process.env.MONGO_PORT || '27017') +
  //   '/slam'
}

export default config
