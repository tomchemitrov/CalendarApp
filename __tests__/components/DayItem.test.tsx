import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import { DayItem } from "../../src/components/DayItem";

describe("DayItem", () => {
  it("renders the day number", () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <DayItem day="28" isSelected={false} onPress={jest.fn()} />,
      );
    });

    expect(renderer!.root.findByType(Text).props.children).toBe("28");
    expect(renderer!.toJSON()).toMatchSnapshot();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <DayItem day="28" isSelected={false} onPress={onPress} />,
      );
    });

    act(() => {
      renderer!.root.findByType(TouchableOpacity).props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders selected state", () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <DayItem day="28" isSelected={true} onPress={jest.fn()} />,
      );
    });

    expect(renderer!.toJSON()).toMatchSnapshot();
  });
});
