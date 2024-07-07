import React from "react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { fakeFetchCryptoData, fetchAssets } from "../api";
import { CryptoAssetsData, CryptoType } from "../data";
import { percentDifference } from "../utils";

export interface CryptoContextType {
  loading: boolean;
  crypto: any[];
  assets: any[];
  addAssets: (newAssets: CryptoAssetsData) => void;
}

const CryptoContext = createContext<CryptoContextType>({
  loading: false,
  crypto: [],
  assets: [],
  addAssets: () => {},
});

export function CryptoContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<CryptoType[]>([]);
  const [assets, setAssets] = useState<CryptoAssetsData[]>([]);

  const mapAssets = (assets: CryptoAssetsData[], result: CryptoType[]) => {
    return assets.map((asset: CryptoAssetsData) => {
      const coin = result.find((c: CryptoType) => c.id === asset.id);

      return {
        grow: asset.price < (coin?.price ?? 0),
        growPercent: percentDifference(coin?.price ?? 0, asset.price),
        totalAmount: asset.amount * (coin?.price ?? 0),
        totalProfit: asset.amount * (asset.price - (coin?.price ?? 0) - asset.amount * asset.price),
        name: coin?.name,
        ...asset,
      };
    });
  };

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCryptoData();
      const assets = await fetchAssets();

      setAssets(mapAssets(assets, result));

      setCrypto(result);

      setLoading(false);
    }

    preload();
    console.log(assets);
  }, []);

  const addAssets = (newAssets: CryptoAssetsData) => {
    setAssets((prev) => mapAssets([...prev, newAssets], crypto));
  };

  return <CryptoContext.Provider value={{ loading, crypto, assets, addAssets }}>{children}</CryptoContext.Provider>;
}

export default CryptoContext;
