const express = require("express");
const cors = require("cors");
const jwt_token=require("jsonwebtoken")
const mongoose = require("mongoose");
const EmployeeModule = require("./src/models/login");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET="IAMTHEHERO"
const uri = "mongodb+srv://abbu:Abbu%401234@cluster0.nib6r.mongodb.net/registration?retryWrites=true&w=majority";

    mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
    });

    const authenticateJWT = (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied" });
      
        jwt_token.verify(token, JWT_SECRET, (err, user) => {
          if (err) return res.status(403).json({ message: "Invalid token" });
          req.user = user;
          next();
        });
      };
      


app.post("/register", (req, res) => {
    EmployeeModule.create(req.body)
        .then(students => {
            res.json(students)
            console.log(students)
        })
        .catch(e => res.status(500).json({ error: e.message }));
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModule.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const token = jwt_token.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: "1h" });
                    res.json({ message: "Login Successful", token });
                } else {
                    res.status(400).json({ message: "Incorrect Password" });
                }
            } else {
                res.status(400).json({ message: "Email not found" });
            }
        })
        .catch(e => res.status(500).json({ error: e.message }));
});


// Update port number here
app.listen(4000, () => {
    console.log("The server is running on port 4000");
});
