import React from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../Table/CustomTable';
import './index.css';

const columns = [
  { id: 'image', label: 'Coin', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'symbol',
    label: 'Symbol',
    minWidth: 100
  },
  {
    id: 'current_price',
    label: 'Current Price',
    minWidth: 170,
    align: 'right',
    format: (value) => `€ ${value}`
  },
  {
    id: 'high_24h',
    label: 'High 24 Hr Price',
    minWidth: 170,
    align: 'right',
    format: (value) => `€ ${value}`
  },
  {
    id: 'low_24h',
    label: 'Low 24 Hr Price',
    minWidth: 170,
    align: 'right',
    format: (value) => `€ ${value}`
  }
];

const CoinTable = (props) => {
  const { isLoading, currentPage, markets, coinData, getCoinMarketsBypage, getCoinDateByCoinId } =
    props;

  const handlePageChange = async (pageNo, perPage) => {
    try {
      await getCoinMarketsBypage({ pageNo, perPage });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowClick = async (coinId) => {
    try {
      await getCoinDateByCoinId({ coinId });
    } catch (error) {
      console.error(error);
    }
  };
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

CoinTable.propTypes = {
  isLoading: PropTypes.bool,
  currentPage: PropTypes.number,
  markets: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  coinData: PropTypes.objectOf(PropTypes.string),
  getCoinMarketsBypage: PropTypes.func,
  getCoinDateByCoinId: PropTypes.func
};

CoinTable.defaultProps = {
  isLoading: false,
  currentPage: 0,
  markets: [],
  coinData: {},
  getCoinMarketsBypage: () => {},
  getCoinDateByCoinId: () => {}
};
