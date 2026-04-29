import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ReactTestRenderer, { act } from "react-test-renderer";
import { ActionButton } from "../../src/components/ActionButton";

describe("ActionButton", () => {
  it("renders the button title", () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <ActionButton title="Add Event" onPress={jest.fn()} />,
      );
    });

    expect(renderer!.root.findByType(Text).props.children).toBe("Add Event");
    expect(renderer!.toJSON()).toMatchSnapshot();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <ActionButton title="Save" onPress={onPress} />,
      );
    });

    act(() => {
      renderer!.root.findByType(TouchableOpacity).props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("passes the disabled prop to the touchable", () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    act(() => {
      renderer = ReactTestRenderer.create(
        <ActionButton title="Save" onPress={jest.fn()} disabled />,
      );
    });

    expect(renderer!.root.findByType(TouchableOpacity).props.disabled).toBe(
      true,
    );
  });
});
