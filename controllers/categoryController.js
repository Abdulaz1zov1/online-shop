const Category=require('../models/Category')
const Products=require('../models/Products')

const categoryControllers={
    getCategorys:async (req,res)=>{
       try{
           const categoires= await Category.find()
           res.json(categoires)

       }catch(err){
        return res.status(500).json({msg: err.message})
       }
    },
    createCategory: async (req,res)=>{
        try{
            //If user have role=1 ---->admin
            // only admin can create , delete and update category
            const {name}=req.body;
            const category= await Category.findOne({name})
            if(category) return res.status(400).json({msg: 'This category already exist.'})


            const newCategory=new Category({name})

            await newCategory.save()
            res.json({msg:'Create ad category'})

        }catch(err){
         return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req,res)=>{
        try{
            //If user have role=1 ---->admin
            // only admin can create , delete and update category
            const products=await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete all products width a relationship."
            })
            const category= await Category.findByIdAndDelete(req.params.id)
            res.json({msg:'Deleted a Category'})

        }catch(err){
         return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req,res)=>{
        try{
            //If user have role=1 ---->admin
            // only admin can create , delete and update category
            const {name}=req.body;
            const category= await Category.findOneAndUpdate({_id:req.params.id}, {name})
            res.json({msg:'Update a category'})

        }catch(err){
         return res.status(500).json({msg: err.message})
        }
    }
}

module.exports= categoryControllers;