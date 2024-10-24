require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  dbserver: process.env.DATABASE_SERVER,
  password : process.env.DB_PASSWORD,
  sessionKeySecret: process.env.SESSION_KEY_SECRET,
  username: process.env.DB_USERNAME,
  dbPort: process.env.DATABASE_PORT,
  dbPath:process.env.DATABASE_PATH,
  email: process.env.GMAIL_EMAIL,
  gmail_password: process.env.GMAIL_PASSWORD,
};
