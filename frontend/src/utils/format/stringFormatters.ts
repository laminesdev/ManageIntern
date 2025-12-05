export const truncateText = (text: string, maxLength: number): string => {
   if (text.length <= maxLength) return text;
   return text.substring(0, maxLength) + "...";
};

export const capitalize = (text: string): string => {
   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const snakeToTitleCase = (text: string): string => {
   return text
      .split("_")
      .map((word) => capitalize(word))
      .join(" ");
};
