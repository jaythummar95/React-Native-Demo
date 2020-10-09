import { StyleSheet } from "react-native";
import { COLOR, FONT, DIMENSIOS } from "../../constants/constants";

const style = StyleSheet.create({
    container: {
        flex: 1.0,
    },
    emptyView: {
        flex: 1.0,
        color: COLOR.colorPrimary,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: FONT.mons_bold,
        opacity: 0.9,
        fontSize: 18,
        position: 'absolute',
        alignSelf: 'center',
        bottom: DIMENSIOS.height / 2.8
    },
    ordItemContainer: {
        backgroundColor: 'white',
        elevation: 2,
        marginBottom: 8,
        padding: 16,
        flexDirection: 'row'
    },
    ordItemDetailContaier: {
        flex: 1.0
    },
    ordItemStatusPriceCtinr: {
        flex: 0.3
    },
    ordLable: {
        fontFamily: FONT.mons_medium,
        fontSize: 15,
        marginBottom: 4,
    },
    ordValue: {
        fontFamily: FONT.mons_light,
        fontSize: 15,
        color: 'black',
        marginBottom: 4
    },
    ordTitle: {
        fontFamily: FONT.mons_semiboald,
        fontSize: 16,
        color: 'black',
        marginBottom: 8
    },
    orderNo: {
        fontFamily: FONT.mons_medium,
        fontSize: 14,
        color: 'black',
        marginTop: 8
    },
    orderDate: {
        fontFamily: FONT.mons_regular,
        fontSize: 13,
        marginTop: 4,
        color: 'black',
        marginTop: 8
    },
    ordStatus: {
        fontFamily: FONT.mons_medium,
        fontSize: 18,
        color: COLOR.colorPrimaryDark,
        marginTop: 4
    },
    ordTotal: {
        fontFamily: FONT.mons_semiboald,
        fontSize: 16,
        color: 'black',
    },
    emptytext: {
        fontSize: 17,
        fontFamily: FONT.mons_semiboald,
        color: COLOR.colorPrimary
    },
    emptyimage: {
        width: 150,
        height: 150,
        marginBottom: 8,
        opacity: 0.7
    },
    filterStatusContainer: {
        elevation: 2,
        backgroundColor: COLOR.lightYellow,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 4
    },
    filterStatus: {
        fontSize: 16,
        fontFamily: FONT.mons_semiboald,
        padding: 12,
        textAlign: 'center',
        flex: 1.0,
        color: COLOR.colorPrimaryDark,
        textTransform: 'uppercase',
        marginStart: 20
    },
    checkboxContainer: {
        marginStart: 16,
        marginEnd: 16,
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    chekcBox: {
        height: 30,
        width: 30,
        borderColor: COLOR.blueDark,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center'
    },
    statusType: {
        color: 'black',
        fontSize: 16,
        fontFamily: FONT.mons_medium,
        marginHorizontal: 16
    },
})

export default style;