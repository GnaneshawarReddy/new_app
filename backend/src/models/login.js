const  mongoose  = require("mongoose");

const LoginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const EmployeeModule=mongoose.model("registration",LoginSchema,"registration")
module.exports=EmployeeModule;