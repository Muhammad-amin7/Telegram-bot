import { Markup, Telegraf } from "telegraf";
import schedule from "node-schedule";
import axios from "axios";
import { startButtons } from "./src/buttons/start.button.js";

const bot = new Telegraf('7337361786:AAGX03pwNx56OtvSPApda7tZSznxTTt8sv4');
let waterMl = 0;
const chatId = "6528186432"; // O'zingiznikiga almashtiring

// START
bot.hears("/start", (ctx) => {
      ctx.reply("Assalomu alekum!", startButtons(Markup));
});

// SUV ICHISH
bot.action("water", async (ctx) => {
      waterMl += 250;
      await ctx.answerCbQuery();
      await ctx.reply(`Bugungi istmol: ${waterMl} ml`);
      await ctx.reply("O'zingizga kerakli menuni tanlashingiz mumkin", startButtons(Markup));
});

bot.action("namozvaqti", async (ctx) => {
      await ctx.answerCbQuery();
      const res = await axios.get("https://api.aladhan.com/v1/timingsByCity?city=Tashkent&country=Uzbekistan&method=2");
      const { Fajr, Dhuhr, Asr, Maghrib, Isha } = res.data.data.timings;
      const text = `🕌 Namoz vaqtlari:\n\nBomdod: ${Fajr}\nPeshin: ${Dhuhr}\nAsr: ${Asr}\nShom: ${Maghrib}\nIsha: ${Isha}`;
      await ctx.reply(text);
});

schedule.scheduleJob('0 2 * * *', async () => {
      const res = await axios.get("https://api.aladhan.com/v1/timingsByCity?city=Tashkent&country=Uzbekistan&method=2");
      const { Fajr, Dhuhr, Asr, Maghrib, Isha } = res.data.data.timings;
      const text = `⏰ Bugungi kun namoz vaqtlari:\n\nBomdod: ${Fajr}\nPeshin: ${Dhuhr}\nAsr: ${Asr}\nShom: ${Maghrib}\nIsha: ${Isha}`;
      await bot.telegram.sendMessage(chatId, text);

      // Namoz vaqtlariga 20 daqiqa oldin eslatma rejalashtirish
      const timings = { Fajr, Dhuhr, Asr, Maghrib, Isha };

      Object.entries(timings).forEach(([name, time]) => {
            const [hour, minute] = time.split(":").map(Number);
            const date = new Date();
            date.setHours(hour);
            date.setMinutes(minute - 20);
            date.setSeconds(0);

            if (date.getMinutes() < 0) {
                  date.setHours(date.getHours() - 1);
                  date.setMinutes(60 + date.getMinutes());
            }

            schedule.scheduleJob(date, () => {
                  bot.telegram.sendMessage(chatId, `🕌 ${name} namoziga 20 daqiqa qoldi. Tayyorlaning.`);
            });
      });
});

// 00:00 da suv hisoboti va reset
schedule.scheduleJob("0 0 * * *", () => {
      bot.telegram.sendMessage(chatId, `🚰 Bugungi kunlik suv istemolingiz: ${waterMl} ml`);
      waterMl = 0;
});

bot.launch();
