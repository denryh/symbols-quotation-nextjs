"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import BTC from "../icons/btc";
import ETH from "../icons/eth";
import { SymbolStatus } from "./table";

import "@/lib/use-symbols-data";
import { useSymbolsData } from "@/lib/use-symbols-data";
import { useEffect, useState } from "react";

export default function SymbolQuotationRows() {
  const data = useSymbolsData();

  if (!data) return;

  const symbols: SymbolStatus[] = [
    {
      icon: <BTC className="size-4" />,
      label: "BTC/USDC",
      price: Number(data["btcusdc@ticker"]?.c).toFixed(2),
      change24h: Number(Number(data["btcusdc@ticker"]?.P).toFixed(2)),
      volume24h: Number(data["btcusdc@ticker"]?.v).toFixed(3),
      volume24hUSD: data["btcusdc@ticker"]?.q,
    },
    {
      icon: <ETH className="size-4" />,
      label: "ETH/USDT",
      price: Number(data["ethusdt@ticker"]?.c).toFixed(2),
      change24h: Number(Number(data["ethusdt@ticker"]?.P).toFixed(2)),
      volume24h: Number(data["ethusdt@ticker"]?.v).toFixed(3),
      volume24hUSD: data["ethusdt@ticker"]?.q,
    },
  ];

  return symbols.map((symbol) => (
    <SymbolQuotationRow key={symbol.label} {...symbol} />
  ));
}

const priceFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function SymbolQuotationRow({
  icon,
  label,
  price,
  change24h,
  volume24h,
  volume24hUSD,
}: SymbolStatus) {
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setChanged(true);

    const timeoutId = setTimeout(() => {
      setChanged(false);
    }, 200);

    return () => timeoutId && clearTimeout(timeoutId);
  }, [price]);

  if (!price || !change24h || !volume24h || !volume24hUSD) {
    return;
  }

  return (
    <TableRow className={`transition-colors ${changed ? "bg-green-50" : ""}`}>
      <TableCell className="font-bold">
        <Pair icon={icon} label={label} className="gap-2" />
      </TableCell>

      <TableCell className="text-right">
        <Pair
          icon={"($)"}
          label={priceFormatter.format(Number(price))}
          className="justify-end gap-0.5"
        />
      </TableCell>

      <TableCell
        className={`text-right ${
          change24h > 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {change24h > 0 && "+"}
        {change24h}%
      </TableCell>

      <TableCell className="text-right">
        <Pair
          icon={"($)"}
          label={volume24h.toString()}
          className="justify-end gap-0.5"
        />
      </TableCell>

      <TableCell className="text-right">
        ${new Intl.NumberFormat("en").format(Math.floor(Number(volume24hUSD)))}
      </TableCell>
    </TableRow>
  );
}

function Pair({
  icon,
  label,
  className,
}: Readonly<{ icon: React.ReactNode; label: string; className?: string }>) {
  return (
    <div className={`grid grid-flow-col items-center ${className}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
