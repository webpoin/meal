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
		cache:{},
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
					this.classify.map(function(i) {i.name === item.classify && (i.count += 1);});

				}else if(type === 'del'){
					this.cart.amount = this.cart.amount -1;
					this.cart.price = (((this.cart.price)*100 - parseFloat(item.price)*100)/100).toFixed(2);
					this.classify.map(function(i) {i.name === item.classify && (i.count -= 1)});
			}

			},
			updata:function(){
				var the = this;
				// 取商品列表
				$http({url: 'http://localhost:3000/',params:{msg:'{"type":"getGoods","length":"all"}'}}).success(function(json){

					var tmp = {};
					if(json.code != 200){return}

					the.data = the.data.concat(json.data);

					the.data.map(function(item){
						if(tmp[item.classify]){
							tmp[item.classify].push(item);
						}else{
							tmp[item.classify] = [item];
							the.classify.push({name:item.classify,count:0});
						}

						item.collect&& the.collect.push(item);
					});

					the.classify.map(function(item){
						item.data = tmp[item.name];
					});

				});
			}
		},
		pay:{
			goods:[],			//商品列表
			// coupon:[],			//优惠列表
			price_coupon:0,		//优惠总价
			price_total:0,		//最终支付价格
			price_goods:0,		//商品总价
			count_coupon:0,		//优惠数量
			count_total:0,		//全部数量(并没什么软用)
			count_goods:0,		//商品数量
			mark_time:'立即配送',	//配送时间
			mark_info:'',		//备注信息
			user_name:'',		//联系人姓名
			user_call:'',		//联系电话
			user_addr:'',		//联系地址
			payby:'微信支付',		//支付方式
			getGoods:function(){
				// 取所有选中的商品
				var tmp = [],price = 0;count=0;

				if(this.goods.length ===0 ){
					res.goods.data.map(function(item,idx){
						item.count && item.count>0 && tmp.push(item);
						// console.log(item.count)
						// price = ((100*price+ 100*parseFloat(item.price))/100).toFixed(2);
						// count += item.count;
					});
					this.goods = this.goods.concat(tmp);
				}

				return this.goods;
				// this.price_goods = price;
				// this.count_goods = count;

			},
			getCoupon:function(){
				var the = this;

				if(!the.coupon){
					// 取所有可用优惠信息
					$http({url: 'http://localhost:3000/',params:{msg:'{"type":"getCoupon"}'}}).success(function(json){
						if(json.code != 200){return}
						the.coupon = json.data;
					});
				}
				return the.coupon;

			},
			count:function(){
				// 数值计算
			}
		},
		order:{
			data:[],			//数据
			classify:[],		//分类
			detail:{},			//详情
			getDetail:function(item){
				var the = this;
				// 取订单详情
				$http({url: 'http://localhost:3000/',params:{msg:'{"type":"getOrderDetail","id":"'+item.id+'"}'}}).success(function(json){
					if(json.code != 200){return}
					the.detail = json.data;
				})
			},
			updata:function(){	//更新
				var the = this;
				// 取订单列表
				$http({url: 'http://localhost:3000/',params:{msg:'{"type":"getOrder","length":"all"}'}}).success(function(json){
					var tmp = {};
					if(json.code != 200){return}

					the.data = the.data.concat(json.data);
					the.data.map(function(item){
						tmp[item.classify] = tmp[item.classify] || [];
						tmp[item.classify].push(item);
					});

					the.classify[0] = {name:'未付款',total:tmp[0].length,data:tmp[0]}
					the.classify[1] = {name:'未付款',total:tmp[1].length,data:tmp[1]}
					the.classify[2] = {name:'未付款',total:tmp[2].length,data:tmp[2]}

				});
			},
			payfor:function(item){

				// 跳转支付
				// ？？？？

			},
			setScore :function(item){
				var the = this;
				// 设置评级
				$http({url:'http://localhost:3000/',params:{msg:'{"type":"getScore","id":"'+item.id+'","value":"'+item.score+'"}'}}).success(function(json){
					if(json.code != 200){return}
					// 更新订单
					the.updata();
				})

			}
		}
	}



	// 初始化更新一次商品
	res.goods.updata();



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


}).controller('Notice', function($scope ,$location,$timeout, GLOBAL) {
	// 公告
	$scope.show = true;
	$timeout(function(){$scope.show = false;},5000);

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


}).controller('OrderCtrl', function($scope ,$http,$location,$timeout, GLOBAL) {

	// 订单
	GLOBAL.order.updata();
	$scope.classify = GLOBAL.order.classify;
	$scope.detail = GLOBAL.order.detail;
	$scope.cache = GLOBAL.cache;

	// 点击详情
	$scope.getDetail = function(item){
		GLOBAL.order.getDetail(item);
		$location.path('/order_detail');
	}

	// 去付款
	$scope.confirm =  function(item) {
		confirm('您预订的餐点共 '+item.amount+' 份，\n需支付'+item.price+'元，\n点击确认跳转支付') && GLOBAL.order.payfor(item);
	}

	// 催一下
	$scope.urge = function(item){
		item.urge = true;

		$timeout(function(){
			item.urge = false;
		},10000);	
	}

	// 跳转到评价页面
	$scope.toScore = function(item){
		GLOBAL.cache = item;
		$location.path('/order_score');
	}

	// 点击星形交互
	$scope.changeScore = function(idx){
		$scope.cache.socre = idx;
	}

	// 确定修改评价
	$scope.setScore = function(){
		GLOBAL.order.setScore($scope.cache);
		$location.path('/order');
	}


}).controller('UserCtrl', function($scope ,$location, GLOBAL) {
// 用户


}).controller('UseresetCtrl', function($scope ,$location, GLOBAL) {
// 用户信息修改


}).controller('PayCtrl', function($scope ,$location, GLOBAL) {
	
	// 支付
	// GLOBAL.pay.
	$scope.goods = GLOBAL.pay.getGoods();
	$scope.coupon = GLOBAL.pay.getCoupon();
	

	// $scope



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









