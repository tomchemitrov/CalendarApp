import { StyleSheet, Text, View } from "react-native"
import { ActionButton } from "../components/ActionButton";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>User:</Text>
        <Text>John Doe</Text>
      </View>
      <ActionButton
        title="Sign Out"
        onPress={() => console.log("Sign Out Pressed")}
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
  }
});