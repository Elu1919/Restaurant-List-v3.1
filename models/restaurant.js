const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String },
  rating: { type: String, required: true },
  description: { type: String },
})

// 第一個參數，是將為模型創建的集合的單數名稱（Mongoose 將為上面的 SomeModel 模型，創建數據庫集合），第二個參數，是您要在創建模型時使用的綱要 Schema。
module.exports = mongoose.model('Restaurant', restaurantSchema)