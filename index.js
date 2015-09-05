var app = require('express')();



app.get('/*', function(req, res) {

	res.header("Access-Control-Allow-Origin", "*");

	var ask = req.query.msg || '';
		ask = JSON.parse(ask);

	// 返回默认结果
	var back = {
		code: 404, 		//返回状态
		type: 'unknown',//类型
		discript:'',	//描述
		data: [],		//返回结果
	};

	switch (ask.type) {

		// 全部商品
		case 'getGoods':
			back.code =  200;
			back.type = 'goods';
			back.data = [
				{
					id:1234578765432,
					name:'肉香满溢比萨', 	//名称
					discript:'牛肉味', 	//描述
					price:'58.00',		//价格
					collect:true,		//收藏
					classify:'店长推荐' 	//类别
				},
				{id:12345679876500,name:'肉香满溢比萨',discript:'牛肉味1',price:'51.03',collect:true,classify:'店长推荐'},
				{id:12345679876501,name:'肉香满溢比萨',discript:'牛肉味2',price:'52.03',collect:false,classify:'店长推荐'},
				{id:12345679876503,name:'肉香满溢比萨',discript:'牛肉味3',price:'53.03',collect:true,classify:'厨具'},
				{id:12345679876504,name:'肉香满溢比萨',discript:'牛肉味4',price:'54.03',collect:true,classify:'厨具'},
				{id:12345679876505,name:'肉香满溢比萨',discript:'牛肉味5',price:'55.03',collect:false,classify:'店长推荐'},
				{id:12345679876506,name:'肉香满溢比萨',discript:'牛肉味6',price:'56.03',collect:false,classify:'店长推荐'},
				{id:12345679876507,name:'肉香满溢比萨',discript:'牛肉味7',price:'57.03',collect:false,classify:'店长推荐'},
				{id:12345679876508,name:'肉香满溢比萨',discript:'牛肉味8',price:'58.03',collect:true,classify:'家居用品'},
				{id:12345679876509,name:'肉香满溢比萨',discript:'牛肉味9',price:'59.03',collect:false,classify:'店长推荐'},
				{id:12345679876510,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:false,classify:'零食'},
				{id:12345679876511,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:true,classify:'零食'},
				{id:12345679876512,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:false,classify:'店长推荐'},
				{id:12345679876513,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:false,classify:'生鲜特卖'},
				{id:12345679876514,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:true,classify:'店长推荐'},
				{id:12345679876515,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:false,classify:'店长推荐'},
				{id:12345679876516,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:false,classify:'厨具'},
				{id:12345679876517,name:'肉香满溢比萨',discript:'牛肉味',price:'58.03',collect:true,classify:'店长推荐'},
			]
			break;

		// 获取订单列表
		case 'getOrder':
			back.code = 200;
			back.type = 'getOrder';
			back.data = [
				{
					id: 679876500,				//订单id
					name: '肉香满溢比萨，牛肉面',	//订单名称
					amount: 3,					//订单数量
					price: '51.03',				//订单总价
					status: 0 ,					//订单分类 0：未付款，1：待发货，2：已完成
					socre:null					//评分，当有评分时，显示评分数0-5，当无评分时，显示null
				},
				{id:679876501,name:'肉香满溢比萨，牛肉面',amount:3,price:'52.03',classify:2,socre:1},
				{id:679876503,name:'肉香满溢比萨，牛肉面',amount:3,price:'53.03',classify:2,socre:null},
				{id:679876504,name:'肉香满溢比萨，牛肉面',amount:3,price:'54.03',classify:1,socre:null},
				{id:679876505,name:'肉香满溢比萨，牛肉面',amount:3,price:'55.03',classify:2,socre:4},
				{id:679876506,name:'肉香满溢比萨，牛肉面',amount:3,price:'56.03',classify:2,socre:4},
				{id:679876507,name:'肉香满溢比萨，牛肉面',amount:3,price:'57.03',classify:1,socre:null},
				{id:679876508,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:2,socre:2},
				{id:679876509,name:'肉香满溢比萨，牛肉面',amount:3,price:'59.03',classify:1,socre:null},
				{id:679876510,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:2,socre:4},
				{id:679876511,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:0,socre:null},
				{id:679876512,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:1,socre:null},
				{id:679876513,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:2,socre:null},
				{id:679876514,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:1,socre:null},
				{id:679876515,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:2,socre:3},
				{id:679876516,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:2,socre:4},
				{id:679876517,name:'肉香满溢比萨，牛肉面',amount:3,price:'58.03',classify:2,socre:5},
			];
			break;

		// 获取订单详情
		case 'getOrderDetail':
			back.code = 200;
			back.type = 'getOrderDetail';
			back.data = {
				total_price:42.20, 	//实际支付
				goods_price:52.20,	//商品总价
				goods_amount:10,	//商品数量
				coupon_price:13,	//优惠价格
				user_name:'jiaojiao',//姓名
				user_phone:'15012460225', 		//电话
				user_addr:'广东省深圳市宝安区上合路口', //地址
				time_claim:'立即配送',//配送时间
				remark:'不加酱油',	//配送备注
				pay_type: '微信支付',	//支付方式
				goods:[				// 商品
					{id:12345679876511,name:'肉香满溢比萨',price:'58.01',amount:2},
					{id:12345679876512,name:'肉香满溢比萨',price:'58.02',amount:2},
					{id:12345679876515,name:'肉香满溢比萨',price:'58.05',amount:2},
				],
				coupon:[			// 优惠卷
					{id:12345654321236,name:'[5元]优惠券',price:'5.00',type:0},
					{id:12345654321237,name:'积分抵扣现金',price:'8.00',type:1}
				],
				step:[				//流程
					{type:0,time:'2015.09.01 22:44',msg:'订单编号：14412050762218'}, 		//订单提交成功
					{type:1,time:'2015.09.01 22:44',msg:'请在提交订单后15分钟内完成支付'}, 	//未支付
					{type:2,time:'2015.09.01 22:44',msg:'15分钟内未支付已取消'},			//取消
				]

			};
			break;

		// 可用优惠
		case 'getCoupon':
			back.code = 200;
			back.type = 'getCoupon';
			back.data = [
				{id:12345654321236,name:'[5元]优惠券',price:'5.00',type:0},
				{id:12345654321237,name:'积分抵扣现金',price:'8.00',type:1}
			];
			break;


		// 设置收藏功能
		case 'setCollect':
			back.code = 200;
			back.type = 'setCollect';
			back.data = [];
			break;

		// 设置评级
		case 'setScore':
			back.code = 200;
			back.type = 'setScore';
			back.data = [];
			break;
	}

  	res.send(JSON.stringify(back));
});


app.listen(3000);
