const bcrypt = require("bcrypt");

class AuthenticationController {
  async hash(password) {
    const saltRounds = 10;
    try {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        return await hash;
      });
    } catch (error) {
      console.error("Unable to generate hash:", error);
      return true;
    }
  }
}

module.exports = AuthenticationController;
