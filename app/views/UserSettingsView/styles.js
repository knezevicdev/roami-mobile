import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        color: colors.WHITE,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: colors.WHITE_TRANSPARENT,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 5,
        backgroundColor: colors.GRAY_TEXT,
        color: colors.WHITE,
        paddingLeft: 20
    },
    loading: {
        flex: 1,
        backgroundColor: colors.BUTTON_TRANSPARENT_COLOR,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: '#fff',
        position: 'absolute',
        fontSize: 20
    }
});