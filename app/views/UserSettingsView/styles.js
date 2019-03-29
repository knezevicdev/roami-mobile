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
        backgroundColor: colors.BLUE_DARK,
        paddingVertical: 10,
        borderRadius: 4,
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
});