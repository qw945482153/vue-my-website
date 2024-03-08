//防抖
export function debounce(fn, delay,immediate=false) {
	var timer = null;
	return function(args) {
		let that = this;
		let _args = arguments;
		if (timer) clearTimeout(timer);
		if(immediate){
			let callNow = !timer;
			timer=setTimeout(()=>{
				timer=null;
			},delay)
			if(callNow) fn.apply(that,_args)
		}
		else{
			timer = setTimeout(function() {
				fn.apply(that, _args);
			}, delay);
		}
		
	}
}
//节流
export function throttle(fn, delay) {
	let timer = true;
	return function(args) {
		let that = this;
		let _args = arguments;
		if(!timer){
			uni.showToast({
				title:"请勿操作太快",
				icon:'none',

			})
		   return false;
		}
		timer = false;
		uni.showLoading({
			title:'提交中~'
		})
		setTimeout(() => {
			uni.hideLoading()
			fn.apply(that, _args)
			timer = true;
		}, delay)
	}
}


// export default {throttle,debounce}
