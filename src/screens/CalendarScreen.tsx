import { FlatList, StyleSheet, Text, View } from "react-native"
import { CalendarComponent } from "../components/CalendarComponent"
import { ActionButton } from "../components/ActionButton"
import { EventItem } from "../components/EventItem"
import { useState } from "react"
import { AddEventDialog } from "../components/AddEventDialog"

const events = [
  { id: "1", title: "Event 1", time: "10:00" },
  { id: "2", title: "Event 2", time: "11:00" },
  { id: "3", title: "Event 3", time: "12:00" },
  { id: "4", title: "Event 4", time: "13:00" },
]

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddEventDialogVisible, setIsAddEventDialogVisible] = useState(false);

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
  }

  return (
    <View style={styles.container}>
      <CalendarComponent
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      <Text style={styles.eventsTitle}>Events for {selectedDate.toLocaleDateString()}</Text>
      <FlatList
        horizontal
        data={events}
        renderItem={({ item }) =>
          <EventItem
            event={item}
            onPress={() => setIsAddEventDialogVisible(true)}
          />
        }
        keyExtractor={(item) => item.id}
      />
      <ActionButton
        title="Add Event"
        onPress={() => setIsAddEventDialogVisible(true)}
        style={styles.button}
      />

      <AddEventDialog
        visible={isAddEventDialogVisible}
        onClose={() => setIsAddEventDialogVisible(false)}
        isEdit={false}
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
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  }
})