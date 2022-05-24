module.exports = {
    createMessageError(error, code, message, details) {
        
        const messageError = {
            code,
            message,
            details
        };
        error.response = messageError;
    },
    adjustPhone(telefone) {
        return '+55' + telefone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '')
    }
}