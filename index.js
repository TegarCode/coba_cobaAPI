const express = require("express");
const app = express();

const db = require('./models')

const userRoute = require('./route/user.route')
const authRoute = require("./route/auth/auth.route");


db.sequelize
    .authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil.');
    })
    .catch(err => {
        console.log('Gagal koneksi ke database: ', err);
    })

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "selamat datang du aplikasi node.hs + expressjs +sequelize + SQL"
})
});

app.use("/users",userRoute);
app.use("/auth", authRoute);

const port = 8002;

app.listen(port, () =>{
    console.log(`server starter on port ${port}`)
})