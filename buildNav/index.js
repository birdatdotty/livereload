// var nav = require('./nav');

json = [
  {"title":"Главная", "href":"/index.html"},
  {"title":"second", "inner":[
    {"title":"Главная2", "href":"/index2.html"},
    {"title":"Главная3", "href":"/index3.html"}
  ]}
]

// q = nav.buildNav(json)

q = require('./nav').buildNav(json)

console.log(q.out())
console.log(q.min())
