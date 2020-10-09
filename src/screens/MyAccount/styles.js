import { StyleSheet } from 'react-native'
import { COLOR, FONT } from '../../constants/constants'

export default styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: 'white',
    },
    inputPlaceHolder: {
        marginHorizontal: 16,
        fontFamily: FONT.mons_bold,
        fontSize: 12,
        marginTop: 16,
        marginBottom: 8
    },
    input: {
        width: '90%',
        backgroundColor: 'white',
        borderBottomColor: COLOR.colorPrimary,
        borderBottomWidth: 1.5,
        borderRadius: 2,
        fontFamily: FONT.mons_regular,
        fontSize: 16,
        marginHorizontal: 8,
        elevation: 2,
        paddingHorizontal: 16,
        alignSelf: 'center',
        textShadowColor: COLOR.colorPrimary,
        textAlignVertical: 'center',
    },
    update: {
        marginHorizontal: 16,
        fontSize: 16,
        fontFamily: FONT.mons_bold,
        textAlign: 'center',
        padding: 12,
        backgroundColor: COLOR.colorPrimary,
        marginTop: 24,
        color: 'white',
        borderRadius: 2,
        elevation: 4,
        marginBottom: 16
    },
})