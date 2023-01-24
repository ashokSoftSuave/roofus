const model = require("../model/adminUserModel")

exports.postAdmin = async(payload)=>{
  return await model.create({...payload})
}
