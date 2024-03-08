import {choseUrl} from '../utils/choseUrl.js'
// 通常可以吧 baseUrl 单独放在一个 js 文件了
// const baseUrl = 'http://1.14.248.242/api/'//生产

const baseUrl = 'https://easytry.cn/api/' //正式
// const baseUrl=choseUrl();自动判断环境选择url
// const baseUrl = 'https://www.easytrytech.com/api/' //测试
const request = (options = {}) => {
	// 在这里可以对请求头进行一些设置 
	options.header = {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization":'Bearer  '+uni.getStorageSync('token') || '',
	}
	return new Promise((resolve, reject) => {
		// uni.showLoading({
		// 	title: '加载中',
		// 	mask: true
		// })
		uni.request({
			url: baseUrl + options.url || '',
			method: options.type || 'GET',
			data: options.data || {},	
			header: options.header || {},
			success: (res) => {
				// uni.hideLoading();
				if (res.data.code == 0) {
						resolve(res.data);
				} else if (res.data.code == -1) {
					uni.showToast({
						title:res.data.msg,
						icon:'none',
						duration:2500
					})
					reject(res.data.msg);
				} else if (res.data.code == 1) {
					uni.showToast({
						title:'尚未登录或登录超时,重新重录.',
						icon:'none',
						duration:1500
					})
					uni.clearStorageSync();
					reject(1);
					setTimeout(function(){
						uni.redirectTo({
							url:'/pages/index/index?id=4'
						})
					},1500)
				} else {
					uni.showToast({
						title: '网络异常,稍后再试' ,
						duration: 1500,
						icon: "none"
					})
					reject(res.data.msg);
					return;
				}
				
				// console.log(res.data);
			},
			fail: (err) => {
				// uni.hideLoading();
				reject(err);
				// console.log(err);
			},
			complete: () => {
				// console.log('请求完成');
				// uni.hideLoading();
			}
		})
	});
}

const get = (url, data, options = {}) => {
	options.type = 'GET';
	options.data = data;
	options.url = url;
	return request(options)
}

const post = (url, data, options = {}) => {
	options.type = 'POST';
	options.data = data;
	options.url = url;
	return request(options)
}

const del = (url, data, options = {}) => {
	options.type = 'DELETE';
	options.data = data;
	options.url = url;
	return request(options)
}

const put = (url, data, options = {}) => {
	options.type = 'PUT';
	options.data = data;
	options.url = url;
	return request(options)
}



export default {
	request,
	get,
	post,
	del,
	put
}
