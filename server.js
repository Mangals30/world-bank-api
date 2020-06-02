const express = require('express')
const app = express()
const ejs = require('ejs')
const os = require('os')
const PORT = 5000 || process.env.PORT
const bodyParser = require('body-parser')
const api = require('./apiCall')

const country_jp = []
const country_ind = []
const country_us = []
const avg_gdp = []
let gdp1 = 0
let gdp2 = 0
let gdp = 0

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.set('view engine','ejs')


app.get('/', (req,res) => {
  api.apiCall(response => {
    res.render('index', {response})
   })
  })

  app.get('/jp', (req,res) => {
    api.apiCall(response => {
      const data = JSON.parse(response)
      for (const element of data[1]) {
        if(element.country.id == 'JP') {
          if(element.indicator.id == 'NY.GDP.MKTP.CD')  {
            country_jp.push({Country : 'Japan', date : element.date, GDP : element.value})
          }
          
          if(element.indicator.id == 'SP.POP.TOTL')  {
           for(const jap of country_jp) {
            if (jap.date == element.date) {
            jap.Population = element.value
            }
           }
          
        }
      }
      }
      res.write(JSON.stringify(country_jp))
      res.end()
      
      
     })
     
    })
   
    app.get('/in', (req,res) => {
      api.apiCall(response => {
        const data = JSON.parse(response)
        for (const element of data[1]) {
          if(element.country.id == 'IN') {
            if(element.indicator.id == 'NY.GDP.MKTP.CD')  {
              country_ind.push({Country : 'India', date : element.date, GDP : element.value})
            }
            
            if(element.indicator.id == 'SP.POP.TOTL')  {
             for(const ind of country_ind) {
              if (ind.date == element.date) {
              ind.Population = element.value
              }
             }
            
          }
        }
        }
        res.write(JSON.stringify(country_ind))
        res.end()
       })
       
      })
  
      app.get('/us', (req,res) => {
        api.apiCall(response => {
          const data = JSON.parse(response)
          for (const element of data[1]) {
            if(element.country.id == 'US') {
              if(element.indicator.id == 'NY.GDP.MKTP.CD')  {
                country_us.push({Country : 'US', date : element.date, GDP : element.value})
              }
              
              if(element.indicator.id == 'SP.POP.TOTL')  {
               for(const us of country_us) {
                if (us.date == element.date) {
                us.Population = element.value
                }
               }
              
            }
          }
          }
          res.write(JSON.stringify(country_us))
          res.end()
         })
         
        })


  app.get('/avg-gdp', (req,res) => {
    api.apiCall(response => {
      const data = JSON.parse(response)
      for (const element of data[1]) {
        if(element.indicator.id == 'NY.GDP.MKTP.CD')  {
          if(element.value) {
            if(element.date == '2018') {
              gdp1 = element.value
            }
            if(element.date == '1970') {
              gdp2 = element.value
              gdp = gdp1-gdp2
              avg_gdp.push ({country : element.country.id, gdpPerCapita : gdp})
            }
            
            
          }
        }
      }
      res.write(JSON.stringify(avg_gdp))
      res.end()
     
    })  
  })
  app.get('/api', (req,res) => {
    api.apiCall(response => {
      res.write(response)
      res.end()
     })
    })  


  app.listen(PORT, () => {
  console.log(`Server is running on PORT, ${PORT}`)
    })    