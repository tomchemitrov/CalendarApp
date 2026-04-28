import {
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { Event } from "../types/types";

type EventInput = Omit<Event, "id">;

export async function addEvent(event: EventInput) {
    const docRef = await addDoc(collection(db, "events"), {
        ...event,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function editEvent(eventId: string, event: EventInput) {
    await updateDoc(doc(db, "events", eventId), {
        ...event,
        updatedAt: serverTimestamp(),
    });
}

export async function getEventsForSelectedDay(date: string): Promise<Event[]> {
    const eventsQuery = query(
        collection(db, "events"),
        where("date", "==", date),
        orderBy("time", "asc"),
    );
    const snapshot = await getDocs(eventsQuery);
    return snapshot.docs.map((eventDoc) => {
        const data = eventDoc.data();
        return {
            id: eventDoc.id,
            title: data.title,
            date: data.date,
            time: data.time,
        };
    });
}