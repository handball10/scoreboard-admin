import './commandLine.scss';

import CommandHandler from '../../lib/commandLine';

export function CommandLine() {

    return (
        <div className="command-line">
            <input type="text" className="p-4 is-size-1" placeholder="Command..." onKeyDown={
                (event) => {
                    if (event.key === 'Enter') {
                        CommandHandler.processCommand(event.target.value);
                        event.target.value = '';
                    }
                }
            } />
        </div>
    )
}