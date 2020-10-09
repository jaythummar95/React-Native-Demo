import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, StatusBar, Platform } from "react-native";
import { COLOR } from "../constants/constants";

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];


class ParentView extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (Platform.OS == 'ios') {
            return null
        }
        else {
            return (
                <View style={style.container}>
                    <StatusBar backgroundColor={COLOR.colorPrimaryDark} barStyle="light-content" />
                </View>
            )
        }
    };
}

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    }
})


export default ParentView;