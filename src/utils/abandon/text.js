/* 尝试失败
 * 有CORS策略限制  
 * 弃用  
 */
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://www.hanlp.com/api'//api基地址
});
function getChineseText(text) {
    const regex = /[\u4e00-\u9fff]/g;
    const chineseCharacters = text.match(regex);
    return chineseCharacters ? chineseCharacters.join('') : '';
}
/* 根据文本获取关键词
 * 传入文本和需要的关键词个数  
 * 返回一个字典，包括一个列表，和一个status
 */
export const getKeyword=async (text,k=5) => {
    //接口限制对应的最大文本长度为1000
    const text_cn=getChineseText(text).slice(0,900);
    try{
        const url=axiosInstance.baseURL+"/keyphrase_extraction";
        const form={
            'text':text_cn,
            'language':'zh',
            'topk':k
        };
        console.log('Request Type: POST');
        console.log('Request URL: '+url);
        console.log('Request Data:', form);
        const response=await axiosInstance.post('/keyphrase_extraction',form);
        const result={
            status:true,
            keywords:response.data.keys()
        }
        return result;
    }catch(error){
        console.log('Error get keyword from HanLP');
        return {
            'status':false
        }
    }
}

/* 根据文本获取摘要
 * 传入文本
 * 返回文本
 */
export const getSummary=async (text) => {
    //接口限制对应的最大文本长度为1000
    const text_cn=getChineseText(text).slice(0,900);
    try{
        const url=axiosInstance.baseURL+"/abstractive_summarization";
        const form={
            'text':text_cn,
            'language':'zh'
        };
        console.log('Request Type: POST');
        console.log('Request URL: '+url);
        console.log('Request Data:', form);
        const response=await axiosInstance.post('/abstractive_summarization',form);
        const result={
            status:true,
            summary:response.data
        }
        return result;
    }catch(error){
        console.log('Error get keyword from HanLP');
        return {
            'status':false
        }
    }
}