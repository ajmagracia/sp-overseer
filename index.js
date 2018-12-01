import fs from 'fs';
import { prefix, names } from './config.json';
import Discord from 'discord.js';
import Sequelize from 'sequelize';

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	storage: 'database.sqlite',
});

export const ReadyMembers = sequelize.define('readyMembers', {
	userid: {
		type: Sequelize.TEXT,
		unique: true,
	},
	username: {
		type: Sequelize.STRING,
	},
});

const correctName = (name) =>
	nameChecker(name).on('collect', (message) =>
		message.channel.send(
			names[name][Math.floor(Math.random() * names[name].length)] + '*'
		)
	);

const nameChecker = (name) =>
	bot.channels
		.get('203370370164719616')
		.createMessageCollector((message) =>
			message.content.toLowerCase().includes(name)
		);

const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

export const getUserFromMention = (mention) => {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return matches;
	return bot.users.get(matches[1]);
};

bot.once('ready', () => {
	ReadyMembers.sync();
	console.log('Ready!');
	console.log(names, typeof names);
	Object.keys(names).forEach((name) => correctName(name));
});

bot.on('message', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		bot.commands.get(commandName) ||
		bot.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command insidie DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${
				command.usage
			}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`Please wait ${timeLeft.toFixed(
					1
				)} more second(s) before reusing the \`${command.name}\` command.`
			);
		}
	}

	try {
		command.execute(message, args);
	}
	catch (err) {
		console.error(err);
		message.reply('there was an error trying to execute that command!');
	}
});

bot.login(process.env.BOT_TOKEN);
