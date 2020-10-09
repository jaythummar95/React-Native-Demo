import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TextInput, ScrollView } from 'react-native'

import Toast from 'react-native-simple-toast'

import { toolbar } from '../../component'
import { UserData, updateProfile } from '../../networkcall'
import { CommonActions } from '@react-navigation/native';

import styles from './styles'
import ParentView from '../../View/ParentView'
import ProgressDialog from '../../View/ProgressDialog'

function MyAccount(props) {


    const { navigation } = props;
    const [user_full_name, setUserFullname] = useState('')
    const [user_email_id, setUserEmailId] = useState('')
    const [user_phone_no, setUserPhoneNo] = useState('')
    const [user_pincode, setUserPinCode] = useState('')
    const [user_address, setUserAddress] = useState('')
    const [showProgress, setShowProgress] = useState(false)

    const inputs = [
        { type: 'name', ph: 'Name', keyboard: 'default', value: () => { return (user_full_name) }, onChange: (text) => { setUserFullname(text) } },
        { type: 'email', ph: 'Email', keyboard: 'email-address', value: () => { return (user_email_id) }, onChange: (text) => { setUserEmailId(text) } },
        { type: 'phone', ph: 'Phone number', keyboard: 'number-pad', value: () => { return (user_phone_no) }, onChange: (text) => { setUserPhoneNo(text) } },
        { type: 'pincode', ph: 'Pincode', keyboard: 'number-pad', value: () => { return (user_pincode) }, onChange: (text) => { setUserPinCode(text) } },
        { type: 'user_address', ph: 'Address', keyboard: 'default', value: () => { return (user_address) }, onChange: (text) => { setUserAddress(text) } },
    ]


    useEffect(() => {
        fetchUerData();
    }, [])

    const fetchUerData = () => {
        setShowProgress(true)
        UserData()
            .then((response) => {
                setShowProgress(false)

                let data = response.data;
                let success = data.success;
                let message = data.message;

                console.log(JSON.stringify(data));

                if (success == '1') {
                    let userdata = data.data.userdata;
                    let user_full_name = userdata.user_full_name ? userdata.user_full_name : "";
                    let user_email_id = userdata.user_email_id ? userdata.user_email_id : "";
                    let user_phone_no = userdata.user_phone_no ? userdata.user_phone_no : "";
                    let user_pincode = userdata.user_pincode ? userdata.user_pincode : "";
                    let user_address = userdata.user_address ? userdata.user_address : "";

                    setUserFullname(user_full_name)
                    setUserEmailId(user_email_id)
                    setUserPhoneNo(user_phone_no)
                    setUserPinCode(user_pincode)
                    setUserAddress(user_address)

                } else {
                    Toast.show(message)
                }
            })
            .catch((error) => {
                setShowProgress(false)
                console.log(error)
            })
    }

    const update = () => {

        if (!user_full_name) {
            Toast.show('Please enter full name');
            return
        }

        if (!user_email_id) {
            Toast.show('Please enter email address');
            return
        }

        if (!user_pincode) {
            Toast.show('Please enter pin code');
            return
        }

        if (!user_address) {
            Toast.show('Please enter address');
            return
        }


        setShowProgress(true);
        updateProfile(
            user_full_name,
            user_email_id,
            user_pincode,
            user_address
        )
            .then((response) => {
                setShowProgress(false)

                let data = response.data;
                let success = data.success;
                let message = data.message;

                console.log(JSON.stringify(data));

                if (success == '1') {
                    Toast.show(message)

                    navigation.dispatch(state => {
                        return CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Dash' }]             //Navigate to Test Submit and reset stack
                        })
                    })

                } else {
                    Toast.show(message)
                }
            })
            .catch((error) => {
                setShowProgress(false)
                console.log(error)
            })
    }

    const content = () => {
        return (
            <View style={styles.container}>
                {toolbar(
                    "My account",            //Title
                    true,                    //Display only back and title
                    true,                    //Is back button
                    () => {                  //callBackBack Menu 
                        console.log("back press")
                        navigation.goBack(null)
                    }, null, null)
                }

                <ScrollView>
                    <View style={styles.container}>
                        {
                            inputs.map(element =>
                                <View>
                                    <Text style={styles.inputPlaceHolder}>{element.ph}</Text>
                                    <TextInput
                                        editable={element.type != 'phone'}
                                        style={
                                            [styles.input, {
                                                textAlignVertical: element.type == 'user_address' ? 'top' : 'center',
                                                maxHeight: element.type == 'user_address' ? 100 : 56,
                                                minHeight: element.type == 'user_address' ? 100 : 40,
                                            }]
                                        }
                                        keyboardType={element.keyboard}
                                        placeholder={element.ph}
                                        value={element.value() + ""}
                                        multiline={element.type == 'user_address'}
                                        onChangeText={(text) => { element.onChange(text) }}
                                    />
                                </View>

                            )
                        }

                        <Text style={styles.update} onPress={() => {
                            update()
                        }}>Update</Text>
                    </View>
                </ScrollView>
                <ParentView />
                <SafeAreaView />
                <ProgressDialog show={showProgress} />
            </View>
        )
    }

    return content();
}

export default MyAccount;