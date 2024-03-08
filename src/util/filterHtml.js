const filterHtml = (e) => {
    let filter_src="rockcelltech.top/public/emoji/"
    let str = e;
    let arr = str.split('<img');
    let testRegex="";
    let  src = "";
    try{
        src = arr[1].split('src=')[1].split('"')[1];
        testRegex= new RegExp(filter_src);
        // console.log(arr);
        // console.log(testRegex.test(src))
    }catch(e){
        return {str,isemjo:true};
    }
    
    if(testRegex.test(src)){
        return {str,isemjo:true};
    }else{
        return {str:arr[0],isemjo:false} ;
    }
}


export default {filterHtml}