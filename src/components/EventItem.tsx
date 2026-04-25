import { View, Text, StyleSheet } from "react-native";
import { Event } from "../types/types";

export const EventItem = ({ event }: { event: Event }) => {
  return (
    <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventTime}>{event.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventItem: {
    padding: 10, 
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