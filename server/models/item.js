const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    //Item SKU
    _id: {
      type: Number,
      required: true
    },
    itemName: {
      type: String,
      required: true
    },
    itemCount: {
      type: Number,
      required: true
    }
  }
);

module.exports = mongoose.model('items', itemSchema);