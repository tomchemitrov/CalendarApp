import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ActionButton } from "../components/ActionButton";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoginRegisterScreen = ({ navigation }: any) => {
  const [isRegister, setIsRegister] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login/Register Screen</Text>
        <Text style={styles.title}>
          {isRegister ? "Sign up to get started" : "Sign in to continue"}
        </Text>
      </View>

      <View style={styles.fieldsContainer}>

        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
        />
        {isRegister && (
          <>
            <Text style={styles.fieldTitle}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm your password"
              secureTextEntry
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </>
        )}
      </View>


      <View>
        <ActionButton
          title={isRegister ? "Register" : "Sign In"}
          onPress={isRegister ? handleRegister : handleLogin}
        />

        <View style={styles.accountText}>
          <Text>
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
            <Text style={{ color: "#007AFF" }}>
              {isRegister ? " Sign In" : " Register"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  accountText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16
  },
  fieldsContainer: {
    gap: 12
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  header: {
    alignItems: "center",
    gap: 4,
    marginTop: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: "bold"
  }
});