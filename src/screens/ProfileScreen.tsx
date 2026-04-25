import { StyleSheet, Text, View } from "react-native"
import { ActionButton } from "../components/ActionButton";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export const ProfileScreen = ({ navigation }: any) => {

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginRegister");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>User:</Text>
        <Text>John Doe</Text>
      </View>
      <ActionButton
        title="Sign Out"
        onPress={handleSignOut}
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