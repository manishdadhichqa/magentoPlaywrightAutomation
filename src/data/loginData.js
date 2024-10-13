const {SignUpData} = require("../data/signUpData");

class LoginData{
    static inValidLoginDetails = {
        invalidEmail: "manish@g.com",
        invalidPassword: "123456" 
    }

    static validLoginDetails = {
        validEmail: "manish8@g.com",
        password: "d@Dhich1900"
    }
}

module.exports = {LoginData}