export const startButtons = (Markup) => {
      return Markup.inlineKeyboard([
            [Markup.button.callback("💧Suv ichildi(250ml)", "water")],
            [Markup.button.callback(" Namoz vaqti", "namozvaqti")]
      ])
}