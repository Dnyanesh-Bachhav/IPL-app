const app = require("electron").remote;
const cheerio = require("cheerio");
const request = require("axios");
const {writeFile} = require("fs");
console.log("Hello");
request.get("hhttps://www.iplt20.com/points-table/men/2021")
.then((res) => {
    
var $ = cheerio.load(res.data);
//Table Heading
var table = $("table > tbody > tr > th").each((i,item) => {
console.log($(item).text());
document.getElementById("tbody").innerHTML = '<th>'+$(item).text()+'</th>'
});
var table = $("table > tbody > tr").each((i,item) => {
    console.log($(item).text());
});
//console.log(tableHeading);
});    