import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext()

const initState = {
    general: [
        {from: 'Victor', msg: 'lets go to fly drones' },
        {from: 'Nando', msg: 'lets go to fly drones' },
        {from: 'Zigy', msg: 'lets go to fly drones' },
    ],
    printing: [
        {from: 'Jonh', msg: 'lets go to fly drones' },
        {from: 'Vicorsi', msg: 'lets go to fly drones' },
        {from: 'Manfo', msg: 'lets go to fly drones' },

    ]

}


function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE' :
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            }
            default:
                return state
    }
}

let socket;

function sendChatAction(value) {     
    socket.emit('chat message', value);
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if(!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
        })
    }
    const user = 'jonas' + Math.random(100).toFixed(2)
    //const allChats = "ddjdjd"
    
    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}