import {
  formatDateKey,
  formatTimeKey,
  getCalendarDays,
  isSameDay,
} from "../../src/utils/Utils";

describe("formatDateKey", () => {
  it("formats a date as YYYY-MM-DD", () => {
    expect(formatDateKey(new Date(2026, 3, 8))).toBe("2026-04-08");
  });
});

describe("formatTimeKey", () => {
  it("formats a date as HH:mm", () => {
    expect(formatTimeKey(new Date(2026, 3, 8, 9, 5))).toBe("09:05");
  });
});

describe("isSameDay", () => {
  it("returns true for dates on the same calendar day", () => {
    expect(
      isSameDay(
        new Date(2026, 3, 28, 9, 30),
        new Date(2026, 3, 28, 22, 15),
      ),
    ).toBe(true);
  });

  it("returns false for dates on different calendar days", () => {
    expect(isSameDay(new Date(2026, 3, 28), new Date(2026, 3, 29))).toBe(
      false,
    );
  });
});

describe("getCalendarDays", () => {
  it("builds calendar cells for April 2026", () => {
    const days = getCalendarDays(new Date(2026, 3, 1));
    const realDays = days.filter((day) => !day.isEmpty);

    expect(days).toHaveLength(35);
    expect(days.slice(0, 2).every((day) => day.isEmpty)).toBe(true);
    expect(realDays).toHaveLength(30);
    expect(realDays[0].day).toBe("1");
    expect(realDays[29].day).toBe("30");
  });

  it("includes 29 days for leap-year February", () => {
    const days = getCalendarDays(new Date(2024, 1, 1));
    const realDays = days.filter((day) => !day.isEmpty);

    expect(realDays).toHaveLength(29);
    expect(realDays[28].day).toBe("29");
  });
});
