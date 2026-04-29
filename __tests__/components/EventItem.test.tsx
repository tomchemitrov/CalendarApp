import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import { EventItem } from "../../src/components/EventItem";
import { Event } from "../../src/types/types";

const event: Event = {
  id: "event-1",
  userId: "user-1",
  title: "Team Meeting",
  date: "2026-04-28",
  time: "10:30",
};

describe("EventItem", () => {
  it("renders the event title and time", () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <EventItem event={event} onPress={jest.fn()} />,
      );
    });

    const textValues = renderer!.root.findAllByType(Text).map((text) => {
      return text.props.children;
    });

    expect(textValues).toEqual(["Team Meeting", "10:30"]);
    expect(renderer!.toJSON()).toMatchSnapshot();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <EventItem event={event} onPress={onPress} />,
      );
    });

    act(() => {
      renderer!.root.findByType(TouchableOpacity).props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
