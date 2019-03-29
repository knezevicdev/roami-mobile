import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        
    },
    button: {
        backgroundColor: colors.BUTTON_TRANSPARENT_COLOR,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 5,
        color: colors.WHITE,
        textAlign: 'center'
    },
    venue: {
        fontSize: 20,
    },
    picture: {
        width: '100%',
        height: 200
    },
    venueNav: {
        backgroundColor: '#fff',
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
    item: {

    }
});
