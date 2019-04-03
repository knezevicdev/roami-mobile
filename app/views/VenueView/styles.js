import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    button: {
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#ffffff",
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
    },
    venue: {
        fontSize: 20,
    },
    picture: {
        width: '100%',
        height: 200,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    venueNav: {
        backgroundColor: colors.WHITE,
        display: 'flex',
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
    },
    venueTab: {
        width: '50%',
        textAlign: 'center',
        fontSize: 18
    },
    location: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    placeName: {
        fontSize: 30,
        marginBottom: 5
    },
    venueContainer: {
        borderBottomWidth: 1,
        marginBottom: 10
    },
    emailPhone: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1
    },
    items: {
        borderBottomWidth: 1,
        fontSize: 18,
        marginVertical: 5,
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        flexDirection:'row',
    },
});
