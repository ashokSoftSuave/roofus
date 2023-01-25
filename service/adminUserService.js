const model = require("../model/adminUserModel")

exports.postAdmin = async(payload)=>{
  return await model.create({...payload})
}

exports.findAdmin = async(payload)=>{
  return await model.find(payload)
}
