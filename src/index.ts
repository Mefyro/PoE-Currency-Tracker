import dotenv from "dotenv";
dotenv.config();

import { fetchCurrencyRates } from "./services/fetchRates";
import { getCurrencyThresholdsFromEnv } from "./services/configThresholds";
import { CurrencyThreshold } from "./types/thresholds";

const LEAGUE = process.env.LEAGUE ?? "Standard"; 

async function checkCurrencies() {
  const thresholds: CurrencyThreshold[] = getCurrencyThresholdsFromEnv();

  if (thresholds.length === 0) {
    console.warn("Aucun seuil de currency défini dans l'environnement.");
    return;
  }

  const data = await fetchCurrencyRates(LEAGUE);

  if (!data) {
    console.error("Cannot get data of currency.");
    return;
  }

  for (const { name, threshold } of thresholds) {
    const currency = data.lines.find(
      (line) => line.currencyTypeName.toLowerCase() === name.toLowerCase()
    );

    if (!currency) {
      console.warn(`Currency "${name}" Not found in the data.`);
      continue;
    }

    console.log(`Actual price ${name} : ${currency.chaosEquivalent} chaos`);

    if (currency.chaosEquivalent < threshold) {
      console.log(
        `Price of "${name}" is under (${threshold})`
      );
    }
  }
}

checkCurrencies();

