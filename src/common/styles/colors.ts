type Neutral =
  | "white"
  | "black"
  | "clear"
  | "red"
  | "grayF7"
  | "grayF5"
  | "grayFA"
  | "grayE1"
  | "grayB3"
  | "gray800"
  | "gray33"
  | "gray66"
  | "gray99";
export const neutral: Record<Neutral, string> = {
  white: "#ffffff",
  grayF7: "#F7F7F7",
  grayF5: "#F5F5F5",
  grayFA: "#FAFAFA",
  grayE1: "#E1E1E1",
  grayB3: "#B3B3B3",
  gray800: "#1F2937",
  black: "#000000",
  clear: "rgba(0,0,0,0)",
  gray33: "#333",
  gray66: "#666",
  gray99: "#999",
  red: "#FF0000"
};

type Primary = "primary" | "red" | "green" | "orange";
export const theme: Record<Primary, string> = {
  primary: "#17D1EB",
  red: "#FF4D4D",
  green: "#55C21B",
  orange: "#FF6A2A"
};
