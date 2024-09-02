import { useRouter } from "vue-router";
const router=useRouter();
export const navigateTo=(pageName,params)=>{
    router.push({name:pageName,params:params});
    console.log('jump To',params);
};