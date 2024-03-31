import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "./../../Utils/Colors";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "./../../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("./../../../assets/images/logo.png")}
        style={styles.logoImage}
      />

      <Image
        source={require("./../../../assets/images/intro.png")}
        style={styles.intro1}
      />

      <View style={{ padding: 20 }}>
        <Text style={styles.headig}>
          Your Ultimate EV Charging Station Finder App
        </Text>
        <Text style={styles.desc}>
          Find EV charging station near you, plan trip and so much more in just
          one click
        </Text>

        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Login With Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: "80%",
    borderRadius: 50,
    height: 190,
    marginTop: 25,
    objectFit: "contain",
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.GRAY,
  },
  intro1: {
    width: "100%",
    height: 240,
    marginTop: 35,
    objectFit: "cover",
  },
  headig: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginTop: 25,
  },
  desc: {
    fontSize: 17,
    textAlign: "center",
    fontFamily: "outfit",
    marginTop: 35,
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 45,
  },
});
