class SignUpData{
    static randomNumber = Math.floor(Math.random() * 1000)

    static signUpDetails = {
        firstname: "Manish", 
        lastname: "Dadhich", 
        emailAddress: `manish${this.randomNumber}@g.com`, 
        password: "d@Dhich1900"
    }

}

module.exports = {SignUpData}