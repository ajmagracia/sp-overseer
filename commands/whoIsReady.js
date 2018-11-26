import { ReadyMembers } from '../index';

export const name = 'whoisready';
export const description = 'List members ready to commence the suicide pact.';
export const aliases = ['whosready', 'whoready', 'readylist', 'readymembers'];
export const guildOnly = true;
export const cooldown = 5;
export const execute = async (message, args) => {
	const allMembers = message.channel.guild.members.filter(
		(member) => !member.user.bot
	);
	let memberString = 'Sadly, no one';
	let verb = ' is';
	const memberList = await ReadyMembers.findAll({ attributes: ['username'] });
	if (memberList.length > 1) {
		memberList[memberList.length - 1].username = `and ${
			memberList[memberList.length - 1].username
		}`;
		verb = ' are';
	}
	if (memberList.length === allMembers.size) {
		memberString = 'Congratulations! You are all';
		verb = undefined;
	}
	else if (memberList.length === 2) {
		memberString = `${memberList[0].username} and ${memberList[1].username}`;
	}
	else if (memberList.length) {
		memberString = memberList.map((member) => member.username).join(', ');
	}
	console.log(memberList[0].username);
	return message.channel.send(
		`${memberString}${verb || ''} ready to commence the suicide pact.`
	);
};
