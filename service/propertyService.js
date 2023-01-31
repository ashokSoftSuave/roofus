const { propertyModel } = require('../model/propertyModel')


async function createProperty(data) {
    const newProperty = new propertyModel({
        name:data.name,
        address:data.address,
        type:data.type
     })
    return  await newProperty.save()
}

async function updatePropertyById(id,data) {
    return await propertyModel.updateOne({_id:id}, data)
}

async function getPropertyById(id){
    return await propertyModel.findById(id);
}

async function getproperties(id){
    return await propertyModel.find().sort({createdAt: -1});
}

async function deletePropertyById(id){
    return  await propertyModel.findByIdAndDelete(id)
}

module.exports = { createProperty , getPropertyById , deletePropertyById , updatePropertyById , getproperties }
