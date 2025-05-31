import env from "dotenv"
import TelegramBot from "node-telegram-bot-api"
import { handleMessage } from "./src/handleMessage.js"
import { handleCallback } from "./src/handleCallbackquery.js"
env.config()

const bot = new TelegramBot(process.env.TOKEN, { polling: true })

bot.on("message", (msg) => {
      handleMessage(bot, msg)
})

bot.on("callback_query", (msg) => {
      handleCallback(bot, msg)
})