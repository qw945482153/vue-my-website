import request from '../http/http.js'

export const getlist=()=>{
     request({
        url:'list',
        method:'GET'
    }).then(res=>{
        return res;
    })
}
export const getnewlist = (data) =>  request.get('blog/articles', data)


export const getHotlist = () => request.get('blog/articles');


export const getCategory = () =>  request.get('blog/categoryall');


export const getArticlesDet = (id) => request.get('blog/article', {id});

export const addArticlesRead = (id) => request.put(`blog/articles/addvolume?id=${id}`);

export const addArticlesLove = (id) => request.put(`blog/articles/addlove?id=${id}`);

export const uploadFile = (file) => request.upload('blog/gallery', file);

export const addComment = (data) =>  request.post('blog/comment', data);

export const getComment = (id) => request.get('blog/comments', {article_id: id});

export const addOtherComment = (data) => request.post('blog/othercomment',data);

export const getDraw = (prompt) => request.post('getDraw',prompt);

export const getResult = (task_id) => request.get('getResult?id='+task_id);

export const getgeneration = (prompt) => request.post('getgeneration',prompt);

export const addGoodNum = () => request.get('blog/webadmins');

export const getGoodNum = () => request.get('blog/webadmin');

export const weblogin = (email) => request.get('blog/weblogin',email);

export const websetname = (data) => request.get('blog/webname',data);

export const websetmessage = (data) => request.post('blog/webmessages',data);

export const getmessage = (data) => request.get('blog/webmessage',data);
export const addMessageLike = (id,like) => request.get('blog/addmessagelike',{
    id,like
})
export const getpoetry = () => request.get('blog/webpoetry');