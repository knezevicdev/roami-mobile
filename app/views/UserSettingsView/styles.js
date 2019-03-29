import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
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
    },
    input: {
        backgroundColor: colors.WHITE_TRANSPARENT,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 5,
        backgroundColor: colors.BLUE_SEARCH,
        color: colors.WHITE
    },
});