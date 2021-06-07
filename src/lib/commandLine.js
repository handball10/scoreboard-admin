import GoalsCommand from './commands/goals';
import TimeCommand from './commands/time';

const commandsCollection = [
    GoalsCommand,
    TimeCommand
];

class CommandHandler {

    commands;

    constructor() {
        this.commands = commandsCollection.map(command => command.register());
    }

    processCommand(input) {
        const [ command, ...params] = input.trim().split('');

        this.commands.forEach(
            commandConfig => 
                commandConfig.command === command 
                    ? new commandConfig.handler().process(params.join('')) 
                    : void(0)
        );
    }
}

const instance = new CommandHandler();

export default instance;