"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SymbolQuotationRows from "./rows";

export type SymbolStatus = {
  icon: JSX.Element;
  label: string;
  price: number;
  change24h: number;
  volume24h: number;
  volume24hUSD: number;
};

export default SymbolsQuotationTable;

function SymbolsQuotationTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pair</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">24h Change</TableHead>
          <TableHead className="text-right">24h Volume (coin)</TableHead>
          <TableHead className="text-right">24h Volume USD</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <SymbolQuotationRows />
      </TableBody>
    </Table>
  );
}
