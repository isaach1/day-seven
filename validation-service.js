class ValidationService {
    constructor() {}

    validateEmail(email) {
        return true;
    }
}

module.exports = ValidationService;

// can export a single instance of this class
// var validServ = new ValidationService();
// module.exports = validServ;