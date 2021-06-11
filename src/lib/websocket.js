import { store } from '../app/store';
import {
    ACTIONS
} from '../constants/constants';
var W3CWebSocket = require('websocket').w3cwebsocket;


const UNIQUE_ID = 'admin';

 
var client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');
 
client.onerror = function() {
    console.log('Connection Error');
};
 
client.onopen = function() {
    console.log('WebSocket Client Connected');
 
};
 
client.onclose = function() {
    console.log('echo-protocol Client Closed');
};
 
client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        // const data = JSON.parse(e.data);
        const { event, payload } = JSON.parse(e.data);

        if (event === ACTIONS.PING) {

            const { log, ...gameState } = store.getState();

            websocketApi.send(
                gameState
            )
        }
    }
};

const websocketApi = {

    send(payload, event = ACTIONS.HEARTBEAT) {
        client.send(
            JSON.stringify({
                event,
                payload
            })
        );
    },
    sendPartialEvent(key, value) {
        this.send(
            {
                key,
                value
            },
            ACTIONS.PARTIAL_EVENT
        )
    }
};


export default websocketApi;