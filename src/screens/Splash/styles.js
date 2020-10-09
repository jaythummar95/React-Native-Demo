import { StyleSheet } from "react-native";
import { COLOR, FONT, DIMENSIOS } from "../../constants/constants";

const style = StyleSheet.create({
    bg: {
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 1.0,
        justifyContent: 'center'
    },
    splashText: {
        color: 'white',
        fontFamily: FONT.mons_bold,
        fontSize: 16,
        marginTop:16,
        alignSelf: 'center',
        textAlignVertical: 'center',
        letterSpacing:16
    },
    splashLogo: {
        width: DIMENSIOS.width / 2,
        height: DIMENSIOS.width / 2,
        alignSelf: 'center',
    }
})

export default style;