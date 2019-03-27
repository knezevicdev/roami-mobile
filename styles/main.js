import { StyleSheet } from 'react-native';
import { Platform, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bodyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    touchableCircle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        backgroundColor:'silver',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    },
    paragraphBold: {
        margin: '5%',
        fontSize: 60,
    }
});

export const topBarstyles = StyleSheet.create({
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    textContainer: {
        textAlign: "center",
        alignItems: "center"
    },
    textTitle: {
        color: "#3d4451",
        fontSize: 16
    },
    textSubtitle: {
        color: "#b2b2b4",
        fontSize: 12
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    bottomButton: {
        width: "30%",
        alignItems: "center"
    },
    bottomButtonText: {
        color: "#7ad21a"
    }
});

export const iconStyles = StyleSheet.create({
    containerStyle: {
        position: "absolute",
        backgroundColor: "white",
        right: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40
    },
    textStyle: {
        color: "#34bded",
        fontSize: 40,
        padding: 7
    }
});
