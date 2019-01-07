'use strict';
var QRAuth = require("../scripts/QRAuth.js");
var RegisterHandler = require("../scripts/RegisterHandler.js");
var bodyParser = require('body-parser');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  
  router.get('/', server.loopback.status());
  router.post('/getRandamValue',function(req,res,next){
	 QRAuth.getRandomValue(req,res,next);	  
  });
  router.post('/validateQRCode',function(req,res,next){
    QRAuth.validateQRCode(req,res,next);
  });
  router.post('/updateQRCode',function(req,res,next){
    QRAuth.updateQRCode(req,res,next);
  });
  router.post('/validateRegister',function(req,res,next){
    RegisterHandler.validateRegister(req,res,next);
  });
  router.post('/validateQRCode1',function(req,res,next){
    var response = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <FIXML xmlns=\"http://www.finacle.com/fixml\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.finacle.com/fixml executeFinacleScript.xsd\"> <Header> <ResponseHeader> <RequestMessageKey> <RequestUUID>Req_6545934632057</RequestUUID> <ServiceRequestId>executeFinacleScript</ServiceRequestId> <ServiceRequestVersion>10.2</ServiceRequestVersion> <ChannelId>COR</ChannelId> </RequestMessageKey> <ResponseMessageInfo> <BankId>01</BankId> <TimeZone>GMT+05:30</TimeZone> <MessageDateTime>2018-12-28T15:10:37.317</MessageDateTime> </ResponseMessageInfo> <UBUSTransaction> <Id/> <Status/> </UBUSTransaction> <HostTransaction> <Id/> <Status>SUCCESS</Status> </HostTransaction> <HostParentTransaction> <Id/> <Status/> </HostParentTransaction> <CustomInfo/> </ResponseHeader> </Header> <Body> <executeFinacleScriptResponse> <ExecuteFinacleScriptOutputVO/> <executeFinacleScript_CustomData> <userId>FIN12</userId><userName>DBA</userName><workClass>999</workClass><roleId>RE_MANAGER</roleId><otpCode>93178003</otpCode> </executeFinacleScript_CustomData> </executeFinacleScriptResponse> </Body> </FIXML>";
    res.writeHead(200, { "Content-Type": "application/xml" });
    res.end(response);
  });
  server.use(bodyParser.json()); 
  server.use(router);
};
