class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
            this.actionProvider.greet();
        } else if (lowerCaseMessage.includes("password") || lowerCaseMessage.includes("reset")) {
            this.actionProvider.handlePasswordHelp();
        } else if (lowerCaseMessage.includes("complaint") || lowerCaseMessage.includes("file") || lowerCaseMessage.includes("report")) {
            this.actionProvider.handleComplaintHelp();
        } else if (lowerCaseMessage.includes("login") || lowerCaseMessage.includes("sign in")) {
            this.actionProvider.handleLoginHelp();
        } else {
            this.actionProvider.handleUnknown();
        }
    }
}

export default MessageParser;
