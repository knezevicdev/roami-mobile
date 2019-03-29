import { StyleSheet, Platform } from "react-native";
import { colors } from '../../config';

export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    search: {
        backgroundColor: colors.BLUE_SEARCH,
        paddingTop: 30,
        paddingBottom: 10,
        flex: 1,
    },
    button: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    select: {
        backgroundColor: colors.WHITE,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 5,
        marginTop: 5,
    }
});
