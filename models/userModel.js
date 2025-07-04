import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        Type: String
    },
})

const User = mongoose.model('user', userSchema);
export default User;