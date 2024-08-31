import { useRouter } from "vue-router";
const router=useRouter();
export function jumpTo(path){
    router.push(path);
}