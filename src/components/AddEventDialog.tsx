import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActionButton } from "./ActionButton";
import { useEffect, useState } from "react";
import { Event } from "../types/types";
import Ionicons from "react-native-vector-icons/Ionicons";

interface AddEventDialogProps {
  visible: boolean;
  onClose: () => void;
  event?: Event;
  selectedDate: string;
  onSave: (event: Omit<Event, "id">) => Promise<void>;
}

export const AddEventDialog = ({ visible, onClose, event, selectedDate, onSave }: AddEventDialogProps) => {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");

  useEffect(() => {
    setTitle(event?.title || "");
    setDate(event?.date || "");
    setTime(event?.time || "");
  }, [event, selectedDate, visible]);

  async function handleAddEvent() {
    if (!validateFields()) {
      return;
    }

    await onSave({
      title,
      date: date || selectedDate,
      time,
    });
  }

  function validateFields() {
    if (title.length === 0) {
      Alert.alert("Error", "Title is required");
      return false;
    }
    if (time.length === 0) {
      Alert.alert("Error", "Time is required");
      return false;
    }
    return true;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.dialog}>
          <View style={styles.header}>
            <Text style={styles.title}>{event ? "Edit Event" : "Add Event"}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text>Title</Text>
            <TextInput
              placeholder="Enter title"
              style={styles.textInput}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text>Date</Text>
            <TextInput
              placeholder="Enter date"
              style={styles.textInput}
              value={date}
              onChangeText={(text) => setDate(text)}
            />
            <Text>Time</Text>
            <TextInput
              placeholder="Enter time"
              style={styles.textInput}
              value={time}
              onChangeText={(text) => setTime(text)}
            />
            <ActionButton
              title={event ? "Edit Event" : "Add Event"}
              onPress={handleAddEvent}
              style={{ marginTop: 16 }}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dialog: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    gap: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  header: {
    justifyContent: "space-between",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});