import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Event } from "../types/types";

export const EventItem = ({ event }: { event: Event }) => {
  return (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => console.log("Event pressed")}
      activeOpacity={0.7}
    >
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventTime}>{event.time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventItem: {
    width: 100,
    height: 100,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventTime: {
    fontSize: 14,
    color: 'gray',
  },
});