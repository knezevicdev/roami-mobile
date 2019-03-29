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
        flex: 2,
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
        backgroundColor: colors.BUTTON_TRANSPARENT_COLOR,
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
    },
});
