import { Alert, StyleSheet, Text, View } from "react-native"
import { ActionButton } from "../components/ActionButton";
import { useState } from "react";
import { getAuthErrorMessage, getCurrentUser, logout } from "../services/authService";

export const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user = getCurrentUser();

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      Alert.alert("Error", getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Text>Signed in user:</Text>
        <Text style={styles.userText}>{user?.email}</Text>
      </View>
      <ActionButton
        title="Sign Out"
        onPress={handleSignOut}
        disabled={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "space-between"
  },
  userContainer: {
    gap: 16,
  },
  userText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});