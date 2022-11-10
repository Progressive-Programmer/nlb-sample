import React from "react";
import CustomTable from "../Table/CustomTable";
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

  const handlePageChange = async (pageNo, perPage) => {
    try {
      await getCoinMarketsBypage({ pageNo, perPage });
    } catch (error) {
      console.log(error)
    }
  };

  const handleRowClick = async (coinId) => {
    try {
      await getCoinDateByCoinId({ coinId })
    } catch (error) {
     console.log(error) 
    }
  }
  return (
    <div className="cointable-component">
      <CustomTable
        isLoading={isLoading}
        currentPage={currentPage}
        tableData={markets}
        coinData={coinData}
        columns={columns}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default CoinTable;
