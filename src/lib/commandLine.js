import GoalsCommand from './commands/goals';
import PenaltyCommand from './commands/penalty';
import RedCardCommand from './commands/redCard';
import TimeCommand from './commands/time';
import WarningCommand from './commands/warning';

const commandsCollection = [
    GoalsCommand,
    TimeCommand,
    PenaltyCommand,
    WarningCommand,
    RedCardCommand
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