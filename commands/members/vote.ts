import { WAMessage } from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";
import { Bot } from "../../interface/Bot";
import { getVotingData, setVotingData } from "../../db/VotingDB";

export const command = () => {
  const cmd = ["vote"];

  return { cmd, handler };
};

const handler = async (bot: Bot, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  const { prefix, reply, sender, senderName, args, from } = msgInfoObj;

  const res = await getVotingData(from);
  const votingResult = res[0];

  if (!votingResult.is_started) {
    await reply(
      `❌ Voting is not started here, Start by \n${prefix}startvote #title #name1 #name2 #name3`
    );
    return;
  }
  if (votingResult.voted_members.includes(sender)) {
    await reply("❌ You already voted.");
    return;
  }
  if (args.length === 0) {
    await reply("❌ Give value to vote on!");
    return;
  }

  const voteNumber = Math.floor(Number(args[0]));
  if (isNaN(voteNumber)) {
    await reply("❌ Give a number!");
    return;
  }

  if (voteNumber > votingResult.count.length || voteNumber < 1) {
    await reply("❌ Number out of range!");
    return;
  }

  votingResult.count[voteNumber - 1] += 1; //increase vote
  votingResult.members_voted_for[voteNumber - 1].push(senderName); // save who voted
  votingResult.voted_members.push(sender); //member voted

  await setVotingData(
    from,
    true,
    votingResult.started_by,
    votingResult.title,
    votingResult.choices,
    votingResult.count,
    votingResult.members_voted_for,
    votingResult.voted_members
  );

  await reply(`_✔ Voted for [${votingResult.choices[voteNumber - 1].trim()}]_`);
};
