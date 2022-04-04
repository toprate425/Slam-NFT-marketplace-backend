import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
// import mongoose from 'mongoose'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import articleRoute from './routes/article.routes'
import collectRoute from './routes/collect.routes'
import cateogoryRoute from './routes/category.routes'
import config from './config/config';
require("dotenv").config()
console.log("new server", config.mongoUri)

const MongoClient = require("mongodb").MongoClient;


const CURRENT_WORKING_DIR = process.cwd();
const app = express()

const mongo = new MongoClient(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongo.connect(err => {
  console.log("connected for NFT")
})
// mongoose.Promise = global.Promise;
// mongoose
//   .connect(
//     config.mongoUri,
//     {useNewUrlParser: true}
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use('/api/users', userRoutes)
app.use('/', authRoutes)
app.use('/api/article', articleRoute)
app.use('/api/collections',collectRoute)
app.use('/api/category',cateogoryRoute)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
})

// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to database: ${mongoUri}`)
// })
app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

