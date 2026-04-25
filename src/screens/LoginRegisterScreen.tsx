import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { ActionButton } from "../components/ActionButton";

export const LoginRegisterScreen = ({ navigation }: any) => {
  const [isRegister, setIsRegister] = useState(false)

  useEffect(() => {
    setIsRegister(false);
  }, [])

  function handleLogin() {
    console.log("Login")
    navigation.replace("Main");
  }

  function handleRegister() {
    console.log("Register")
    navigation.replace("Main");
  }

  return (
    <View style={styles.container}>
      <Text>Login/Register Screen</Text>

      <ActionButton
        title={isRegister ? "Register" : "Sign In"}
        onPress={isRegister ? handleRegister : handleLogin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  }
});