import React, { Component, useState } from 'react';
import { View, Text } from "react-native";

import styles from './style';
import { toolbar } from '../../component'
import { WebView } from 'react-native-webview';


function Webcontent(props) {
    const { navigation, route } = props;
    const { url, title } = route.params
    return (
        <View style={styles.container}>
            {toolbar(
                title,                   //Title
                true,                    //Display only back and title
                true,                    //Is back button
                () => {                  //callBackBack Menu 
                    console.log("back press")
                    navigation.goBack(null)
                }, null, null)
            }
            <WebView source={{ uri: url }} />
        </View>
    )
}

export default Webcontent;