const mongoose = require ('mongoose');

mongoose.set('strictQuery', false);


mongoose.connect("mongodb://0.0.0.0:27017/productdb",{
    useNewUrlParser:true,
}).then(() => {
    console.log("success")
}).catch((err) => {
    console.log(err)
})