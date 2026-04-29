export interface Event {
  id: string;
  userId: string;
  title: string;
  date: string;
  time: string;
}

export type EventInput = Omit<Event, "id" | "userId">;