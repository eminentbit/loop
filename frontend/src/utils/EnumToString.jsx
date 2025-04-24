/**
 * Converts an ENUM string to a readable format
 * @param {string} enumValue - The ENUM value to convert (e.g., "VERY_HIGH")
 * @returns {string} - The formatted string (e.g., "Very High")
 */
export const enumToString = (enumValue) => {
  if (!enumValue) return "";

  return enumValue
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const enumToSalary = (enumValue) => {
  if (!enumValue) return "";

  const salaryRanges = {
    LOW: "30k - 50k",
    MEDIUM: "50k - 70k",
    HIGH: "70k - 100k",
    VERY_HIGH: "100k+",
  };

  return salaryRanges[enumValue] || enumValue;
};
