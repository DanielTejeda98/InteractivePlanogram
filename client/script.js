// Script renders initialization of page
//Get data from existing JSON file

//Get body tag
//Elements to be rendered must be added chonologically
var body = document.getElementById('script-content');

var htmlElements = [];
var rows = 0;
var column = 0;
var planListData = [];


//Render Functions
//Welcome message
const renderWelcome = () =>
{
  return '<h1>Welcome to Interactive Plannogram JS</h1>' +
  '<p>Thank you for using our software!</p>'
}

//Create form elements
const renderAppOptions = () =>
{
    return '<div class="options-container">' +
    '<button class="optionCreatePlan" id="btn_OptionCreatePlan">New Plan</button>'+
    '<button class="optionCreateItem" id="btn_OptionCreateItem">Add Item to Inventory</button>'+
    '</div>'
}

//Render plan creation page
const renderPlanCreation = () =>
{
  return '<div class="create_plan_container">' +
  '<label for="planName">Plan name</label>' +
  '<input type="text" id="planName">' +
  '<br>' +
  '<br>' +
  '<label for="planShelfs">Shelfs</label>' +
  '<input type="number" id="planShelfs">' +
  '<br>' +
  '<br>' +
  '<label for="planShelfsFacings">Shelfs Facings</label>' +
  '<input type="number" id="planShelfsFacings">' +
  '<br>' +
  '<br>' +
  '<button class="createPlan" id="btn_CreatePlan">Create New Plan</button>' +
  '<button class="back" id="btn_back">Go Back</button>' +
  '</div>'
}

//Render item adding page
const renderItemCreation = () =>
{
  return '<div class="create_item_container">' +
  '<label for="itemName">Item Name</label>' +
  '<input type="text" id="itemName">' +
  '<br>' +
  '<br>' +
  '<label for="itemSKU">Item SKU</label>' +
  '<input type="number" id="itemsku">' +
  '<br>' +
  '<br>' +
  '<label for="itemCount">Item Count</label>' +
  '<input type="number" id="itemCount">' +
  '<br>' +
  '<br>' +
  '<button class="addItem" id="btn_addItem">Add Item to Inventory</button>' +
  '<button class="back" id="btn_back">Go Back</button>' +
  '</div>'
}

//Render Plan
const renderPlan = () =>
{
  var planElements = [];
  planElements.push(`<h2>Plan Name: ${jsonData.plans[0].planName}</h2>`)
  planElements.push('<div style="display: block; width: 600px; height: auto; border: 1px solid;" class="planWrapper">');
  //Create divs for each row
  let itemIndex = 0;
  for(let i = 0; i < rows; i++)
  {
    planElements.push('<div style="width: 595px; height: 100px; border: 1px solid;" class="planRow">')
    //Create columns inside the rows
    let c = 0;
    while(c < column)
    { 
      //Get item information...
      //
      if(itemIndex < jsonData.plans[0].items.length)
      {
        if(jsonData.plans[0].items[itemIndex].facings > (column - c))
        {
          break;
        }
        else
        {
          var itemName = jsonData.plans[0].items[itemIndex].itemName.toString();
          var itemWidth = ((595 / column) - 5) * jsonData.plans[0].items[itemIndex].facings;
          planElements.push(`<div style="float: left; width: ${itemWidth}px; height: 95px; border: 1px solid;" class="planColumn">`)
          planElements.push(`<button id="itemInformation" value="${jsonData.plans[0].items[itemIndex].itemSKU}" onclick="getItemInfo(this.value)" style="font-size: 0.8rem;">${itemName}</button>`)
          //Close column
          planElements.push('</div>')
          c += jsonData.plans[0].items[itemIndex].facings;
          itemIndex++;
        }
      }
      else
      {
        planElements.push(`<div style="float: left; width: ${itemWidth}px; height: 95px; border: 1px solid;" class="planColumn">`)
        planElements.push(`<button id="itemInformation" onclick="itemInfo(event)" style="font-size: 0.8rem;">NA</button>`)
        //Close column
        planElements.push('</div>')
        c++;
      }
    }
    //Close row
    planElements.push('</div>')
  }
  
  //Close wrapper div
  planElements.push('</div>')

  return planElements.join(' ');
}

//Render Lists of Data from Database
//Plans
const renderActivePlansList = () =>
{
  console.log(planListData)
  var activePlan = [];
  activePlan.push('<h2>Active Planograms</h2>')
  activePlan.push('<table class="planogramTable">' + 
  '<tr>' +
  '<th>Plan Name</th>' +
  '<th>Shelves</th>' +
  '<th>Shelves Facings</th>' +
  '<th>Total Items</th>' +
  '<th>Edit</th>' +
  '</tr>')
  for(let i = 0; i < planListData.length; i++)
  {
    console.log("pushed")
    activePlan.push(
      '<tr>' +
      '<td>' + planListData[i].planName + '</td>' +
      '<td>' + planListData[i].shelfs + '</td>' +
      '<td>' + planListData[i].shelfFacings+ '</td>' +
      '<td>' + planListData[i].itemList.totalItems + '</td>' +
      '<td>' + '<button value="' + planListData[i]._id + '">Edit</button>' + '</td>' +
      '</tr>'  
    )
  }

  activePlan.push('</table>');

  return activePlan.join(" ");
}
//Items

