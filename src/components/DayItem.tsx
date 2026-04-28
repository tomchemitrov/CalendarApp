import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface DayItemProps {
    day: string;
    onPress: () => void;
    isSelected: boolean;
}

export const DayItem = ({ day, onPress, isSelected }: DayItemProps) => {
    return (
        <TouchableOpacity style={[styles.dayItem, isSelected && styles.selectedDay]} onPress={onPress}>
            <Text style={isSelected && styles.selectedDayText}>{day}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dayItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        marginRight: 4,
        marginBottom: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,

    },
    selectedDay: {
        backgroundColor: "#007AFF",
        color: "white",
    },
    selectedDayText: {
        color: "white",
    },
})