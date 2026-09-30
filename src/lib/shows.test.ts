import { describe, expect, it } from "vitest";
import { daysUntil, formatLong, formatSlashes, formatWeekday, getNextShow, getPastShows, isPastShow } from "./shows";

const show = (id: string, date: string) => ({ id, date });
// 2026-10-15 15:00 UTC = 12:00 in Mendoza (UTC-3).
const NOW = new Date("2026-10-15T15:00:00Z");

describe("isPastShow", () => {
  it("is false for future dates", () => {
    expect(isPastShow(show("a", "2026-10-20"), NOW)).toBe(false);
  });

  it("is true for earlier dates", () => {
    expect(isPastShow(show("a", "2026-10-07"), NOW)).toBe(true);
  });

  it("keeps the show day itself as upcoming", () => {
    expect(isPastShow(show("a", "2026-10-15"), NOW)).toBe(false);
  });

  it("uses Mendoza time, not UTC", () => {
    // 01:00 UTC on the 16th is still 22:00 on the 15th in Mendoza.
    expect(isPastShow(show("a", "2026-10-15"), new Date("2026-10-16T01:00:00Z"))).toBe(false);
    // 03:00 UTC on the 16th is midnight in Mendoza: the 15th is over.
    expect(isPastShow(show("a", "2026-10-15"), new Date("2026-10-16T03:00:00Z"))).toBe(true);
  });
});

describe("getNextShow", () => {
  it("returns the earliest show when all are in the future", () => {
    const shows = [show("c", "2026-12-09"), show("a", "2026-10-20"), show("b", "2026-11-01")];
    expect(getNextShow(shows, NOW)?.id).toBe("a");
  });

  it("skips past shows", () => {
    const shows = [show("past", "2026-10-07"), show("next", "2026-10-23"), show("later", "2026-11-13")];
    expect(getNextShow(shows, NOW)?.id).toBe("next");
  });

  it("returns null when every show is past", () => {
    const shows = [show("a", "2026-10-01"), show("b", "2026-10-07")];
    expect(getNextShow(shows, NOW)).toBeNull();
  });

  it("returns null for an empty list", () => {
    expect(getNextShow([], NOW)).toBeNull();
  });

  it("picks the closer of two shows on different dates regardless of order", () => {
    expect(getNextShow([show("late", "2026-11-25"), show("soon", "2026-10-31")], NOW)?.id).toBe("soon");
    expect(getNextShow([show("soon", "2026-10-31"), show("late", "2026-11-25")], NOW)?.id).toBe("soon");
  });

  it("does not mutate the input", () => {
    const shows = [show("b", "2026-11-01"), show("a", "2026-10-20")];
    getNextShow(shows, NOW);
    expect(shows.map((s) => s.id)).toEqual(["b", "a"]);
  });
});

describe("getPastShows", () => {
  it("lists past shows newest first", () => {
    const shows = [show("old", "2026-01-01"), show("recent", "2026-10-07"), show("future", "2026-12-01")];
    expect(getPastShows(shows, NOW).map((s) => s.id)).toEqual(["recent", "old"]);
  });
});

describe("date formatting", () => {
  it("formats dates without time zone drift", () => {
    expect(formatLong("2026-10-07")).toBe("07 OCT 2026");
    expect(formatSlashes("2026-10-07")).toBe("07 / 10 / 26");
    expect(formatWeekday("2026-10-07")).toBe("MIÉ");
  });
});

describe("daysUntil", () => {
  it("counts days in Mendoza time", () => {
    expect(daysUntil("2026-10-15", NOW)).toBe(0);
    expect(daysUntil("2026-10-23", NOW)).toBe(8);
    expect(daysUntil("2027-01-01", NOW)).toBe(78);
  });
});
