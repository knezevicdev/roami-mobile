import { StyleSheet } from "react-native";
import { colors } from "../../config";

export default StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8'
    },  
    imageBackground: {
        width: '100%',
        height: 300,
    },
    gradient: {
        height: '70%',
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    nav: {
        display: 'flex',
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    navItem: {
        width: '50%',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        color: colors.BLACK
    },
    navItemActive: {
        borderBottomWidth: 2,
        width: '50%',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.BLACK
    },
    venueName: {
        fontSize: 30,
        paddingLeft: 10,
        marginTop: 100,
        color: colors.BLACK
    },
    mainInfo: {
        borderBottomWidth: 1,
        borderColor: colors.GRAY_TEXT,
        marginBottom: 20,
        width: '100%',
        padding: 10,
        backgroundColor: colors.WHITE
    }, 
    address: {
        color: colors.BLACK,
        borderBottomWidth: 1,
        borderColor: colors.GRAY_TEXT,
        paddingBottom: 10,
        marginBottom: 10,
    },
    infoTitle: {
        color: colors.GRAY_TEXT,
        fontSize: 16,
    },
    infoText: {
        fontSize: 20
    },
    contact: {
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderColor: colors.GRAY_TEXT,
        borderTopWidth: 1,
        marginBottom: 20,
        padding: 10,
        display: 'flex',
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    contactTab: {
        width: '50%',
        textAlign: 'center',
        alignItems: 'center',
    },
    contactItem: {
        color: colors.BLUE_SEARCH,
        fontSize: 16
    },
    social: {
        padding: 10,
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderColor: colors.GRAY_TEXT,
        borderTopWidth: 1,
        marginBottom: 20,
    },
    button: {
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#ffffff",
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
    },
    buttonGradiant: {
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#ffffff",
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        marginBottom: 20,
    },
    map: {

    },
    mapGradient: {
        width: '100%',
        zIndex: 1200
    },
    items: {
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 20,
        flex: 1,
        backgroundColor: '#F8F8F8',
        height: '100%',
    },
    item: {
        borderBottomWidth: 1,
        borderColor: colors.GRAY_TEXT,
        borderTopWidth: 1,
        backgroundColor: colors.WHITE,
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        flexDirection:'row',
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    circle: {
        width: 80,
        height: 80,
        backgroundColor: colors.BLUE_SEARCH,
        alignSelf:'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
