const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
      },
      hashed_password: {
        type: String,
        required: true,
      },
      salt: String,
      resetPasswordLink: {
        data: String,
        default: "",
      },
    },
    {timestamps: true}
  );
  
  userSchema
    .virtual("password")
    .set(function (password) {
      // create a temporarity variable called _password
      this._password = password;
      // generate salt
      this.salt = this.makeSalt();
      // encryptPassword
      this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
      return this._password;
    });
  
  userSchema.methods = {
    authenticate: function (plainText) {
      return this.encryptPassword(plainText) === this.hashed_password;
    },
  
    encryptPassword: function (password) {
      if (!password) return "";
      try {
        return CryptoJS
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex");
      } catch (err) {
        return "";
      }
    },
  
    makeSalt: function () {
      return Math.round(new Date().valueOf() * Math.random()) + "";
    },
  };
  
  module.exports = mongoose.model("User", userSchema);
  