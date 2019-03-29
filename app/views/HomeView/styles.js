import { StyleSheet, Platform } from "react-native";
import { colors } from '../../config';

export default StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    search: {
        paddingTop: 30,
        paddingBottom: 10,
        flex: 1,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    select: {
        backgroundColor: colors.GRAY_TEXT,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 5,
        marginTop: 5,
    },
    slide: {
        paddingVertical: 10,
        marginHorizontal: 20,
        marginBottom: 5,
        marginTop: 5,
    }
});
