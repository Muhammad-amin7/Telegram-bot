import { Markup, Telegraf } from "telegraf";
import schedule from "node-schedule";
import axios from "axios";
import { startButtons } from "./src/buttons/start.button.js";

let waterMl = 0;
const bot = new Telegraf('7337361786:AAGX03pwNx56OtvSPApda7tZSznxTTt8sv4');


bot.hears("/start", (msg) => {
      console.log(msg)
      msg.reply("Assalomu alekum!", startButtons(Markup));
});

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

schedule.scheduleJob('0 3 * * *', async () => {
      const res = await axios.get("https://api.aladhan.com/v1/timingsByCity?city=Tashkent&country=Uzbekistan&method=2");
      const { Fajr, Dhuhr, Asr, Maghrib, Isha } = res.data.data.timings;
      const text = `⏰ Bugungi kun namoz vaqtlari:\n\nBomdod: ${Fajr}\nPeshin: ${Dhuhr}\nAsr: ${Asr}\nShom: ${Maghrib}\nIsha: ${Isha}`;
      await bot.telegram.sendMessage("6528186432", text);
});

schedule.scheduleJob("0 0 * * *", async () => {
      waterMl = 0
});

bot.launch();
