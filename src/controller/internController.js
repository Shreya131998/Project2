const mongoose=require("mongoose")
const collegeModel = require("../model/collegeModel")
const internModel=require("../model/internModel")

const isValidRequestBody=function(requestBody){
    if(Object.keys(requestBody).length===0)return false 
    return true 
}
const createIntern=async function(req,res){
    try{
    const reqbody=req.body 
    if(!isValidRequestBody(reqbody)){
        return res.status(400).send({status:false,message:"Please provide valid credentials"})
    }
    const {name,mobile,email,collegeName}=reqbody
    if(!name?.trim()){
        return res.status(400).send({status:false,message:"Please provide name"})
    }
    if(!email?.trim()){
        return res.status(400).send({status:false,message:"Please provide email"})
    }
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        return res.status(400).send({status:false,message:"Email should be valid"})
    }
    const emailVerifiaction=await collegeModel.findOne({email:email})
    if(emailVerifiaction){
        return res.status(400).send({status:false,message:"Email already registered"})
    }

    if(!(/[0-9]/.test(mobile))){
        return res.status(400).send({status:false,message:"Mobile no should be valid"})

    }
    const isUniqueMobile=await internModel.findOne({mobile:mobile})
    if(isUniqueMobile){
        return res.status(400).send({status:false,message:"Mobile no already registered"})
    
        
    }
    const getCollegeId=await collegeModel.findOne({fullName:collegeName})
    if(!getCollegeId){
        return res.status(404).send({status:false,message:"College not registered"})
    }
    const getId=getCollegeId._id 
    reqbody.collegeId=getId 
    const internDetails=await internModel.create(reqbody)
    return res.status(201).send({status:true,data:internDetails})
}
catch(err){
    return res.status(500).send({status:false,message:err.message})
}

}
module.exports={createIntern}