import React, { useEffect } from "react";

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

  useEffect(()=>{console.log(markets)},[markets])
  const onClick = async () => {
    const response = await getCoinMarketsBypage({pageNo:1});
    console.log(response, props);
  };
  return (
    <div>
      <button onClick={onClick}>submit</button>
      {/* {markets ?? markets} */}
    </div>
  );
};

export default CoinTable;
