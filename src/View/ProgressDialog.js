import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { COLOR } from "../constants/constants";

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];


function ProgressDialog(props) {
    const { show  } = props;
    const content = () => {
        if (show) {
            return (
                <View style={style.container}>
                    <View style={style.prgrscntainer}>
                        <ActivityIndicator color={'white'} size={'large'} />
                    </View>
                </View>
            )
        } else {
            return null;
        }

    }

    return content();
}

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    prgrscntainer: {
        backgroundColor: COLOR.colorPrimary,
        height: 100,
        width: 100,
        borderRadius: 8,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default ProgressDialog;