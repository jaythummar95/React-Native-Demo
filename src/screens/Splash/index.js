import React from "react";
import { View, SafeAreaView, Text, ImageBackground, Image } from "react-native";
import styles from "./styles";
import ParentView from '../../View/ParentView';
import { IMAGE } from '../../images'
import { COLOR } from "../../constants/constants";
import { isLogin } from '../../constants/Utils'

function Splash({ navigation }) {

    setTimeout(() => {
        isLogin()
            .then((response) => {
                if (response) {
                    navigation.replace('Dash');
                } else {
                    navigation.replace('Authantication');
                }
            })
    }, 2500);

    return (
        <ImageBackground style={styles.bg} source={IMAGE.splash_bg} tintColor={COLOR.colorPrimary}>
            <View style={styles.container} >
                <SafeAreaView />
                <Image
                    resizeMode={'contain'}
                    source={IMAGE.splash_logo}
                    style={styles.splashLogo} />
                <Text style={styles.splashText}>DRIVER</Text>
                <ParentView />
            </View>
        </ImageBackground>

    )
}


export default Splash