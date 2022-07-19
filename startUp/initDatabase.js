const Profession = require("../models/Profession.js")
const Quality = require("../models/Quality.js")
const professionsMock = require("../mock/professions.json")
const qualitiesMock = require("../mock/qualities.json")

module.exports = async () => {
  const professions = await Profession.find()
  if (professions.length !== professionsMock.length) {
    await createInitialEntity(Profession, professionsMock)
  }

  const quality = await Quality.find()
  if (quality.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        console.log(e)
      }
    })
  )
}
