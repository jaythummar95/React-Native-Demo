import { Storage } from './GPStorage'


export const isLogin = async () => {
    let data = await Storage.getAsyncItem('userData');
    return data != null ? true : false
}

