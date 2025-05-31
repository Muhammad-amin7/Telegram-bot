import { weatherApi } from "./api/weather.api.js"
import { weather } from "./commands/weather.js"

export async function handleCallback(bot, msg) {
      const chatId = msg.message.chat.id
      const text = msg.data

      switch (true) {
            case text == "weather":
                  weather(bot, msg)
                  break
            case text.startsWith("weather_"):
                  const region = msg.data.split("_")[1];
                  const response = await weatherApi(region);
                  bot.sendMessage(chatId, response, { parse_mode: "HTML" });
                  break;
      }

      bot.answerCallbackQuery(msg.id)
}
