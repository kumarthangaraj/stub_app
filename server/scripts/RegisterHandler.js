var loopback = require('loopback');
var regUser = loopback.findModel("RegUser");
var qrmap = loopback.findModel("qrmap");
//var BankUser = loopback.findModel("BankUser");

var validateRegister = function(req,res,next){
	console.log("inside validateRegister");
	if(req.body.user_id === undefined)
		return errorResponse(res,"Invalid Request");
	qrmap.find({where: {user_id: req.body.user_id,otp_handle: req.body.otpHandle,status: "R"}}, req.callContext, function(err,data){
		if(err)
			return errorResponse(res,"Failed to get record");
		data[0].__data.status = "C";
		qrmap.upsert(data[0].__data,req.callContext, function(err,data){
			if(err)
				return errorResponse(res,"Failed while updating the QR record");
			var currentTime = new Date();
			var regData = {"user_id":req.body.user_id,"reg_time":currentTime,"otp_handle":req.body.otp_handle,"status":"A"};
			regUser.create(regData,req.callContext,function(err,data){
				if(err)
					return errorResponse(res, "Registeration Failed");
				return successResponse(res,data);
			})
		});
	});
}

function errorResponse(res, message){
	var responseObject = {};
	responseObject.status = "Failed";
	responseObject.message = message;
	res.writeHead(300, { "Content-Type": "application/json" });
	res.end(JSON.stringify(responseObject));
	return;
}

function successResponse(res,data){
	var responseObject = {};
	responseObject.status = "SUCCESS";
	responseObject.data = data;
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify(responseObject));
	return;
}

module.exports = {
	validateRegister : validateRegister
};