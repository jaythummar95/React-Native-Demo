import React, { useState, useRef, useEffect } from 'react'
import { View, SafeAreaView, Text, TextInput, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'

import { Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'

import { IMAGE } from '../../images';
import { verifyOtp } from '../../networkcall'
import { Storage } from '../../constants/GPStorage'
import { COLOR } from '../../constants/constants'

import styles from './styles';
import ParentView from '../../View/ParentView'
import ProgressDialog from '../../View/ProgressDialog'


function OTPVerification(props) {

    const { navigation, route } = props;
    const { number, dataSession } = route.params
    const [showProgress, setShowProgress] = useState(false)
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')

    const refInput1 = useRef()
    const refInput2 = useRef()
    const refInput3 = useRef()
    const refInput4 = useRef()


    useEffect(() => {
        // splitOtpAndSet();
    }, [])


    const splitOtpAndSet = () => {
        let session_otp = "1234"//dataSession.session_otp
        session_otp = session_otp + "";
        session_otp = session_otp.split('');

        setOtp1(session_otp[0]);
        setOtp2(session_otp[1]);
        setOtp3(session_otp[2]);
        setOtp4(session_otp[3]);
    }


    const submitOtp = () => {
        let otp = otp1 + otp2 + otp3 + otp4;
        if (otp.length < 4) {
            Toast.show('Please enter otp');
            return;
        }
        setShowProgress(true)
        verifyOtp(dataSession.user_id, dataSession.session_token, otp, dataSession.user_id,)
            .then((response) => {
                setShowProgress(false)
                let data = response.data;
                let success = data.success;
                let message = data.message;
                console.log(JSON.stringify(response.data));
                if (success == 1) {
                    Storage.setAsyncItem('userData', { 'data': dataSession })
                    Toast.show(message);

                    navigation.dispatch(state => {
                        return CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Dash' }]             //Navigate to Test Submit and reset stack
                        })
                    })
                } else {
                    Toast.show(message);
                }
            })
            .catch((error) => {
                console.log("ERROR" + error)
                setShowProgress(false)
                if (!error.status) {
                    Toast.show('No network connection');
                }
            })

    }


    const content = () => {
        return (
            <ImageBackground source={IMAGE.splash_bg} style={{ width: '100%', height: '100%' }} tintColor={COLOR.colorPrimary}>
                <SafeAreaView/>
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <TouchableOpacity
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
                            </TouchableOpacity>

                            <Image source={IMAGE.splash_logo} style={styles.appLogo} />

                            <Text style={styles.messageText}>Enter the OTP which hase been sent you on this {number}.</Text>

                            <View style={{ width: '100%', height: 220 }}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputContainerSub}>
                                        {input(otp1, 1, refInput1)}
                                        {input(otp2, 2, refInput2)}
                                        {input(otp3, 3, refInput3)}
                                        {input(otp4, 4, refInput4)}
                                    </View>
                                </View>


                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.nextButtonContainer}
                                    onPress={() => {
                                        submitOtp()
                                    }}>
                                    <Image
                                        source={IMAGE.Login_circle}
                                        style={styles.nextButton} />
                                </TouchableOpacity>

                            </View>

                            {/* <Text style={styles.resendOtp}>Resend</Text> */}

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
                    <SafeAreaView />
                </View>
            </ImageBackground>
        )
    }

    const input = (value, index, refInput) => {
        return (
            <TextInput
                ref={refInput}
                style={styles.inputOtp}
                keyboardType={'number-pad'}
                value={value}
                onChangeText={(text) => {
                    switch (index) {
                        case 1:
                            setOtp1(text)
                            if (text) {
                                refInput2.current.focus();
                            }
                            break
                        case 2:
                            setOtp2(text)
                            if (text) {
                                refInput3.current.focus();
                            }
                            break
                        case 3:
                            setOtp3(text)
                            if (text) {
                                refInput4.current.focus();
                            }
                            break
                        case 4:
                            setOtp4(text)
                            break
                    }

                }}

                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {

                        switch (index) {
                            case 2:
                                if (!otp2) {
                                    refInput1.current.focus();
                                }
                                break
                            case 3:
                                if (!otp3) {
                                    refInput2.current.focus();
                                }
                                break
                            case 4:
                                if (!otp4) {
                                    refInput3.current.focus();
                                }
                                break
                        }
                    }
                }}
                numberOfLines={1}
                multiline={false}
                maxLength={1} />
        )
    }


    return content();
}

export default OTPVerification;