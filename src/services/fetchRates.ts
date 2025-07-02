import axios from "axios";
import { CurrencyRatesResponse } from "../types/rates";

const BASE_URL = "https://poe.ninja/api/data/currencyoverview";

export async function fetchCurrencyRates(
  league: string
): Promise<CurrencyRatesResponse | null> {
  const url = `${BASE_URL}?league=${encodeURIComponent(league)}&type=Currency`;

  try {
    const response = await axios.get<CurrencyRatesResponse>(url);

    if (response.status !== 200) {
      console.error(`Error API poe.ninja: ${response.status} ${response.statusText}`);
      return null;
    }

    return response.data;
  } catch (error: any) {
    console.error("Error when fetching data from poe.ninja:", error.message || error);
    return null;
  }
}