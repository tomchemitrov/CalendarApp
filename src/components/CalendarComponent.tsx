import { StyleSheet, Text, View } from "react-native"

export const CalendarComponent = () => {
    return (
        <View style={styles.container}>
            <Text>Calendar Component</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
})