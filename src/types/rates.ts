export interface CurrencyRate {
  currencyTypeName: string;
  chaosEquivalent: number;
  divineValue?: number;
  pay?: {
    id: string;
    league_id: string;
    stock: number;
    price: number;
  };
  receive?: {
    id: string;
    league_id: string;
    stock: number;
    value: number;
  };
}

export interface CurrencyRatesResponse {
  lines: CurrencyRate[];
  currencyDetails: Array<{
    id: number;
    name: string;
    icon: string;
    tradeId?: string;
  }>;
}