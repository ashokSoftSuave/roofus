
const model = require("../model/houseModel")

exports.addHouse = async (payload) => {
  return await model.create({ ...payload })
}

exports.getHouseList = async () => {
  return await model.find().sort({createdAt: -1}).populate("propertyId").populate("userId")
}


exports.bookHouse = async (id, payload) => {
  return await model.updateOne({_id: id}, payload)
}

exports.removeHouse = async(id)=>{
  return await model.findByIdAndDelete(id)
}
