const Category = require("../database/models/Category")


exports.addCategory = async (req, res) => {
    const {name , description} = req.body;


    const url = "http://localhost:4002/uploads/"

    if(!name||!description){
        res.status(400).json({message:'Please provide all the required details' , status:"FAILED"});
    }

    if (!req.file) {
        res.status(400).send({ message: 'Please upload a thumbnail for category.' });
    }

    const imgUrl = url+req.file.originalname;


    const newCategory = await Category({
        name,
        description,
        thumbnail:imgUrl
    })

    newCategory.save().then(result=>{
        res.status(201).json({message:'New Category created' , status:'OK'})
    })
    .catch(err=>{
        res.status(500).json({message:'Something went wrong ' + err , status:'FAILED'})
    })

}

exports.getCategories=async(req,res)=>{
    const categories = await Category.find({})
    if(categories){
        res.status(200).json({categories})
    }else{
        res.status(404).json({message:"Not found any categories",status:'FAILED'})

    }

}