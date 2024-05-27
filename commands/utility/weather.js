const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { weatherAPI } = require("../../config.json");
const axios = require("axios");

module.exports = {
  //setting the command name
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("View the weather for your chosen area")

    //setting the command options
    .addStringOption((option) =>
      option
        .setName("city")
        .setDescription("The chosen area's weather to show")
        .setRequired(true)
    ),

  //execute the command
  async execute(interaction) {
    const city = interaction.options.getString("city");

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPI}`
      );

      //making an embed message template
      const weatherEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${res.data.name} Weather:`)
        .setDescription(
          `lon: ${res.data.coord.lon}, lat: ${res.data.coord.lat}`
        )
        .addFields(
          {
            name: "Weather",
            value: `${res.data.weather[0].main}`,
            inline: true,
          },
          {
            name: "Temperature",
            value: `${res.data.main.temp}C`,
            inline: true,
          },
          {
            name: "Humidity",
            value: `${res.data.main.humidity}`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({ text: `sources by: OpenWeather` });

      //returning the embed reply to command
      return await interaction.reply({ embeds: [weatherEmbed] });
    } catch (error) {
      console.error(error);
      return await interaction.reply(`couldn't fetch data`);
    }
  },
};
