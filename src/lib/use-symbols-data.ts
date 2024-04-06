"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type compressedData = {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  x: string;
  c: string;
  Q: string;
  b: string;
  B: string;
  a: string;
  A: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
};

export function useSymbolsData() {
  const [data, setData] = useState<{ [key: string]: compressedData }>();

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=btcusdc@ticker/ethusdt@ticker"
    );

    socket.onopen = () => console.debug("Connected to WebSocket server");
    socket.onclose = () => console.debug("Disconnected from WebSocket server");
    socket.onmessage = (event: MessageEvent<string>) => {
      try {
        let data: { stream: string; data: compressedData } = JSON.parse(
          event.data
        );

        flushSync(() => {
          setData((prev) => ({ ...prev, [data.stream]: data.data }));
        });
      } catch {
        console.error("Failed to parse message from Binance stream");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return data;
}
