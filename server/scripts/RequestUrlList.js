var httpMode = "http";
var serverIp = "localhost";
var serverPort = "3000";
var requestUrls = {
	"tranDtls" : "api/TranDtls"
}

var getRequestUrl = function(eventName){
	var url = httpMode+"://"+serverIp+":"+serverPort+"/"+requestUrls[eventName];
	return url;
}

module.exports = {
    getRequestUrl : getRequestUrl
}