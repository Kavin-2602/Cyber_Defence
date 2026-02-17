import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from '../chatbot/config';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';

const DefenceBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleBot = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {isOpen && (
                <div style={{ marginBottom: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </div>
            )}
            <button
                onClick={toggleBot}
                style={{
                    backgroundColor: '#1a237e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '24px',
                }}
                title="DefenceBot Help"
            >
                🤖
            </button>
        </div>
    );
};

export default DefenceBot;
