import React from "react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { fakeFetchCryptoData, fetchAssets } from "../api";
import { CryptoAssetsData, CryptoType } from "../data";
import { percentDifference } from "../utils";

export interface CryptoContextType {
  loading: boolean;
  crypto: any[];
  assets: any[];
}

const CryptoContext = createContext<CryptoContextType>({
  loading: false,
  crypto: [],
  assets: [],
});

export function CryptoContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<CryptoType[]>([]);
  const [assets, setAssets] = useState<CryptoAssetsData[]>([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCryptoData();
      const assets = await fetchAssets();

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);

          return {
            grow: asset.price < (coin?.price ?? 0),
            growPercent: percentDifference(coin?.price ?? 0, asset.price),
            totalAmount: asset.amount * (coin?.price ?? 0),
            totalProfit: asset.amount * (asset.price - (coin?.price ?? 0) - asset.amount * asset.price),
            ...asset,
          };
        }),
      );

      setCrypto(result);

      setLoading(false);
    }

    preload();
    console.log(assets);
  }, []);

  return <CryptoContext.Provider value={{ loading, crypto, assets }}>{children}</CryptoContext.Provider>;
}

export default CryptoContext;
