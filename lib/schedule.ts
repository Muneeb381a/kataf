/**
 * Class batches. Men and women study in separate batches with their own timings.
 * TODO: replace these draft slots with the real timings.
 */
export type Slot = { id: string; name: string; time: string; days: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat")[] };

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const batches: Record<"men" | "women", { label: string; blurb: string; slots: Slot[] }> = {
  men: {
    label: "Men's batches",
    blurb: "Classes for men, in their own batches.",
    slots: [
      { id: "m-morning", name: "Morning", time: "9:00 am – 11:00 am", days: ["Mon", "Wed", "Fri"] },
      { id: "m-afternoon", name: "Afternoon", time: "2:00 pm – 4:00 pm", days: ["Tue", "Thu", "Sat"] },
      { id: "m-evening", name: "Evening", time: "6:00 pm – 8:00 pm", days: ["Mon", "Wed", "Fri"] },
    ],
  },
  women: {
    label: "Women's batches",
    blurb: "Classes for women, in their own batches.",
    slots: [
      { id: "w-morning", name: "Morning", time: "11:00 am – 1:00 pm", days: ["Mon", "Wed", "Fri"] },
      { id: "w-afternoon", name: "Afternoon", time: "2:00 pm – 4:00 pm", days: ["Mon", "Wed", "Fri"] },
      { id: "w-late", name: "Late afternoon", time: "4:00 pm – 6:00 pm", days: ["Tue", "Thu", "Sat"] },
    ],
  },
};

export const batchOptions = ["Men's batch", "Women's batch"] as const;
export const slotOptions = ["Morning", "Afternoon", "Evening", "No preference"] as const;
