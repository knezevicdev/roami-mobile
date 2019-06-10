import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        alignSelf: 'center',
        color: colors.WHITE
    },
    logoContainer: {
        height: "30%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    button: {
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: colors.WHITE_TRANSPARENT,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 5,
        paddingLeft: 20,
        color: "#ffffff"
    },
    reset: {
        color: colors.BLUE_LIGHT,
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonText: {
        color: colors.WHITE
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
