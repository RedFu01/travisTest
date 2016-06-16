import Promise from 'bluebird';

/* Define all routes used in the application*/
var baseUrl = 'https://www.happycar.de/'
var urls ={
  genodesUrl : baseUrl+'geo-nodes',
  stationsUrl: baseUrl+'stations'
}

/* function to serialize a JS object to a querystring */
function serialize(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

/* default function to perform an ajax get request */
async function ajaxGetRequest(url,data) {
  return fetch(url+'?'+serialize(data), {
    method: 'GET',
  })
}

/* default function to perform an ajax post request */
async function ajaxPostRequest(url,data) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/* -> All the custom ajax functions */
export async function getGeonodes(searchString){
  return ajaxGetRequest(urls.genodesUrl,{searchString:searchString,onlyAirports:0}).then(
    (response)=>
      {
        return response.json();
      }
  );
}
