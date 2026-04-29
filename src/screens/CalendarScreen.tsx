import { FlatList, StyleSheet, Text, View } from "react-native"
import { CalendarComponent } from "../components/CalendarComponent"
import { ActionButton } from "../components/ActionButton"
import { EventItem } from "../components/EventItem"
import { useCallback, useEffect, useState } from "react"
import { AddEventDialog } from "../components/AddEventDialog"
import { formatDateKey } from "../utils/Utils"
import { addEvent, editEvent, getEventsForSelectedDay } from "../services/eventsService"
import { Event } from "../types/types"


export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddEventDialogVisible, setIsAddEventDialogVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  const selectedDateKey = formatDateKey(selectedDate);

  const fetchEvents = useCallback(async () => {
    const selectedDayEvents = await getEventsForSelectedDay(selectedDateKey);
    setEvents(selectedDayEvents);
  }, [selectedDateKey]);

  async function handleSaveEvent(event: Omit<Event, "id">) {
    if (selectedEvent) {
      await editEvent(selectedEvent.id, event);
    } else {
      await addEvent(event);
    }
    setIsAddEventDialogVisible(false);
    setSelectedEvent(undefined);
    await fetchEvents();
  }

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
  }

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <View style={styles.container}>
      <CalendarComponent
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      <Text style={styles.eventsTitle}>Events for {selectedDate.toLocaleDateString()}</Text>
      {events.length > 0 ? (
        <FlatList
          horizontal
          data={events}
          renderItem={({ item }) =>
            <EventItem
              event={item}
              onPress={() => {
                setSelectedEvent(item);
                setIsAddEventDialogVisible(true);
              }}
            />
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noEventsText}>No events for this date</Text>
      )}
      <ActionButton
        title="Add Event"
        onPress={() => {
          setSelectedEvent(undefined);
          setIsAddEventDialogVisible(true);
        }}
        style={styles.button}
      />

      <AddEventDialog
        visible={isAddEventDialogVisible}
        onClose={() => setIsAddEventDialogVisible(false)}
        event={selectedEvent}
        selectedDate={selectedDateKey}
        onSave={handleSaveEvent}
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
  },
  noEventsText: {
    fontSize: 16,
    textAlign: "center",
    margin: 16,
  },
})