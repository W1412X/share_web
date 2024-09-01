import { useRouter,useRoute } from "vue-router";
const router=useRouter();
const route=useRoute();
export const navigateTo=(pageName,params)=>{
    router.push({name:pageName,params:params});
    console.log('jump To',params);
};
export const getPageParams=()=>{
    return route.params;
};