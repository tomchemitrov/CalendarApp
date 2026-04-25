import { FlatList, StyleSheet, Text, View } from "react-native"
import { CalendarComponent } from "../components/CalendarComponent"
import { ActionButton } from "../components/ActionButton"

export const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <CalendarComponent />
      <FlatList
        data={["Item 1", "Item 2", "Item 3"]}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <ActionButton
        title="Add Event"
        onPress={() => console.log("Add Event Pressed")}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    margin: 16
  }
})