require("dotenv").config();
const Sequelize = require("sequelize");

class Database {
  // message = "Hello, World!";

  constructor() {}

  helloWorld() {
    return "Hello, World!";
  }

  create(tableName, columnNames, data) {}

  read(sql) {}

  update(tableName, targetColumn, newValue, referenceColumn, referenceValue) {}

  delete(tableName, referenceColumn, referenceValue) {}

  execute(sql) {}

  duplicate(
    tableName,
    referenceColumn,
    referenceValue,
    incrementColumn,
    incrementString
  ) {}

  getCredentials() {}

  async connect() {
    const database = process.env.D
    process.env.DB_CONNECTION
    process.env.DB_HOST
    process.env.DB_PORT
    process.env.DB_DATABASE
    process.env.DB_USERNAME
    process.env.DB_PASSWORD
    const sequelize = new Sequelize("appjudigot", "root", "", {
      host: "localhost",
      dialect: `mysql`,
    });
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }

  disconnect(connection) {
    connection = null;
  }

  dump() {}

  unionBuilder(iterator, tableDetails) {}
}

module.exports = Database;
