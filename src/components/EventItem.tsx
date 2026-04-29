import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Event } from "../types/types";

interface EventItemProps {
  event: Event;
  onPress: () => void;
}

export const EventItem = ({ event, onPress }: EventItemProps) => {
  return (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={onPress}
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
    gap: 4,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  eventTime: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});