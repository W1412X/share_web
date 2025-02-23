import { getCookie } from "@/utils/cookie";
import { addDictFromString, copy, getHeadString, setDictString } from "@/utils/other";

/**
 * create article
 */
export function csCreateArticle(data) {
    var head=setDictString('editor',data.editor);
    head=setDictString('detail',data.detail,head);
    head=setDictString('imgLink',data.imgLink,head);
    const result={
        article_title:data.title,
        content:head+data.content,
        tags:tags,
        author_id:getCookie('userId'),
        article_type:data.type,
        origin_link:data.originLink,
    }
    console.log(result);
    return result;
}
export function scCreateArticle(data){
    return {
        status:data.status,
        message:data.message,
        id:data.article_id,
    }
}

/**
 * edit article
 */
export function csEditArticle(data){
    var head=setDictString('editor',data.editor);
    head=setDictString('detail',data.detail,head);
    head=setDictString('imgLink',data.imgLink,head);
    const result={
        article_title:data.title,
        content:head+data.content,
        tags:tags,
        author_id:getCookie('userId'),
        article_type:data.type,
        origin_link:data.originLink,
    }
    console.log(result);
    return result;
}

/**
 * delete article
 */
export function csDeleteArticle(data){
    return {
        article_id:data.id,
    }
}

/**
 * get article
 */
export function scGetArticle(data){
    var article=data.article_detail;
    var result=addDictFromString(getHeadString(article.article_content));
    result.id=article.article_id;
    result.title=article.article_title;
    result.content=copy(article.article_content);
    result.type=article.article_type;
    result.originLink=article.origin_link;
    result.tags=article.article_tags;
    result.author=article.author_name;
    //result.authorProfileUrl=article.author_profile_url;
    result.star=article.star_count;
    result.comment=article.reply_count;
    result.time=article.publish_time;
    result.ifStar=article.if_like;
    result.ifLike=article.if_star;
    return {
        status:data.status,
        message:data.message,
        article:result,
    }
}

/**
 * get the post list of the article
 */


/**
 * get the article list  
 */