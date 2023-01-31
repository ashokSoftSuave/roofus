const model = require("../model/userModel")



exports.registerUser = async(payload)=>{
  return await model.create({...payload})
}

exports.getUsersList = async()=>{
  return await model.find()
}


exports.removeUser = async(id)=>{
  return await model.findByIdAndDelete(id)
}

exports.updateStartDates = async(ids, data, houseId)=>{
  return await model.updateMany({_id:{$in:ids}}, {houses:{
    id: houseId,
    startDate: data.startDate
  }})
}
