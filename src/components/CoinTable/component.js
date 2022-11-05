import React, { useEffect } from "react";
import CustomTable from "../Table/component";
import "./index.css";

const columns = [
  { id: "image", label: "Coin", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "symbol",
    label: "Symbol",
    minWidth: 170,
    align: "right",
  },
  {
    id: "current_price",
    label: "Current Price",
    minWidth: 170,
    align: "right",
  },
  {
    id: "high_24h",
    label: "High 24 Hr Price",
    minWidth: 170,
    align: "right",
  },
  {
    id: "low_24h",
    label: "Low 24 Hr Price",
    minWidth: 170,
    align: "right",
  },
];

const CoinTable = (props) => {
  const {
    isLoading,
    hasError,
    currentResponseId,
    currentPage,
    markets,
    coinData,
    getCoinMarketsBypage,
    getCoinDateByCoinId,
  } = props;

  const onPageChange = async (pageNo, perPage) => {
    await getCoinMarketsBypage({ pageNo, perPage });
  };
  return (
    <div className="cointable-component">
      <CustomTable
        isLoading={isLoading}
        hasError={hasError}
        currentPage={currentPage}
        tableData={markets}
        columns={columns}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CoinTable;
