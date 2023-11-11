const express = require("express");
const cors = require('cors');

const {pool} = require("./db");

const userRoutes = require('./routes/userRouter');
const loginRoutes = require('./routes/loginRouter');
const protectedRoute = require("./routes/protectedRoute");
const driverRoute = require('./routes/driverRoute');
const orderRoute = require('./routes/orders')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//  const crypto = require('crypto');

// const generateSecretKey = () => {
//    return crypto.randomBytes(32).toString('hex'); // 32 bytes converted to hexadecimal
//  };

//  const secretKey = generateSecretKey();
//  console.log('Secure Secret Key:', secretKey);


app.use(userRoutes);
app.use(loginRoutes);
app.use(protectedRoute);
app.use(driverRoute);
app.use(orderRoute);
app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`);
});
