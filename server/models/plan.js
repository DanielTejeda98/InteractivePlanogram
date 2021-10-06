const mongoose = require('mongoose');

const itemSchema = require('../models/item').schema;

const planSchema = new mongoose.Schema(
  {
    //Item SKU
    planName: {
      type: String,
      required: true
    },
    //Rows
    shelfs: {
      type: Number,
      required: true
    },
    //Columns
    shelfFacings: {
      type: Number,
      required: true
    },
    //List of items in the planogram
    itemList: {
      totalItems: {
        type: Number
      },
      items: [{itemSchema, facings: Number}]
    }
  }
);

module.exports = mongoose.model('plans', planSchema);