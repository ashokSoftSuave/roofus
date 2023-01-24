const model = require("../model/userModel")



exports.registerUser = async(payload)=>{
  return await model.create({...payload})
}

exports.getUsersList = async()=>{
  return await model.find()
}
