import axios from "axios";

export async function weatherApi(region = "Toshkent") {
      try {
            const response = await axios.get(
                  `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=uz`
            );

            const text =
                  `<i>📍Shahar</i>: <b>${response.data.name}</b>\n` +
                  `<i>🌡Harorat</i>: <b>${response.data.main.temp}°C</b>\n` +
                  `<i>🍃Shamol tezligi</i>: <b>${response.data.wind.speed} m/s</b>\n` +
                  `<i>💦Namlik</i>: <b>${response.data.main.humidity}%</b>\n`;

            return text;

      } catch (error) {
            console.error("Xatolik yuz berdi:", error.message);
            return "Ob-havo ma'lumotini olishda xatolik yuz berdi.";
      } finally {
            console.log("Weather API so‘rovi yakunlandi");
      }
}
