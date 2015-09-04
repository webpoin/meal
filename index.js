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

		// 设置收藏功能
		case 'setCollect':
			back.code = 200;
			back.type = 'setCollect';
			back.data = [];
			break;
	}

  	res.send(JSON.stringify(back));
});


app.listen(3000);
