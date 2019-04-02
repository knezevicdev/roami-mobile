import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    search: {
        backgroundColor: colors.BLUE_SEARCH,
        paddingLeft: 20,
        margin: 5,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        color: colors.WHITE,
    },
    form: {
        backgroundColor: '#DDDDDD',
        margin: 5,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        color: colors.WHITE,
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "#ffffff",
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
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