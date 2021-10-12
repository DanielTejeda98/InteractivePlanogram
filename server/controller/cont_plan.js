//Controller for plan routes
const Plan = require('../models/plan');

//Function to create new plan
exports.newPlan = (req, res, next) =>
{
  console.log("New plan creation called...")
  const name = req.body.name;
  const shelfs = req.body.shelfs;
  const shelfFacings = req.body.shelfFacings;

  const plan = new Plan(
    {
      planName: name,
      shelfs: shelfs,
      shelfFacings: shelfFacings,
      itemList:
      {
        totalItems: 0,
        items: []
      }
    }
  )
  plan.save()
  .then(result =>
    {
      //Resource created
      console.log("New plan created...")
      res.json(result);
      res.status(201);
    })
  .catch(err =>
    {
      console.log("ERROR " + err);
      err.statusCode = 500;
    })
}

exports.getPlanList = (req, res, next) =>
{
  Plan.find({})
  .then(plans =>
    {
      res.json(plans)
      res.status(200);
    })
  .catch(err =>
    {
      console.log("ERROR: " + err);
    })
}

exports.getPlan = (req, res, next) =>
{
  const id = req.params.id;

  Plan.findById(id, (err, plan) =>
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        res.json(plan);
        res.status(200);
      }
    })
}

exports.deletePlan = (req, res, next) =>
{
  const id = req.params.id;

  Plan.findByIdAndRemove(id, (err, plan) =>
  {
    if (err)
    {
      console.log(err);
    }
    else
    {
      res.json(plan);
      res.status(204);
    }
  })
}