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
		.when('/main', {
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
		.when('/order_score', {
			templateUrl: 'order_score.html',
			controller: 'OrderCtrl'
		})
		.when('/user', {
			templateUrl: 'user.html',
			controller: 'UserCtrl'
		})
		.when('/user_reset', {
			templateUrl: 'user_reset.html',
			controller: 'UseresetCtrl'
		})
		.when('/user_exchange', {
			templateUrl: 'user_exchange.html',
		})
		.when('/user_notice', {
			templateUrl: 'user_notice.html'
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
			redirectTo: '/main'
		});


}).factory('GLOBAL', function($http) {
	// 公共命名空间
	// 本地存储保存

	var res = {
		header: {
			show: false
		},
		goods:{
			data:[],		//数据地址
			classify:[], 	//首页分类，保存指针
			collect:[],		//收藏功能
			cart:{			//购物车
				price:0,	//价格总额	
				amount:0	//总数量
			},
			Collect:function(item){  //更改收藏

				var the = this;
				item.collect = !item.collect;

				// 添加
				if(item.collect){
					the.collect.unshift(item);
				// 删除
				}else{
					the.collect.map(function(i, idx) {i === item && the.collect.splice(idx, 1)});
				}

				/**** 收藏 数据交互 *****/
				$http({url:'http://localhost:3000/',params:{msg:'{"type":"setCollect","id":"'+item.id+'","value":"'+item.collect+'"}'}});

			},
			count:function(item,type){

				if(type === 'add'){
					this.cart.amount = this.cart.amount +1;
					this.cart.price = (((this.cart.price)*100 + parseFloat(item.price)*100)/100).toFixed(2);
				}else if(type === 'del'){
					this.cart.amount = this.cart.amount -1;
					this.cart.price = (((this.cart.price)*100 - parseFloat(item.price)*100)/100).toFixed(2);
				}

				// console.log(this.cart.price)

				// delete obj.name;

				// // 添加
				// if(item.count == 1;){
				// 	the.collect.unshift(item);
				// // 删除
				// }else if(item.count == 0;){
				// 	the.collect.map(function(i, idx) {i === item && the.collect.splice(idx, 1)});
				// }


			}
		}
	}


	// 取商品列表
	$http({url: 'http://localhost:3000/',params:{msg:'{"type":"getGoods","length":"all"}'}}).success(function(json){

		var tmp = {},goods = res.goods;

		if(json.code != 200){return}

		goods.data = goods.data.concat(json.data).map(function(item){
			if(tmp[item.classify]){
				tmp[item.classify].push(item);
			}else{
				tmp[item.classify] = [item];
				goods.classify.push({name:item.classify});
			}

			item.collect&& goods.collect.push(item);
		});

		goods.classify.map(function(item){
			item.data = tmp[item.name];
		});

	});


	return res;
}).controller('Header', function($scope ,$location, GLOBAL) {

	// 头部
	$scope.header = GLOBAL.header;

	$scope.$on('$locationChangeStart', function(){
		var path = $location.$$path;
		var name = {
			'/user_reset' : '修改信息',
			'/user_exchange' : '积分兑换规则',
			'/order_detail' : '订单详情',
			'/order_score' : '服务评分',
			'/user_notice' : '店铺公告'
		}

		$scope.header.name = name[path] || '';
		$scope.show = name[path];

	}); 


}).controller('Notice', function($scope ,$location, GLOBAL) {
	// 公告


}).controller('Footer', function($scope ,$location, GLOBAL) {
	// 尾部
	var nav = 'main,collect,order,user'.split(',');

		
	$scope.$on('$locationChangeStart', function(){
		nav.map(function(a,b,c){
			$scope.idx =$location.$$path.indexOf(a) >0 ? b: $scope.idx;
		});
	}); 


	$scope.index = function(idx){
		$location.path('/'+nav[idx]);
	}

}).controller('Subfoot', function($scope ,$location, GLOBAL) {
	// 支付提示窗

	$scope.total = GLOBAL.goods.cart;
	var submit = function(){

	}
	$scope.$on('$locationChangeStart', function(){
		var path = $location.$$path;
		var status = {
			'/main' : 'normal',
			'/collect' : 'normal',
			'/pay' : 'submit',
			'/payfor' : 'payfor',
			'/order_detail':'payfor'
		}

		$scope.status = status[path] || '';
		$scope.show = status[path];
		// $scope.show = status[path] && $scope.amount>0;
	}); 


}).controller('MainCtrl', function($scope ,$location, $http, GLOBAL) {
	
	// 分类
	$scope.classify = GLOBAL.goods.classify;


	// 收藏
	$scope.collect = function(item){
		mui.swipeoutClose(document.getElementById(item.id));
		GLOBAL.goods.Collect(item);
	}


	// 数量
	$scope.count = function(type,item){
		var val = parseInt(item.count || 0);
		if(type === 'del' && val <= 0){ return}

		type === 'del' && (item.count = val - 1);
		type === 'add' && (item.count = val + 1);
		GLOBAL.goods.count(item,type);
	}


	// 侧边选择
	$scope.select = function(item){
		$scope.classify.map(function(i){i.select = false;});
		item.select = true;
		$scope.list = item.data;
	}


	// 轮询数据准备
	!(function(){

		if($scope.classify.length>0){
			$scope.select($scope.classify[0]);
		}else{
			setTimeout(arguments.callee,1);
		}
	})();



}).controller('CollectCtrl', function($scope ,$location, GLOBAL) {

	$scope.list = GLOBAL.goods.collect;

	// 收藏
	$scope.collect = function(item){
		mui.swipeoutClose(document.getElementById(item.id));
		GLOBAL.goods.Collect(item);
	}

	// 数量
	$scope.count = function(type,item){
		var val = parseInt(item.count || 0);
		if(type === 'del' && val <= 0){ return}
		type === 'del' && (item.count = val - 1);
		type === 'add' && (item.count = val + 1);
		GLOBAL.goods.count(item,type);
	}



}).controller('OrderCtrl', function($scope ,$location, GLOBAL) {
// 订单


}).controller('UserCtrl', function($scope ,$location, GLOBAL) {
// 用户


}).controller('UseresetCtrl', function($scope ,$location, GLOBAL) {
// 用户信息修改






}).controller('PayCtrl', function($scope ,$location, GLOBAL) {
// 支付



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









