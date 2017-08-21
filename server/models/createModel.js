import mongoose from 'mongoose'
import {MONGO_DB_URL} from '../config'
import Promise from 'bluebird'
mongoose.Promise = Promise

const db = mongoose.connect(MONGO_DB_URL, {useMongoClient: true})

export default (name, schema) => db.model(name, schema)