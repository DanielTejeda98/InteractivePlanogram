//Script handles receiving data from local files

//Read data from data.json
const readData = (e) =>
{
  var input = e.target;

  var reader = new FileReader();
  reader.onload = () =>
  {
    var text = reader.result;
    return receiveData(JSON.parse(text));
  }

  reader.readAsText(input.files[0]);
}