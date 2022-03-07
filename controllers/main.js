const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors");

const login = async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password) {
      throw new BadRequest("Please provide username and password", 400);
   }

   // Just demo normally provided by DB
   const id = new Date().getDate();

   // Try to keep payload small, better experience for user
   const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
   });

   res.status(200).json({ message: "User Created", token });
};

const dashboard = async (req, res) => {
   console.log(req.user);
   const luckyNumber = Math.floor(Math.random() * 100);

   res.status(200).json({
      message: `Hello ${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
   });
};

module.exports = {
   login,
   dashboard,
};
