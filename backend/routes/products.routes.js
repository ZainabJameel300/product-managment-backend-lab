const Product = require ('../models/Product')
const router = require('express').Router()
const {standardLimiter} = require('../middleware/rateLimiter')
const validateObjectId = require('../middleware/validateObjectId')


router.post('/',async(req,res)=>{
    try{
        const{title,descreption,category,price,quantity} = req.body
        const createdProduct = await Product.create({
            title:title,
            descreption:descreption,
            category:category,
            price:price,
            quantity:quantity
        })
        res.status(201).json(createdProduct)
    }
    catch(err){
        if(err.name === 'ValidationError'){
            return res.status(400).json({message:err.message})
        }
        console.log(err)

        res.status(500).json({message:'Internal Server Error'})
    }

})

router.get('/',standardLimiter,async(req,res)=>{
    try{
      const allProducts = await Product.find()
      res.status(200).json(allProducts)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.get('/:productId',standardLimiter,validateObjectId,async(req,res)=>{
    try{
      const foundProduct = await Product.findById(req.params.productId)
      if(!foundProduct){
        return res.status(404).json({message:"Product Not Found"})
      }
      res.status(200).json(foundProduct)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.put("/:productId", async (req, res) => {
  try {
    const { title,descreption,category,price,quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
            title:title,
            descreption:descreption,
            category:category,
            price:price,
            quantity:quantity
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete('/:productId', async(req,res)=>{
    try{
     const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
     res.sendStatus(204)
     if(!deletedProduct){
        return res.status(404).json({message:"Product Not Found"})
     }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    }
})


module.exports = router