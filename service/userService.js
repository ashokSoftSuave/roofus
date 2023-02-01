const model = require("../model/userModel")



exports.registerUser = async(payload)=>{
  return await model.create({...payload})
}

exports.getUsersList = async()=>{
  return await model.find()
}

exports.removeHouseByUserId = async(houseId, userIds) => {
  const userData = await model.find({_id:{ $in: userIds}});
  userData.forEach(async(user) => {
    user.houses = user.houses.filter(house => !(house.id?.equals(houseId)))
    return await model.updateOne({_id: user._id}, user)
  })
}

exports.removeUser = async(id)=>{
  return await model.findByIdAndDelete(id)
}

exports.editUser = async(data)=>{
  return await model.updateOne({_id: data.id}, {name: data.name})
}

exports.updateStartDates = async(ids, data, houseId)=>{
  return await model.updateMany({_id:{$in:ids}}, {$push: {houses:{
    id: houseId,
    startDate: data.startDate
  }}})
}
