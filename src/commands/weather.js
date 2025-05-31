import { regionsButtons } from "../keyboards/weather.keyboard.js"

export function weather(bot, msg) {
      console.log("weather soradi");

      const chatId = msg.message.chat.id
      bot.sendMessage(chatId, "O'zingizga kerakli viloyat yoki shaharni tanlang", regionsButtons)
}