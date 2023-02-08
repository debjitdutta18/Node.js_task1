const mongoose = require ('mongoose');
const express = require("express");
require("./db/connect");



const categorySchema = new mongoose.Schema({    /// this is the category Schema
  categoryId: { type: Number },
  categoryName: { type: String }
});
const CategoryData = new mongoose.model("CategoryData",categorySchema);


const productSchema = new mongoose.Schema({     //// this is the product schema
  productId: { type: String },
  productName: { type: String },
  qtyPerUnit: { type: Number },
  unitPrice: { type: Number },
  unitInStock: { type: Number },
  discontinued: { type: String },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,      //// tio reference the categiry collection in the product collect
    ref: "CategoryData"
  }
});
const ProductData = new mongoose.model("ProductData",productSchema);



const app = express();
const port = process.env.PORT || 500;

app.use(express.json());


//post method for a product
app.post("/create/product", async(req,res)=>{
    try{
        const addingProduct = new ProductData(req.body)
        console.log(req.body)
        const insert = await addingProduct.save();
        res.status(201).res.send(insert);    
    }catch(error){
        res.status(400).send(error);
    }
});



//post method for a category
app.post("/create/category", async(req,res)=>{
    try{
        
    const addingCategory = new CategoryData(req.body)
        console.log(req.body)
        const insert1 = await addingCategory.save(); 
        res.status(201).res.send(insert1);
        
    }catch(error){
        res.status(400).send(error);
    }
});



//get method for all products
app.get("/readAll",async(req,res)=>{
    try{
        const getproduct = await ProductData.find().populate('categoryId');
        res.send(getproduct);
    }catch(error){
        res.status(400).send(error);
    }
});


//get method for particular products
app.get("/read",async(req,res)=>{
    try{
        const getproduct = await ProductData.find(req.query).populate('categoryId'); ///req.query will help to find the desired product
        res.send(getproduct);
    }catch(error){
        res.status(400).send(error);
    }
});


//update method updating a product
app.patch("/update/:id",async(req,res)=>{
    try{
        const _id = req.params.id
        const getproduct = await ProductData.findByIdAndUpdate(_id,req.body,{
            new:true    //// this will show the updated data in the postman console
        })
        res.send(getproduct);
    }catch(error){
        res.status(500).send(error);
    }
});


//deleting a product
app.delete("/delete/:id",async(req,res)=>{
    try{
        const _id = req.params.id
        const getproduct = await ProductData.findByIdAndDelete(_id,req.body).populate('categoryId');
        res.send(getproduct);
    }catch(error){
        res.status(500).send(error);
    }
});



app.listen(port, () =>{
    console.log(`connection is live`);
});