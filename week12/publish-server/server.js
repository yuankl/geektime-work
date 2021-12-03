let http = require("http");
let https = require("https");
let unzipper = require("unzipper");
let querystring = require("querystring");
//2. auth route: receive code , use code + client_id + client_secret get token 
// 
function auth(request, response){
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    // console.log(query);
    getToken(query.code,function(info){
        // console.log(info);
        // response.write(JSON.stringify(info));
        response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`);
        response.end();
    });
}
function getToken(code,callback){
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.a145a511aeb65d6d&client_secret=1cb6f32994504bf6df8b23adca27a9c60d3a03e1`,
        port: 443,
        method: "POST",
    },function(response){
        let body="";
        response.on("data", chunk=>{
            body += (chunk.toString());
        });
        response.on("end", chunk=>{
            callback(querystring.parse(body));
        });
    });
    request.end();
}
//4. publish route: use token get user information, receive publish

function publish(request, response){

    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);

    getUser(query.token,info=>{
        if(info.login=='yuan'){
            // request.pipe(outFile);
            request.pipe(unzipper.Extract({ path: '../server/public/' }));
            request.on("end",function(){
                response.end("success");
            })
        }
    });
}
function getUser(token, callback){
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        port: 443,
        method: "GET",
        headers:{
            Authorization: `token ${token}`,
            "User-Agent": 'toy-publish',
        }
    },function(response){
        let body="";
        response.on("data", chunk=>{
            body += (chunk.toString());
        });
        response.on("end", chunk=>{
            callback(JSON.parse(body));
        });
    });
    request.end();
}
http.createServer(function(request, response){
    console.log("request");
    if(request.url.match(/^\/auth\?/)){
        return auth(request, response);
    }

    if(request.url.match(/^\/publish\?/)){
        return publish(request, response);
    }
    // let outFile = fs.createWriteStream("../server/public/temp.zip");
    // request.pipe(outFile);
    // request.pipe(unzipper.Extract({ path: '../server/public/' }));
}).listen(8082);