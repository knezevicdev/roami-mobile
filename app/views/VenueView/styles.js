import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: colors.BUTTON_TRANSPARENT_COLOR,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 5,
        color: colors.WHITE
    },
    venue: {
        fontSize: 20,
    }
});
