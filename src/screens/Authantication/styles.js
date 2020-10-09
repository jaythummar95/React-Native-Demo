import { StyleSheet } from 'react-native'
import { COLOR, FONT, DIMENSIOS } from '../../constants/constants'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
    },
    backIconStyle: {
        position: 'absolute',
        height: 56,
        width: 56,
        justifyContent: 'center',
        alignItems: 'center'
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
    inputCountryCode: {
        backgroundColor: COLOR.inputbg,
        borderLeftColor: COLOR.colorPrimary,
        borderLeftWidth: 4,
        borderRadius: 8,
        fontFamily: FONT.mons_medium,
        fontSize: 16,
        marginHorizontal: 16,
        marginTop: 40,
        elevation: 2,
        paddingHorizontal: 16,
        textShadowColor: COLOR.colorPrimary,
        height: 55,
        width:65,
        textAlign:'center'
    },
    inputPhone: {
        backgroundColor: COLOR.inputbg,
        borderLeftColor: COLOR.colorPrimary,
        borderLeftWidth: 4,
        borderRadius: 8,
        fontFamily: FONT.mons_medium,
        fontSize: 16,
        marginTop: 40,
        elevation: 2,
        paddingHorizontal: 16,
        textShadowColor: COLOR.colorPrimary,
        width: '65%',
        height: 55
    },
    login: {
        marginHorizontal: 16,
        fontSize: 16,
        fontFamily: FONT.mons_bold,
        textAlign: 'center',
        padding: 12,
        backgroundColor: COLOR.colorpink,
        marginTop: 24,
        color: 'white',
        borderRadius: 8,
        elevation: 4,
        marginBottom: 16
    },
    appLogo: {
        width: 100,
        height: 120,
        alignSelf: 'center',
        marginTop: 56
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        height: 170,
        margin: 16,
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
        height: '30%'
    },
    tandccontainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: -16
    },
    tandc: {
        color: 'white',
        fontFamily: FONT.mons_regular,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        fontSize: 9
    }
})

export default styles;
