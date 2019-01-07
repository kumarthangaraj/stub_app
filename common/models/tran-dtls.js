'use strict';

var request = require('request');
var base64 = require('base-64');
var utf8 = require('utf8');
var UrlList = require('./../../server/scripts/RequestUrlList.js');
var username = "CORE"
var password = "CORE@123";

module.exports = function(Trandtls) {
    Trandtls.afterRemote('create',function(context,modelInstance,next){
        var requestUrl = UrlList.getRequestUrl("tranDtls");
        var bytes = utf8.encode(username + ":" + password);   
        request({url:requestUrl,
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Basic ' + base64.encode(bytes),
                  },                
                json:modelInstance.__data},function(err,response,body){
            if(err){
                console.log("error occurred "+err);
            }
            next();
        });
    });
};
