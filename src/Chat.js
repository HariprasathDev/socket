import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const Chat = ({ roomId, username }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const ws = useRef(null);

    const connectWebSocket = () => {
        
        ws.current = new W3CWebSocket(`ws://localhost:8000/ws/chat/${roomId}/${username}/`);


        ws.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.current.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        ws.current.onclose = () => {
            console.log('WebSocket Client Disconnected');
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    };

    const disconnectWebSocket = () => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
        }
    };

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const messageData = {
                message: newMessage,
            };
            ws.current.send(JSON.stringify(messageData));
            setNewMessage('');
        } else {
            console.error('WebSocket is not open. Cannot send message.');
        }
    };

    return (
        <div>
            <div>
                <h3>Chat Room: {roomId}</h3>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={connectWebSocket}>Connect WebSocket</button>
                <button onClick={disconnectWebSocket}>Disconnect WebSocket</button>
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
