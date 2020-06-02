const http = require('http')
const url = 'http://api.worldbank.org/v2/country/us;jp;ind/indicator/NY.GDP.MKTP.CD;SP.POP.TOTL?per_page=500&source=2&format=json'

const api = (callback) => {
  http.get(url,(res) => {
  let data = ''
  res.on('data',(chunk) => {
    data += chunk 
  })
  res.on('end',()=>{
    return callback(data)
  })
  }).on("error",(err) => {
    console.log("error", err.message)
  })
}
module.exports.apiCall = api