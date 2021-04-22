const app = require("electron").remote;
//console.log("Hello");
const cheerio = require("cheerio");
const request = require("axios");
const {writeFile} = require("fs");
var th;
//Points Table
request.get("https://www.iplt20.com/points-table/2021")
.then((res) => {
    
var $ = cheerio.load(res.data);
//Table Heading
// var table = $("table > tbody > tr > th").each((i,item) => {
//     th[i] = $(item).html();
//     console.log(i);
//     console.log($(item).html());
//     });
     /*Table Heading */
// th = $(".standings-table__header").html();
// document.getElementById("thead").innerHTML =th;

// var table = $("table > tbody > tr").each((i,item) => {
//     //th[i] = $(item).html();
//     //console.log(i);
//     console.log($(item).html());
//     });
var tbody1 = $("table > tbody").html();
return tbody1;
}).then((tbody1) => {
    sessionStorage.setItem("tbody",tbody1);
    document.getElementById("table").innerHTML =tbody1;
});

//Live
request.get("https://www.iplt20.com/").
then((res) => {
    var $ = cheerio.load(res.data);
    var listSRC = [];
    var listSRCId = [];

    //Orange Cap
    var orangeCapData = $("div[class='leaderStat orange']").html();
    $(".leaderBackdrop").parent().parent().parent().find('li').each(function (index, element) {
        listSRC.push($(element).find('a > div > div > img').attr('src'));
        listSRCId.push($(element).find('a > div > div > img').attr('data-player-id'));
      });
    //console.log(listSRC);
    //console.log(listSRCId);
    //console.log(orangeCapData);
    sessionStorage.setItem("liveTable",listSRC[0]);
    sessionStorage.setItem("liveTableID",listSRCId[0]);
    sessionStorage.setItem("orangeCapData",orangeCapData);

    //Purple Cap
    var purpleCapData = $("div[class='leaderStat purple']").html();
    //console.log(purpleCapData);
    sessionStorage.setItem("purpleCapHolder",listSRC[1]);
    sessionStorage.setItem("purpleCapHolder1",listSRCId[1]);
    sessionStorage.setItem("purpleCapData",purpleCapData);
});

// function getTime()
// {
//     var d = new Date();
//     var seconds = d.getSeconds();
//     sessionStorage.setItem("second",seconds);
//     console.log(seconds);
// }
//setInterval(getTime, 1000);
//Recent Matches
request.get("https://www.iplt20.com/matches/results/men/2020").
then((res) => {
    var $ = cheerio.load(res.data);
    var res1 = $(".js-list").children('div').html();
    console.log(res1);
    sessionStorage.setItem("recent", res1);
    //var recentScore = $(".js-list").children('div').next().html();
    //sessionStorage.setItem("recentScore",recentScore);
    var recentScore1 = $(".js-list").children('div').next().html();
    //console.log(recentScore1);
    sessionStorage.setItem("recentScore1",recentScore1);
    var recentScore2 = $(".js-list").children('div').next().next().next().html();
    //console.log(recentScore2);
    sessionStorage.setItem("recentScore2",recentScore2);
    var recentScore3 = $(".js-list").children('div').next().next().next().next().next().html();
    //console.log(recentScore3);
    sessionStorage.setItem("recentScore3",recentScore3);
    var recentScore4 = $(".js-list").children('div').next().next().next().next().next().next().next().html();
    //console.log(recentScore4);
    sessionStorage.setItem("recentScore4",recentScore4);
});
//Live Scores
function getLiveScore(){
request.get("https://www.cricbuzz.com/cricket-match/live-scores").
then((res) =>{
    var $ = cheerio.load(res.data);
    var liveScoreTable = $("div[class='cb-mtch-lst cb-col cb-col-100 cb-tms-itm']").html();
    //console.log(liveScoreTable);
    return liveScoreTable;
}).then((res1) =>{
    sessionStorage.setItem("liveScoreTable",res1);
});
}
setInterval(getLiveScore,1000);

// request.get("https://www.iplt20.com/match/2020/23?tab=scorecard").
// then((res) =>{
//     var $ = cheerio.load(res.data);
//     var live = $("div[class='matchCenter']").html();
    
//     return live;
// }).then((res1) =>{
//     console.log(res1);
//     sessionStorage.setItem("live",res1);
// });