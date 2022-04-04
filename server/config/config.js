const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: "mongodb://194.5.212.30:27017/slam"
  // mongoUri: process.env.MONGODB_URI ||
  //   process.env.MONGO_HOST ||
  //   'mongodb://' + (process.env.IP || '127.0.0.1') + ':' +
  //   (process.env.MONGO_PORT || '27017') +
  //   '/slam'
}

export default config
