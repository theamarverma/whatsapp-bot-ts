import { WAMessage } from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";
import { Bot } from "../../interface/Bot";
import { getCountTop10 } from "../../db/countMemberDB";

export const command = () => {
  const cmd = ["pvxt10"];

  return { cmd, handler };
};

const handler = async (bot: Bot, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  const { reply } = msgInfoObj;
  const more = String.fromCharCode(8206);
  const readMore = more.repeat(4001);
  const resultCountGroupTop10 = await getCountTop10();
  let countGroupMsgTop10 = `*📛 PVX TOP 10 MEMBERS FROM ALL GROUPS 📛*\n_From 24 Nov 2021_${readMore}\n`;

  let lastGroupName = resultCountGroupTop10[0].gname;
  let countGroupMsgTempTop10 = `\n\n📛 ${lastGroupName}`;
  for (const member of resultCountGroupTop10) {
    if (member.gname != lastGroupName) {
      lastGroupName = member.gname;
      countGroupMsgTempTop10 += `\n\n📛 *${lastGroupName}*`;
    }
    countGroupMsgTempTop10 += `\n${member.count} - ${member.name}`;
  }
  countGroupMsgTop10 += countGroupMsgTempTop10;

  await reply(countGroupMsgTop10);
};
