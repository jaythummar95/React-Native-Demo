import Axios from 'axios';
import { Storage } from '../constants/GPStorage'


// const BASE_URL = "http://aksharcomposite.in/grocery_store/";
// const BASE_URL = "http://sellpoint.shop/";
const BASE_URL = "http://groceriesland.com/";

const BASE_URL_DRIVER = `${BASE_URL}app-deliveryman-`;

export const TANDC_URL = "http://groceriesland.com/app-terms-conditions"
export const PP_URL = "http://groceriesland.com/app-privacy-policy"
export const ABOUT_US_RL = "http://groceriesland.com/app-about-us"
export const CONTACT_UC_URL = "http://groceriesland.com/app-contact-us"


export const userData = async () => {
    let data = await Storage.getAsyncItem('userData')
    if (data) {
        return data.data;
    } else {
        return null;
    }
}

export const getDeliveries = async (page, delivery_status) => {
    var bodyFormData = new FormData();
    let data = await userData();
    if (data) {
        bodyFormData.append('user_id', data.user_id)
        bodyFormData.append('user_token', data.session_token)
    }
    bodyFormData.append('page', page);
    bodyFormData.append('delivery_status', delivery_status);
    return Axios.post(`${BASE_URL_DRIVER}get-deliveries`, bodyFormData)
}

export const getDeliveriesDetail = async (delivery_id) => {
    var bodyFormData = new FormData();
    let data = await userData();
    if (data) {
        bodyFormData.append('user_id', data.user_id)
        bodyFormData.append('user_token', data.session_token)
    }
    bodyFormData.append('delivery_id', delivery_id);
    return Axios.post(`${BASE_URL_DRIVER}delivery-details`, bodyFormData)
}




export const updateDelivery = async (delivery_id, delivery_status) => {
    var bodyFormData = new FormData();
    let data = await userData();
    if (data) {
        bodyFormData.append('user_id', data.user_id)
        bodyFormData.append('user_token', data.session_token)
    }
    bodyFormData.append('delivery_id', delivery_id);
    bodyFormData.append('delivery_status', delivery_status);
    console.log(bodyFormData)
    return Axios.post(`${BASE_URL_DRIVER}update-delivery`, bodyFormData)
}

export const authantication = (ip_address, device_name, phone_no) => {
    var bodyFormData = new FormData();
    bodyFormData.append('ip_address', ip_address)
    bodyFormData.append('device', device_name)
    bodyFormData.append('phone_no', phone_no)
    return Axios.post(`${BASE_URL}app-user-authentication`, bodyFormData)
}

export const verifyOtp = (user_id, session_token, session_otp, session_user_id) => {
    var bodyFormData = new FormData();
    bodyFormData.append('session_user_id', user_id)
    bodyFormData.append('session_token', session_token)
    bodyFormData.append('session_otp', session_otp)
    bodyFormData.append('phonsession_user_ide_no', session_user_id)
    return Axios.post(`${BASE_URL}app-user-authentication-otp-verify`, bodyFormData)
}

export const Logout = async () => {
    let data = await userData();
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', data.user_id)
    bodyFormData.append('user_token', data.session_token)
    return Axios.post(`${BASE_URL}app-user-logout`, bodyFormData)
}


export const UserData = async () => {
    let data = await userData();
    var bodyFormData = new FormData();
    if (data) {
        bodyFormData.append('user_id', data.user_id)
        bodyFormData.append('user_token', data.session_token)
    }
    return Axios.post(`${BASE_URL}app-user-userdata`, bodyFormData)
}


export const updateProfile = async (user_full_name, user_email_id, user_pincode, user_address) => {
    var bodyFormData = new FormData();
    let data = await userData();
    if (data) {
        bodyFormData.append('user_id', data.user_id)
        bodyFormData.append('user_token', data.session_token)
    }
    bodyFormData.append('user_full_name', user_full_name)
    bodyFormData.append('user_email_id', user_email_id)
    bodyFormData.append('user_pincode', user_pincode)
    bodyFormData.append('user_address', user_address)

    return Axios.post(`${BASE_URL}app-user-profile-update`, bodyFormData)
}