import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const SplashScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  }
})