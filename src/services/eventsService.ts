import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import { Event, EventInput } from "../types/types";

function getCurrentUserId() {
    return auth.currentUser?.uid;
}

export async function addEvent(event: EventInput) {
    const userId = getCurrentUserId();
    const docRef = await addDoc(collection(db, "events"), {
        ...event,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function editEvent(eventId: string, event: EventInput) {
    const userId = getCurrentUserId();
    await updateDoc(doc(db, "events", eventId), {
        ...event,
        userId,
        updatedAt: serverTimestamp(),
    });
}

export async function getEventsForSelectedDay(date: string): Promise<Event[]> {
    const userId = getCurrentUserId();
    const eventsQuery = query(
        collection(db, "events"),
        where("userId", "==", userId),
    );
    const snapshot = await getDocs(eventsQuery);
    return snapshot.docs
        .map((eventDoc) => {
            const data = eventDoc.data();
            return {
                id: eventDoc.id,
                title: data.title,
                date: data.date,
                time: data.time,
                userId: data.userId,
            };
        })
        .filter((event) => event.date === date)
        .sort((firstEvent, secondEvent) =>
            firstEvent.time.localeCompare(secondEvent.time),
        );
}