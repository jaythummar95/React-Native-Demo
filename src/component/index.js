import React, { Component, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableHighlight, TouchableNativeFeedback, SafeAreaView } from "react-native";
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from "../constants/constants";


export const TNFeedback = (content, callback) => {              //Common native touchable feedback
    return (
        <TouchableNativeFeedback
            underlayColor={COLOR.underlyingColor}
            onPress={() => { callback() }}
            background={TouchableNativeFeedback.Ripple(COLOR.colorPrimaryDark)}>
            <View>
                {content}
            </View>
        </TouchableNativeFeedback>
    )
}

export function toolbar(title, onlyBackandTitle, isback, callbackBack, callBackAccount) {   //Common toolbar

    return (
        <View style={styles.mainHeader}>
            <SafeAreaView />
            <View style={styles.headerContainer}>
                <View style={styles.heaerSubcontainer}>
                    {TNFeedback(
                        <Icon
                            name={isback ? "arrow-left" : 'user'}
                            type="font-awesome"
                            color={"white"}
                            size={20}
                            containerStyle={styles.backIconStyle}
                        />, () => { callbackBack() })}
                </View>
                <Text style={styles.title}>{title}</Text>
                {
                    !onlyBackandTitle ?
                        <View style={styles.heaerSubcontainer}>
                            {TNFeedback(
                                <Icon
                                    name="sign-out"
                                    type="font-awesome"
                                    color={"white"}
                                    size={20}
                                    containerStyle={styles.searchIconStyle}
                                />, () => { callBackAccount() })}


                        </View> :
                        null
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainHeader: {
        backgroundColor: COLOR.colorPrimary,
    },
    headerContainer: {
        width: '100%',
        backgroundColor: COLOR.colorPrimary,
        height: Platform.OS == "ios" ? 44 : 56,
        flexDirection: 'row',
    },
    heaerSubcontainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    space: {
        flex: 1.0
    },
    backIconStyle: {
        margin: Platform.OS == 'ios' ? 0 : 16,
        marginHorizontal: 16,
        alignSelf: 'center'
    },
    searchIconStyle: {
        margin: Platform.OS == 'ios' ? 0 : 16,
        marginHorizontal: 16,
        alignSelf: 'center'
    },
    title: {
        fontFamily: FONT.mons_bold,
        color: 'white',
        fontSize: 16,
        flex: 1.0,
        textAlignVertical: 'center',
        paddingBottom: 4,
        paddingBottom: -16,
        alignSelf: 'center'
    }
})

