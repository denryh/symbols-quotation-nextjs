"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import BTC from "../icons/btc";
import ETH from "../icons/eth";
import { SymbolStatus } from "./table";

import "@/lib/binance";

export default function SymbolQuotationRows() {
  const symbols: SymbolStatus[] = [
    {
      icon: <BTC className="size-4" />,
      label: "BTC/USDC",
      price: 70499.91,
      change24h: 0.62,
      volume24h: 30.497,
      volume24hUSD: 2152590,
    },
    {
      icon: <ETH className="size-4" />,
      label: "ETH/USDC",
      price: 3607.02,
      change24h: 1.76,
      volume24h: 212.3021,
      volume24hUSD: 767438,
    },
  ];

  return symbols.map((symbol) => (
    <SymbolQuotationRow key={symbol.label} {...symbol} />
  ));
}

function SymbolQuotationRow({
  icon,
  label,
  price,
  change24h,
  volume24h,
  volume24hUSD,
}: SymbolStatus) {
  return (
    <TableRow>
      <TableCell className="font-bold">
        <Pair icon={icon} label={label} className="gap-2" />
      </TableCell>

      <TableCell className="text-right">
        <Pair
          icon={"($)"}
          label={price.toString()}
          className="justify-end gap-0.5"
        />
      </TableCell>

      <TableCell
        className={`text-right ${
          change24h > 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {change24h > 0 ? "+" : "-"}
        {change24h}%
      </TableCell>

      <TableCell className="text-right">
        <Pair
          icon={"($)"}
          label={volume24h.toString()}
          className="justify-end gap-0.5"
        />
      </TableCell>

      <TableCell className="text-right">${volume24hUSD}</TableCell>
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
