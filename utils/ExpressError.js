class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Correct usage of 'super'
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
