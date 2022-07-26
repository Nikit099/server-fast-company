const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const chalk = require("chalk")
const initDatabase = require("./startUp/initDatabase.js")
const router = require("./routes")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", router)

const PORT = config.get("port") ?? 8080

if (process.env.NODE_ENV === "production") {
} else {
}

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase()
    })
    await mongoose.connect(config.get("mongoUri"))
    app.listen(PORT, () => {
      console.log(chalk.blue(`Server has been started on port ${PORT}...`))
    })
  } catch (e) {
    console.log(chalk.red(e))
    process.exit(1)
  }
}
start()
///user/?Authorization=Bearer
