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
    VERY_LOW: "<$50,000 ",
    LOW: "$50,000 - $70,000",
    MEDIUM: "$70,000 - $90,000",
    HIGH: "$90,000 - $120,000",
    VERY_HIGH: ">$120,000 - $150,000",
    ULTRA: "$150,000+",
  };

  return salaryRanges[enumValue] || enumValue;
};
