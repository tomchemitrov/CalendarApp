import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "./ActionButton";
interface AddEventDialogProps {
  isEdit: boolean;
  visible: boolean;
  onClose: () => void;
  event?: Event;
}
export const AddEventDialog = ({ visible, onClose, isEdit, event }: AddEventDialogProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.dialog}>
          <Text style={styles.title}>Add Event</Text>
          <View style={styles.content}>
            <Text>TODO: Add event form fields</Text>
            <Text>Title</Text>
            <Text>Date</Text>
            <Text>Time</Text>
            <ActionButton
              title={isEdit ? "Edit Event" : "Add Event"}
              onPress={onClose}
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
});