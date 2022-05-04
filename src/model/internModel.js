const mongoose=require("mongoose")
const internSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:String,unique:true},
    collegeId:{type:mongoose.Schema.Types.ObjectId,ref:"College"},
    isDeleted:{type:Boolean,default:false}
})
module.exports=mongoose.model("Intern",internSchema)




 