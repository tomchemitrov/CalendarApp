import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ActionButton } from "../components/ActionButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuthErrorMessage, register, signIn } from "../services/authService";

export const LoginRegisterScreen = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function isValidEmail(value: string) {
    return value.includes("@") && value.includes(".") && value.length > 0;
  }

  function isValidPassword(value: string) {
    return value.length >= 8;
  }

  function validateFields() {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (!isValidPassword(password)) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return false;
    }
    if (isRegister && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
  }

  async function handleLogin() {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Error", getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister() {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password);
    } catch (error) {
      Alert.alert("Error", getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Calendar App</Text>
        <Text style={styles.title}>
          {isRegister ? "Sign Up to get started" : "Sign In to continue"}
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
        {isLoading &&
          <ActivityIndicator size="large" color="#007AFF" style={{ marginBottom: 16 }} />
        }
        <ActionButton
          title={isRegister ? "Register" : "Sign In"}
          onPress={isRegister ? handleRegister : handleLogin}
          disabled={isLoading}
        />

        <View style={styles.accountText}>
          <Text>
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={() => {
            setIsRegister(!isRegister)
            setEmail("")
            setPassword("")
            setConfirmPassword("")
          }}>
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
    gap: 16,
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