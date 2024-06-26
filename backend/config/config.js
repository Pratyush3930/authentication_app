const fs = require('fs');
const path = require('path');

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.resolve(__dirname, '../ca-certificate.crt')).toString()
      }
    }
  },
  test: {
    username: "postgres",
    password: "postgres12",
    database: "newdb",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.resolve(__dirname, '../ca-certificate.crt')).toString()
      }
    }
  }
};