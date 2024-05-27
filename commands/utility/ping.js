// get the slash command builder from module
const { SlashCommandBuilder } = require("discord.js");

// export the function
module.exports = {
  //make a new slash command
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong!"),

  //execute and reply the command
  async execute(interaction) {
    await interaction.reply("pong!");
  },
};
