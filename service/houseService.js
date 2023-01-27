
const model = require("../model/houseModel")

exports.addHouse = async (payload) => {
  return await model.create({ ...payload })
}

exports.getHouseList = async () => {
  return await model.find()
}


exports.bookHouse = async (id, payload) => {
  return await model.updateOne({_id: id}, payload)
}

exports.removeHouse = async(id)=>{
  return await model.findByIdAndDelete(id)
}
