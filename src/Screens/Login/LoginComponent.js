import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  View,
  TextInput
} from "react-native";
import { Button } from "../../Components";
import { storeAccessToken, Login } from "../../Services/Auth/Auth";
import { Colors } from "../../Config";

export default class LoginComponent extends Component {
  state = {
    email: "",
    password: ""
  };

  login = async () => {
    try {
      const response = await Login(this.state.email, this.state.password);

      await storeAccessToken(response.data.token);
      await this.props.navigation.navigate("Main");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../../assets/images/background/backgroundImage.png")}
      >
        <View style={styles.logoContainer}>
          <Image
            style={{ width: "80%" }}
            resizeMode={"contain"}
            source={require("../../../assets/images/logo/goUrbanMobilityWhiteLogo.png")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder="Input email"
            placeholderTextColor="white"
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="Input password"
            placeholderTextColor="white"
            secureTextEntry={true}
          />
          <Button
            containerStyles={styles.button}
            textStyles={{ color: Colors.WHITE }}
            title={"Login"}
            onPress={() => this.login()}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.text}>Powered by Roami</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  text: {
    alignSelf: "center",
    color: Colors.WHITE
  },
  logoContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  labelContainer: {
    alignItems: "flex-end"
  },
  button: {
    backgroundColor: Colors.BUTTON_TRANSPARENT_COLOR,
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10
  }
});
