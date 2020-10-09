import { StyleSheet } from "react-native";
import { COLOR, FONT, DIMENSIOS } from "../../../constants/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: 'white'
    },
    title: {
        fontFamily: FONT.mons_medium,
        alignSelf: 'center',
        marginTop: 16,
        padding: 8,
        fontSize: 20,
        color: '#363636'
    },
    orderId: {
        fontFamily: FONT.mons_bold,
        alignSelf: 'center',
        fontSize: 18,
        color: '#363636',
        marginBottom: 16
    },
    orderStatus: {
        fontFamily: FONT.mons_medium,
        fontSize: 16,
        marginTop: 8,
        marginStart: 8,
    },
    orderStatusDate: {
        fontFamily: FONT.mons_regular,
        fontSize: 12,
        marginTop: 4,
        marginStart: 8,

    },
    trackingcell: {
        height: DIMENSIOS.height / 6,
        flexDirection: 'row',

    },
    trackLineContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    trackingLine: {
        width: 0.8,
        backgroundColor: COLOR.colorPrimaryLight,
        height: '100%',
    },
    emptyStatus: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: COLOR.colorPrimary,
        borderWidth: 2,
        position: 'absolute',
        top: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        overflow: 'hidden'

    },
    rightIcon: {
        backgroundColor: COLOR.colorPrimary,
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    trackigImage: {
        width: 30,
        height: 30,
        borderWidth: 1,
        marginEnd:32,
        marginStart:-16,
    }
})

export default styles;