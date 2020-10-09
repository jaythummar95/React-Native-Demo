import { StyleSheet } from "react-native";
import { COLOR, FONT } from "../../constants/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: 'white'
    },
    sectionLable: {
        elevation: 0,
        // backgroundColor: "#f1f1f1",
        color: 'black',
        fontFamily: FONT.mons_semiboald,
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderLeftColor: COLOR.colorPrimary,
        // borderLeftWidth: 4
    },
    prdContainer: {
        width: '100%',
        marginBottom: 2,
        // backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    prdImage: {
        width: 75,
        height: 75
    },
    prdDetailContainer: {
        flex: 1.0,
        padding: 8,
    },
    prdTitle: {
        fontFamily: FONT.mons_medium,
        color: 'black',
        fontSize: 14,
    },
    prdPrice: {
        fontFamily: FONT.mons_regular,
        color: 'black',
        fontSize: 13,
        flex: 1.0
    },
    prdPriceContainer: {
        marginTop: 6,
        flex: 1.0,
        flexDirection: 'row'
    },
    prdQty: {
        fontFamily: FONT.mons_regular,
        color: 'black',
        fontSize: 13,
        textAlign: 'center',
        flex: 1.0
    },
    prdPriceTotal: {
        fontFamily: FONT.mons_bold,
        color: 'black',
        fontSize: 13,
        flex: 1.0,
        textAlign: 'right'
    },
    addressContainer: {
        padding: 16,
    },
    addressTxt: {
        flex: 1.0,
        fontFamily: FONT.mons_regular,
        fontSize: 16,
        textAlign: 'justify',
    },
    margin16: {
        marginTop: 0
    },
    textSbTtl: {
        color: 'rgba(0,0,0,0.7)',
        fontFamily: FONT.mons_medium,
        fontSize: 15,
    },
    txtTotal: {
        color: 'rgba(0,0,0,0.7)',
        fontFamily: FONT.mons_semiboald,
        fontSize: 15,
        alignSelf: 'flex-end'
    },
    pricecontainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: 'white',
        marginTop: 8,
    },
    pricecontainerSub: {
        marginBottom: 8,
        flexDirection: 'row',
    },
    trackOrder: {
        backgroundColor: COLOR.colorPrimary,
        elevation: 4,
        color: 'white',
        fontFamily: FONT.mons_medium,
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 12
    },
    orangebg: {
        backgroundColor: COLOR.orangeLight,
        marginHorizontal: 8,
        borderRadius: 4
    },
    skyblueBg: {
        backgroundColor: COLOR.lightskyblue,
        marginHorizontal: 8,
        marginTop: 16,
        borderRadius: 4
    },
    redbg: {
        backgroundColor: COLOR.redlight,
        marginHorizontal: 8,
        marginTop: 16,
        borderRadius: 4
    },
    cynBg: {
        backgroundColor: COLOR.cyn,
        marginHorizontal: 8,
        marginTop: 16,
        borderRadius: 4
    },
    pinkBg: {
        backgroundColor: COLOR.lightPink,
        marginHorizontal: 8,
        marginTop: 16,
        borderRadius: 4,
        marginBottom: 16
    },
    yellowbg: {
        backgroundColor: COLOR.lightYellow,
        marginHorizontal: 8,
        marginTop: 16,
        borderRadius: 4,
        marginBottom: 16
    },
    teagreenbg: {
        backgroundColor: COLOR.lightPurpal,
        marginHorizontal: 8,
        borderRadius: 4,
        marginBottom: 16
    },
    updateStausContainer: {
        borderRadius: 4,
        marginHorizontal: 16,
        marginBottom: 16,
        elevation: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    updateStaus: {
        fontSize: 16,
        fontFamily: FONT.mons_medium,
        padding: 12,
        textAlign: 'center',
        flex: 1.0,
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


export default styles;