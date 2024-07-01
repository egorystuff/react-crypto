import { cryptoData, cryptoAssets, type CryptoData, type CryptoAssetsData } from "./data";

export function fakeFetchCryptoData(): Promise<CryptoData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 200);
  });
}
export function fetchAssets(): Promise<CryptoAssetsData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 200);
  });
}
