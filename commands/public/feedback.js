module.exports.command = () => {
  let cmd = ["feedback"];

  return { cmd, handler };
};

const handler = async (bot, msg, from, args, msgInfoObj) => {
  let text = `✔ Give any Feedback related to PVX\nhttps://forms.gle/WEQ33xzHpYAQvArd6`;

  await bot.sendMessage(from, { text }, { quoted: msg });
};
