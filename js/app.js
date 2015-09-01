//mui 初始化
// mui.init();

//通过config接口注入权限验证配置
// wx.config({
// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
// 	appId: '', // 必填，公众号的唯一标识
// 	timestamp: '<?php echo time();?>', // 必填，生成签名的时间戳
// 	nonceStr: '<?php echo $nonceStr;?>', // 必填，生成签名的随机串
// 	signature: '<?php echo $signature;?>', // 必填，签名
// 	jsApiList: [] // 必填，需要使用的JS接口列表
// });
//通过ready接口处理成功验证
// wx.ready(function() {});


angular.module('app',['ngRoute', 'LocalStorageModule']).config(['localStorageServiceProvider', function(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('ls');
}]).config(function($routeProvider) {
	// 路由设置
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'MainCtrl'
		})
		.when('/collect', {
			templateUrl: 'collect.html',
			controller: 'CollectCtrl'
		})
		.when('/order', {
			templateUrl: 'order.html',
			controller: 'OrderCtrl'
		})
		.when('/order_detail', {
			templateUrl: 'order_detail.html',
			controller: 'OrderCtrl'
		})
		.when('/user', {
			templateUrl: 'user.html',
			controller: 'UserCtrl'
		})
		.when('/pay', {
			templateUrl: 'pay.html',
			controller: 'PayCtrl'
		})
		.when('/payfor', {
			templateUrl: 'payfor.html',
			controller: 'PayforCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});


}).factory('GLOBAL', function() {
	// 公共命名空间
	// 本地存储保存
	return {}
}).controller('Header', function($scope ,$location, GLOBAL) {
	// 头部


}).controller('Footer', function($scope ,$location, GLOBAL) {
	// 尾部
	var nav = 'index,collect,order,user'.split(',');

		
	$scope.$on('$locationChangeStart', function(){
		nav.map(function(a,b,c){
			$scope.idx =$location.$$path.indexOf(a) >0 ? b: $scope.idx;
		})
	}); 


	$scope.index = function(idx){
		$location.path('/'+nav[idx]);
	}

}).controller('Subfoot', function($scope ,$location, GLOBAL) {
	// 支付提示窗
	var submit = function(){

	}
	$scope.$on('$locationChangeStart', function(){
		$scope.status =  $location.$$path === '/pay' ? 'submit' : 'normal';
		$scope.status =  $location.$$path === '/payfor' ? 'payfor' : $scope.status;
	}); 

	
	// console.log($location)



}).controller('MainCtrl', function($scope ,$location, GLOBAL) {
	// 主页

	var counts = [].slice.call(document.querySelectorAll('.count'),0);
	document.querySelector(".index").addEventListener('tap', function(e) {
		var target = e.target;
		var input;
		target =  target.className == 'mui-numbox' ? target:target.parentNode.className == 'mui-numbox'? target.parentNode: null;

		counts.map(function(the,idx){
			the.className = the.querySelector('input').value >0? 'count number':'count';
		});



		if(e.target.className == 'mui-numbox-btn-plus'){
			input = e.target.parentNode.querySelector('input');
			input.value = parseInt(input.value || 0) +1;
		}

		if(e.target.className == 'mui-numbox-btn-minus'){
			input = e.target.parentNode.querySelector('input');
			input.value = parseInt(input.value || 0) >0 ? parseInt(input.value || 0) -1 : 0;
		}

		if(!target) return;

		target.parentNode.className = 'count hover';
	});

	

	mui.init();




}).controller('CollectCtrl', function($scope ,$location, GLOBAL) {
// 收藏


}).controller('OrderCtrl', function($scope ,$location, GLOBAL) {
// 订单


}).controller('UserCtrl', function($scope ,$location, GLOBAL) {
// 用户


}).controller('PayCtrl', function($scope ,$location, GLOBAL) {
// 支付

	console.log()


}).controller('PayforCtrl', function($scope ,$location, GLOBAL) {
// 支付确认



	

	document.getElementById("alertBtn").addEventListener('tap', function() {
		mui.confirm('您预订的餐点共 3 份，\n需支付12.30元，\n点击确认跳转支付', 'Hello MUI', ['确定','取消'], function(e) {
			if (e.index == 0) {
				// info.innerText = '你刚确认MUI是个好框架';
			} else {
				// info.innerText = 'MUI没有得到你的认可，继续加油'
			}
		})
	
	});



});









