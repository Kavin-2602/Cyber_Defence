class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet() {
        const message = this.createChatBotMessage("Hello, soldier! How can I assist you?");
        this.updateChatbotState(message);
    }

    handleLoginHelp() {
        const message = this.createChatBotMessage(
            "To login, use your registered credentials on the Login page. If you are new, click 'Signup' to create an account."
        );
        this.updateChatbotState(message);
    }

    handlePasswordHelp() {
        const message = this.createChatBotMessage(
            "If you forgot your password, go to the Login page and click 'Forgot Password?'. You'll need your registered email."
        );
        this.updateChatbotState(message);
    }

    handleComplaintHelp() {
        const message = this.createChatBotMessage(
            "To file a complaint, log in and navigate to 'Submit Complaint'. Fill in the details and select the severity level."
        );
        this.updateChatbotState(message);
    }

    handleUnknown() {
        const message = this.createChatBotMessage(
            "I'm not sure I understand. Try asking about 'login', 'complaints', or 'password'."
        );
        this.updateChatbotState(message);
    }

    updateChatbotState(message) {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;
