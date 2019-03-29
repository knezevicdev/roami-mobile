import { StyleSheet, Dimensions } from "react-native";

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
    }
});