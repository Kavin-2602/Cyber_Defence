import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
    botName: "DefenceBot",
    initialMessages: [
        createChatBotMessage(`Reporting for duty! I am DefenceBot. How can I assist you today?`, {
            widget: "options",
        }),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#1a237e", // Navy blue
        },
        chatButton: {
            backgroundColor: "#1a237e",
        },
    },
    widgets: [
        {
            widgetName: "options",
            widgetFunc: (props) => <Options {...props} />,
        },
    ],
};

const Options = (props) => {
    const options = [
        { text: "Login Help", handler: () => props.actionProvider.handleLoginHelp(), id: 1 },
        { text: "File Complaint", handler: () => props.actionProvider.handleComplaintHelp(), id: 2 },
        { text: "Forgot Password", handler: () => props.actionProvider.handlePasswordHelp(), id: 3 },
    ];

    const optionsMarkup = options.map((option) => (
        <button
            key={option.id}
            onClick={option.handler}
            className="option-button"
            style={{
                padding: "8px",
                margin: "5px",
                borderRadius: "5px",
                border: "1px solid #1a237e",
                backgroundColor: "transparent",
                color: "#1a237e",
                cursor: "pointer",
                fontSize: "0.9rem"
            }}
        >
            {option.text}
        </button>
    ));

    return <div className="options-container">{optionsMarkup}</div>;
};

export default config;