//Add Render Items to queue
htmlElements.push(renderWelcome());
htmlElements.push(renderAppOptions());

//Function to render elements
const renderPage = () =>
{
    body.innerHTML = htmlElements.join(' ');
  //Event Listeners
  //Check if element exists
  //Go Back
  const btn_back = document.getElementById("btn_back");
  if(btn_back != null)
  {
    btn_back.addEventListener("click", () => 
      {
      //Reset the render list
      htmlElements.length = 0;
      //Recreate render list
      htmlElements.push(renderWelcome());
      htmlElements.push(renderAppOptions());

      renderPage();
    })
  }
  //Create Plan
  const btn_OptionCreatePlan = document.getElementById("btn_OptionCreatePlan");
  if(btn_OptionCreatePlan != null)
  {
    btn_OptionCreatePlan.addEventListener("click", () => 
      {
      //Reset the render list
      htmlElements.length = 0;
      //Recreate render list
      htmlElements.push(renderWelcome());
      htmlElements.push(renderPlanCreation());

      renderPage();
    })
  }
  //Create Item
  const btn_OptionCreateItem = document.getElementById("btn_OptionCreateItem");
  if(btn_OptionCreateItem != null)
  {
    btn_OptionCreateItem.addEventListener("click", () => 
      {
      //Reset the render list
      htmlElements.length = 0;
      //Recreate render list
      htmlElements.push(renderWelcome());
      htmlElements.push(renderItemCreation());

      renderPage();
    })
  }
  //POST CREATE PLAN TODO: PASS TO DATA HANDLER SCRIPT
  const btn_CreatePlan = document.getElementById("btn_CreatePlan");
  if(btn_CreatePlan != null)
  {
    btn_CreatePlan.addEventListener("click", () =>
    {
      data =
      {
        name: document.getElementById('planName').value,
        shelfs: document.getElementById('planShelfs').value,
        shelfFacings: document.getElementById('planShelfsFacings').value
      }
      jsonData = JSON.stringify(data);
      alert(jsonData);
      fetch('http://127.0.0.1:8000/plan/newPlan',
      {
        method: 'POST',
        body: jsonData,
        headers:
        {
          'Content-type': 'application/json'
        }
      })
      .then(res =>
        {
          if (res.ok) alert('Data received by server!');
        })
      .catch(err => alert(err))
      
      renderPage();
    })
  }

  //POST CREATE ITEM TODO: PASS TO DATA HANDLER SCRIPT
  const btn_addItem = document.getElementById("btn_addItem");
  if(btn_addItem != null)
  {
    btn_addItem.addEventListener("click", () =>
    {
      data =
      {
        itemName: document.getElementById('itemName').value,
        id: document.getElementById('itemsku').value,
        itemCount: document.getElementById('itemCount').value
      }
      jsonData = JSON.stringify(data);
      alert(jsonData);
      fetch('http://127.0.0.1:8000/item/newItem',
      {
        method: 'POST',
        body: jsonData,
        headers:
        {
          'Content-type': 'application/json'
        }
      })
      .then(res =>
        {
          if (res.ok) alert('Data received by server!');
        })
      .catch(err => alert(err))
      
      renderPage();
    })
  }

}

//Data functions
//Get item data to display
const getItemInfo = (itemSKU) =>
{
  items = jsonData.plans[0].items;
  for(let i = 0; i < items.length; i++)
  {
    if(items[i].itemSKU == itemSKU)
    {
      msg = `Item Name: ${items[i].itemName}\n` +
      `SKU: ${items[i].itemSKU}\n` + 
      `Count: ${items[i].itemCount}\n` +
      `Plan Details: \n` +
      `Plan Name: ${jsonData.plans[0].planName}\n` +
      `Facings: ${items[i].facings}\n`
      return alert(msg)
    }
  }
  alert("No such item found!");
}

//Receive data from dataHandler
const receiveJSONData = (url, method) =>
{
  fetch(url,
    {
      method: method,
      headers: 
      {
        'Content-type': 'application/json'
      }
    })
    .then(res =>
      {
        return res.json()
      })
    .then(jsonData =>
      {
        planListData = jsonData
        htmlElements.push(renderActivePlansList());
        renderPage();
      })
    .catch(err => alert(err))
}
//Receive data from server
receiveJSONData('http://127.0.0.1:8000/plan/planlist', 'GET')
//Render Call
renderPage();

