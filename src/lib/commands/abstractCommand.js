import { store } from '../../app/store';
import { LOG_TYPES } from '../../constants/constants';

import {
    logEvent
} from '../../features/commandLog/commandLogSlice';

export default class AbstractCommand {

    command = '';

    process() {}

    log({ message = 'message', type = LOG_TYPES.INFO }) {
        store.dispatch(logEvent({
            message,
            type
        }))
    }
}