import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    nav: {
        backgroundColor: colors.BLUE_SEARCH,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        flexDirection:'row',
        paddingRight: 15
    },
    mapContainer: {
        flex: 1
    },
    circle: {
        backgroundColor: 'red',
        width: 60, 
        height: 60, 
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
});