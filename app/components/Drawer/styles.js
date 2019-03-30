import { StyleSheet } from "react-native";
import { colors } from '../../config';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    header: {
        height: 90,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.BLUE_BORDER
    },
    body: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bodyContainer: {
        flex: 1
    },
    buttonContainer: {
        alignItems: 'flex-start',
        marginVertical: 10
    }
});
  