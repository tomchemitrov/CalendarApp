import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DayItem } from "./DayItem";
import { useState } from "react";
import { getCalendarDays, isSameDay } from "../utils/Utils";
import Ionicons from "react-native-vector-icons/Ionicons";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarComponentProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export const CalendarComponent = ({ selectedDate, onSelectDate }: CalendarComponentProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const calendarDays = getCalendarDays(currentMonth);

    function handlePrevMonth() {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    }

    function handleNextMonth() {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePrevMonth}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.monthTitle}>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</Text>
                <TouchableOpacity onPress={handleNextMonth}>
                    <Ionicons name="arrow-forward" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.weekDays}>
                {WEEK_DAYS.map((day) =>
                    <Text
                        key={day}
                        style={styles.weekDayText}
                    >{day}</Text>)}
            </View>

            <FlatList
                numColumns={7}
                data={calendarDays}
                renderItem={({ item }) =>
                    item.isEmpty ? (
                        <View style={styles.emptyDay} />
                    ) : (
                        <DayItem
                            day={item.day}
                            onPress={() => onSelectDate(item.date)}
                            isSelected={isSameDay(selectedDate, item.date)}
                        />
                    )
                } keyExtractor={(item) => item.id}
                scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        gap: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
    },
    weekDays: {
        flexDirection: "row",
    },
    weekDayText: {
        flex: 1,
        textAlign: "center",
        marginRight: 4,
        fontWeight: "bold",
    },
    emptyDay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 8,
        marginRight: 4,
        marginBottom: 4,
        padding: 4,
    },
    monthTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
})