import { startButtons } from "./keyboards/start.keyboard.js"

export function handleMessage(bot, msg) {
      const chatId = msg.chat.id
      const text = msg.text || ""
      console.log(msg);
      switch (text) {
            case "/start":
                  bot.sendMessage(chatId, `Assalomu alekum ${msg.from.first_name}!\nSizga qanday yordam bera olaman?`, startButtons)
                  break;
      }
}
