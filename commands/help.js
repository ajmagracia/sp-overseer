import { prefix } from '../config.json';

export const name = 'help';
export const description =
	'List all of my commands or info about a specific command.';
export const aliases = ['commands'];
export const usage = '[command name]';
export const cooldown = 5;
export const execute = (message, args) => {
	const data = [];
	const { commands } = message.client;

	if (!args.length) {
		data.push('Here\'s a list of all my commands:');
		data.push(commands.map((command) => command.name).join(', '));
		data.push(
			`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
		);

		return message.author
			.send(data, { split: true })
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('I\'ve sent you a DM with all my commands!');
			})
			.catch((err) => {
				console.error(
					`Could not send help DM to ${message.author.tag}.\n`,
					err
				);
				message.reply('it seems I can\'t DM you! Do you have DMs disabled?');
			});
	}

	const commandName = args[0].toLowerCase();
	const command =
		commands.get(commandName) ||
		commands.find((c) => c.aliases && c.alases.includes(commandName));

	if (!command) {
		return message.reply('that\'s not a valid command!');
	}

	data.push(`**Name:** ${command.name}`);

	if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
	if (command.description) data.push(`**Description** ${command.description}`);
	if (command.usage) {
		data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
	}

	data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

	message.channel.send(data, { split: true });
};
