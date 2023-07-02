import { WAMessage } from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";
import { Bot } from "../../interface/Bot";
import { getGroupsData } from "../../db/groupsDB";

const handler = async (bot: Bot, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  const { reply } = msgInfoObj;

  const getGroupLinkRes = await getGroupsData();
  let message = "📛 PVX LINKS 📛";
  getGroupLinkRes.forEach((group) => {
    message += `\n\n${group.groupjid}\n${group.gname}\n${group.link}`;
  });

  await reply(message);
};

const getgdata = () => {
  const cmd = ["getgdata"];

  return { cmd, handler };
};

export default getgdata;
