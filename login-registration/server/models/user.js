const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


let UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true });

// UserSchema.pre('save', (next) => {

//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
//     next();
// });
UserSchema.methods.confirm = function(password) {
    return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);