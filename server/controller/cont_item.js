//Controller for item routes
const Item = require('../models/item');

//Function handles creating a new item
exports.newItem = (req, res, next) =>
{
  const id = req.body.id;
  const name = req.body.itemName;
  const count = req.body.itemCount;

  const item = new Item
  (
    {
      _id: id,
      itemName: name,
      itemCount: count
    }
  )
  item.save()
  .then(res =>
    {
      //Resource created
      res.status(201);
    })
  .catch(err =>
    {
      console.log("ERROR: " + err);
      err.statusCode = 500;
      next();
    })
}

exports.getItem = (res, req, next) =>
{
  
}