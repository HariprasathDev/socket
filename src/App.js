import React, { useState } from 'react';
import Chat from './Chat';

const App = () => {
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const [enteredChat, setEnteredChat] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnteredChat(true);
    };

    return (
        <div>
            {!enteredChat ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button type="submit">Join Chat</button>
                </form>
            ) : (
                <Chat roomId={roomId} username={username} />
            )}
        </div>
    );
};

export default App;
