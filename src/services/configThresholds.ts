import { CurrencyThreshold } from "../types/thresholds";

const clean_name: Record<string, string> = {
  EXALT: "Exalted Orb",
  CHAOS: "Chaos Orb",
  DIVINE: "Divine Orb",
};

export function getCurrencyThresholdsFromEnv(): CurrencyThreshold[] {
  const thresholds: CurrencyThreshold[] = [];

  for (const [key, value] of Object.entries(process.env)) {
    console.log(key);
    if (key.endsWith("_THRESHOLD") && value) {

      const rawName = key.replace("_THRESHOLD", "");

      const currencyName = clean_name[rawName] ?? rawName
        .toLowerCase()
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const threshold = parseFloat(value);

      if (!isNaN(threshold)) {
        thresholds.push({ name: currencyName, threshold });
      }
    }
  }

  return thresholds;
}