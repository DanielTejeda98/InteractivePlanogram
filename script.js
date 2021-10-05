// Script renders initialization of page
//Get data from existing JSON file

//Get body tag
//Elements to be rendered must be added chonologically
var body = document.getElementById('script-content');

var htmlElements = [];
var rows = 0;
var column = 0;
var jsonData = null;


//Render Functions
//Welcome message
const renderWelcome = () =>
{
  return '<h1>Welcome to Interactive Plannogram JS</h1>' +
  '<p>Thank you for using our software!</p>'
}

//Create form elements
const renderForm = () =>
{
    return'<label for="rowInput">Shelves: </label>' +
      '<input type="number" id="rowInput" name="rowInput">' +
      '<br>' +
      '<br>' +
      '<label for="columnInput">Facings: </label>' +
      '<input type="number" id="columnInput" name="columnInput">' +
      '<br>' +
      '<br>' +
      '<button id="btn_CreatePlan">Create Plan</button>'
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

//Add Render Items to queue
htmlElements.push(renderWelcome());
htmlElements.push(renderForm());

//Function to render elements
const renderPage = () =>
{
    body.innerHTML = htmlElements.join(' ');
    body.innerHTML += '<p>Test Data Input</p><br><input type="file" accept="text/json" onchange="readData(event)">';
  //Event Listeners
  //Check if element exists
  const btn_CreatePlan = document.getElementById("btn_CreatePlan");
  if(btn_CreatePlan != null)
  {
    btn_CreatePlan.addEventListener("click", () =>
    {
      rows = jsonData != null ?  jsonData.plans[0].rows : document.getElementById('rowInput').value;
      column = jsonData != null ? jsonData.plans[0].columns : document.getElementById('columnInput').value;

      //Clear render array
      htmlElements.length = 0;

      //Create new render array
      htmlElements.push(renderWelcome());
      htmlElements.push(renderPlan());

      //Clear html from body
      body.innerHTML = '';
      
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
const receiveData = (data) =>
{
  jsonData = data;
  console.log(jsonData);

  return 0;
}

//Render Call
renderPage();

