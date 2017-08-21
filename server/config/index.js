import path from 'path'

export const HOST_PORT = 8099
export const HOST_NAME = 'localhost'
export const PROTOCOL = 'http'
export const BASE_URL = PROTOCOL + '://' + HOST_NAME + ':' + HOST_PORT
export const STATIC_DIR = path.resolve(__dirname, '../../dist')
export const POSTS_BASE_PATH = path.resolve(__dirname, '../../posts')
export const MONGO_DB_URL = 'mongodb://localhost/blog'

export const ADMIN_USER_NAME = 'admin'
export const ADMIN_PASSWORD = 'admin123'
export const DOMAIN_NAME = 'http://imtuzi.com'