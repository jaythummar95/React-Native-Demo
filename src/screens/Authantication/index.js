import React, { useState } from 'react'
import { View, SafeAreaView, Text, TextInput, Image, ScrollView, ImageBackground, Platform, TouchableOpacity } from 'react-native'

import Toast from 'react-native-simple-toast'
import { Icon } from 'react-native-elements';
import { NetworkInfo } from "react-native-network-info";
import { Storage } from '../../constants/GPStorage'
import { CommonActions } from '@react-navigation/native';

import { COLOR } from '../../constants/constants';
import { IMAGE } from '../../images';
import { authantication } from '../../networkcall'
import styles from './styles';
import ParentView from '../../View/ParentView'
import ProgressDialog from '../../View/ProgressDialog'
import { TANDC_URL, PP_URL } from '../../networkcall'


function Authantication(props) {

    const { navigation } = props;
    const [showProgress, setShowProgress] = useState(false)
    const [phone, setPhone] = useState('')
    const [cCode, setCCode] = useState('44')

    const authorize = () => {
        if (!phone) {
            Toast.show("Please enter phone number");
            return
        }

        // Get Local IP
        NetworkInfo.getIPAddress().then(ipAddress => {
            console.log(ipAddress);
            setShowProgress(true);
            authantication(ipAddress, Platform.OS, "+" + cCode + phone)
                .then((response) => {
                    setShowProgress(false);
                    console.log(response.data)

                    let data = response.data;
                    let success = data.success;
                    let message = data.message;

                    if (success == 1) {
                        let authentication_data = data.data.authentication_data;
                        navigation.navigate('OTPVerification', {
                            dataSession: authentication_data,
                            number: "+" + cCode + " " + phone
                        })

                        // if (authentication_data.type_text == 'login') {
                        //     Storage.setAsyncItem('userData', { 'data': authentication_data })
                        //     Toast.show(message);

                        //     navigation.dispatch(state => {
                        //         return CommonActions.reset({
                        //             index: 0,
                        //             routes: [{ name: 'Dash' }]             //Navigate to Test Submit and reset stack
                        //         })
                        //     })

                        // } else {
                        //     navigation.navigate('OTPVerification', {
                        //         dataSession: authentication_data,
                        //         number: phone
                        //     })
                        // }


                    } else {
                        Toast.show(message)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setShowProgress(false)
                    if (!error.status) {
                        Toast.show(error.message)
                    }
                })
        });


    }


    const content = () => {
        return (
            <ImageBackground source={IMAGE.splash_bg} style={{ width: '100%', height: '100%' }} tintColor={COLOR.colorPrimary}>
                <SafeAreaView />
                <View style={styles.container}>

                    <ScrollView>
                        <View>
                            {/* <TouchableOpacity
                                activeOpacity={1.0}
                                style={styles.backIconStyle}
                                onPress={() => {
                                    navigation.goBack(null);
                                }}>
                                <Icon
                                    name={"arrow-left"}
                                    type="font-awesome"
                                    color={"white"}
                                    size={20}
                                />
                            </TouchableOpacity> */}

                            <Image source={IMAGE.splash_logo} style={styles.appLogo} />

                            <Text style={styles.messageText}>Sign in with Groceries land</Text>

                            <View style={{ width: '100%', height: 220 }}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.inputCountryCode}
                                        keyboardType={'phone-pad'}
                                        value={cCode}
                                        onChangeText={(text) => { setCCode(text) }}
                                        placeholderTextColor={COLOR.inputHint}
                                        numberOfLines={1}
                                        maxLength={4}
                                        placeholder={''}
                                    />
                                    <TextInput
                                        style={styles.inputPhone}
                                        keyboardType={'phone-pad'}
                                        value={phone}
                                        onChangeText={(text) => { setPhone(text) }}
                                        placeholderTextColor={COLOR.inputHint}
                                        numberOfLines={1}
                                        maxLength={15}
                                        placeholder={'Enter phone number'}
                                    />
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.nextButtonContainer}
                                    onPress={() => {
                                        authorize();
                                    }}>
                                    <Image
                                        source={IMAGE.Login_circle}
                                        style={styles.nextButton} />
                                </TouchableOpacity>

                            </View>

                            <View style={styles.tandccontainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Webcontent', {
                                            url: TANDC_URL,
                                            title: "Terms & Conditions"
                                        });
                                    }}
                                    activeOpacity={1.0}>
                                    <Text style={[styles.tandc, { marginEnd: 16 }]}>Terms &amp; Conditions</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Webcontent', {
                                            url: PP_URL,
                                            title: "Privacy Policy"
                                        });
                                    }}>
                                    <Text style={styles.tandc}>Privacy policy</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>

                    <View style={styles.signInImageContainer} >
                        <Image
                            source={IMAGE.sign_in}
                            style={styles.signInImage}
                            resizeMode={'contain'} />
                    </View>
                    <ProgressDialog show={showProgress} />
                    <ParentView />
                </View>
            </ImageBackground>
        )
    }

    return content();
}

export default Authantication;