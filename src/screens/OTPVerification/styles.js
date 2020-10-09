import { StyleSheet } from 'react-native'
import { COLOR, FONT, DIMENSIOS } from '../../constants/constants'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
    },
    backIconStyle: {
        margin: 16,
        position: 'absolute'
    },
    logocontainer: {
        width: DIMENSIOS.width,
        backgroundColor: COLOR.colorPrimaryDark,
        height: DIMENSIOS.height / 3 - 56,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 2,
        marginBottom: 8,
    },
    logoContentContainer: {
        width: DIMENSIOS.width,
        backgroundColor: COLOR.colorPrimary,
        height: DIMENSIOS.height / 3.1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        marginBottom: 8,
    },
    splashText: {
        color: 'white',
        fontFamily: FONT.mons_medium,
        fontSize: 40,
        alignSelf: 'center',
        flex: 1,
        textAlignVertical: 'center'
    },
    messageText: {
        color: 'white',
        fontFamily: FONT.mons_medium,
        fontSize: 16,
        marginTop: 16,
        marginStart: 16
    },
    resendOtp: {
        color: 'black',
        fontFamily: FONT.mons_medium,
        fontSize: 18,
        alignSelf: 'center',
        margin: 16
    },
    messageTextSub: {
        marginTop: 16,
        color: 'black',
        fontFamily: FONT.mons_light,
        fontSize: 17,
        alignSelf: 'center',
        marginHorizontal: 16,
        marginBottom: 32,
        marginTop: 24
    },
    inputOtp: {
        backgroundColor: COLOR.inputbg,
        borderLeftColor: COLOR.colorPrimary,
        borderLeftWidth: 4,
        borderRadius: 8,
        width: 56,
        height: 50,
        fontFamily: FONT.mons_medium,
        fontSize: 16,
        marginHorizontal: 8,
        elevation: 2,
        paddingHorizontal: 16,
        alignSelf: 'center',
        textShadowColor: COLOR.colorPrimary,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    login: {
        marginHorizontal: 16,
        fontSize: 16,
        fontFamily: FONT.mons_bold,
        textAlign: 'center',
        padding: 12,
        backgroundColor: COLOR.colorpink,
        marginTop: 48,
        color: 'white',
        borderRadius: 8,
        elevation: 4,
        marginBottom: 16
    },
    inputContainerSub: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    appLogo: {
        width: 100,
        height: 120,
        alignSelf: 'center',
        marginTop: 56
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        height: 170,
        margin: 16,
        alignItems: 'center'
    },
    nextButton: {
        width: 90,
        height: 90,
    },
    nextButtonContainer: {
        elevation: 4,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0
    },
    signInImage: {
        width: '100%',
        height: '100%',
    },
    signInImageContainer: {
        width: '100%',
        height: '25%'
    }
})

export default styles;
