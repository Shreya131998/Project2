const collegeModel=require("../model/collegeModel")
// const isValid=function(value){
//     if(typeof value ===undefined || value===null)return false 
//     if(typeof value===String && value.trim().length===0)return false 
//     return true
// }
const isValidRequestBody=function(requestBody){
    if(Object.keys(requestBody).length===0)return false 
    return true 
}

const createCollege=async function(req,res){
    try{
        const reqbody=req.body 
        if(!isValidRequestBody(reqbody)){
            return res.status(400).send({status:false,message:"Please provide valid credentials"})
        }
        const {name,fullName,logoLink}=reqbody
        if(!name?.trim()){
            return res.status(400).send({status:false,message:"Please provide name"})


        }
        if(!fullName?.trim()){
            return res.status(400).send({status:false,message:"Please provide fullname"})


        }
        if(!logoLink?.trim()){
            return res.status(400).send({status:false,message:"Please provide logoLink"})


        }
        const collegeDetails=await collegeModel.create(reqbody)
        return res.status(201).send({status:true,data:collegeDetails})


    }
    catch(err){
        return res.status(500).send({msg:err.message})
    }
}
module.exports={createCollege}