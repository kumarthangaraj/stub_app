var app = angular.module('stubApp', ["ngRoute","ui.bootstrap"]);
var userObj = {};
var tranObj = {};
var otpObj = {};
var scope;
var users;
var trans;
var httpMode = "http";
var serverIp = "localhost";
var serverPort = "3001";

app.controller('stubCtrl', ['$scope','$http','$q','$modal',function($scope, $http, $q, $modal) {
	scope = $scope;
	$scope.tranObj = tranObj;
	$scope.users = [];
	$scope.showQrCode = false;
	$scope.addUser = function(){
		userObj.id = $scope.userId;
		userObj.user_id = $scope.userId;
		userObj.emp_id = $scope.empId;
		userObj.bank_id = $scope.bankId;
		userObj.sol_id = $scope.solId;
		userObj.user_name = $scope.userName;
		userObj.user_short_name = $scope.userShortName;
		userObj.mobile_number = $scope.mobileNumber;
		userObj.email_id = $scope.emailId;
		var deferred = $q.defer();
		$http({
			method: "POST",
			url:"api/BankUsers",
			data: userObj,
			headers: {'Content-Type': 'application/json'}

		}).then(function (res) {
			console.log(res);
			users.push(res.data);
			deferred.resolve(res.data);
		}, function(errData){
			console.log(errData);
			deferred.resolve(errData);
		});
	};
	$scope.listUsers = function(){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url:"api/BankUsers",
			headers: {'Content-Type': 'application/json'}
		}).then(function (res) {
			console.log(res);
			$scope.users = res.data;
			deferred.resolve(res.data);
		}, function(errData){
			console.log(errData);
			deferred.resolve(errData);
		});
	};
	$scope.listTrans = function(){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url:"api/TranDtls",
			headers: {'Content-Type': 'application/json'}
		}).then(function (res) {
			console.log(res);
			$scope.trans = res.data;
			deferred.resolve(res.data);
		}, function(errData){
			console.log(errData);
			deferred.resolve(errData);
		});
	};
	$scope.showQRCode = function(obj){
		var deferred = $q.defer();
		$http({
			method: "POST",
			url:"getRandamValue",
			data: {"user_id":obj.user.id},
			headers: {'Content-Type': 'application/json'}
		}).then(function(res){
			var canvas = document.getElementById('canvas');
			QRCode.toCanvas(canvas, res.data.data, function (error) {	
				if (error) console.error(error)
				console.log('success!');
			});
			$scope.showQrCode = true;
			otpObj.qrcode = res.data.data;
			deferred.resolve(res.data);
		}, function(err){
				console.log(err);
				deferred.resolve(err);
		});		
	};
	$scope.addTran = function(){
		var deferred = $q.defer();
		tranObj.tran_date = new Date();
		tranObj.tran_id = "1";
		$http({
			method: "POST",
			url:"api/TranDtls",
			data: tranObj,
			headers: {'Content-Type': 'application/json'}
		}).then(function(res){
			console.log("Tran added successfully");
			userObj = {};
			deferred.resolve(res.data);
		}, function(err){
				console.log(err);
				deferred.resolve(err);
		});
	};
	$scope.updateStatus = function(){
		var deferred = $q.defer();
		var otp = document.getElementById('otp');	
		otpObj.otpValue = otp.value;
		$http({
			method: "POST",
			url:"updateQRCode",
			data: otpObj,
			headers: {'Content-Type': 'application/json'}
		}).then(function(res){
			console.log("Registered successfully. Please click proceed in mobile app");
			alert("Registered successfully. Please click proceed in mobile app");
			otp.value = "";
			userObj = {};
			deferred.resolve(res.data);
		}, function(err){
				console.log(err);
				deferred.resolve(err);
		});
	};
	$scope.listUsers();
	$scope.listTrans();
}]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/add-user", {
    templateUrl : "pages/addUser.htm",
	//templateUrl : "pages/qrCode.htm",
	controller: "stubCtrl",
    controllerAs: "stubApp"
	})
	.when("/add-tran", {
    templateUrl : "pages/tranDtls.htm",
	//templateUrl : "pages/qrCode.htm",
	controller: "stubCtrl",
    controllerAs: "stubApp"
  })
  .when("/list-users", {
    templateUrl : "pages/listUsers.htm",
	resolve : {
		init: function(){
			return function($http,$q){
				
			}
		}
	}
  })
  .when("/list-tran", {
    templateUrl : "pages/listTrans.htm",
	resolve : {
		init: function(){
			return function($http,$q){
				
			}
		}
	}
  })
  .when("/green", {
    templateUrl : "green.htm"
  })
  .when("/blue", {
    templateUrl : "blue.htm"
  });
});