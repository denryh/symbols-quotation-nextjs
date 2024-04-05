"use client";

import { useEffect } from "react";

interface compressedAggregateTradesListResponse {
  a: number;
  p: string;
  q: string;
  f: number;
  l: number;
  T: number;
  m: boolean;
  M: boolean;
}

export function useSymbolsData() {
  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=btcusdc@aggTrade"
    );

    socket.onopen = () => console.debug("Connected to WebSocket server");
    socket.onclose = () => console.debug("Disconnected from WebSocket server");
    socket.onmessage = (event: MessageEvent<string>) => {
      try {
        let data: compressedAggregateTradesListResponse = JSON.parse(
          event.data
        );

        console.log(data);
      } catch {
        console.error("Failed to parse message from Binance stream");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return;
}
