// 设置用户信息
/*
user{
    id:
    userName:
    email:
}
*/
export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};
// 获取用户信息
export const getUser = (key = '') => {
    const user = localStorage.getItem('user');
    if (!user) {
        return '';
    }
    const parsedUser = JSON.parse(user);
    if (key === 'id') {
        return parsedUser.id;
    } else if (key === 'userName') {
        return parsedUser.userName;
    } else if(key=='email'){
        return parsedUser.email;
    } 
    else {
        return parsedUser;
    }
}
// 删除用户信息
export const deleteUser = () => {
    localStorage.removeItem('user');
};
