import React from 'react';
import { shallow } from 'enzyme';
import CoinTable from './CoinTable';
import CustomTable from '../Table/CustomTable';

const setUp = (props = {}) => {
  const wrapper = shallow(<CoinTable {...props} />);
  return wrapper;
};

describe('CoinTable', () => {
  describe('has props', () => {
    let wrapper;
    let props;
    let state;
    beforeEach(() => {
      props = {
        isLoading: false,
        currentPage: 0,
        markets: [
          { id: 1, image: 'image', name: 'name', symbol: 'byt', current_price: 1 },
          { id: 2, image: 'image', name: 'name', symbol: 'byt', current_price: 1 },
          { id: 3, image: 'image', name: 'name', symbol: 'byt', current_price: 1 }
        ],
        coinData: {},
        getCoinMarketsBypage: jest.fn(),
        getCoinDateByCoinId: jest.fn(),
        columns: [
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
            format: (value) => `$${value}`
          },
          {
            id: 'high_24h',
            label: 'High 24 Hr Price',
            minWidth: 170,
            align: 'right',
            format: (value) => `$${value}`
          },
          {
            id: 'low_24h',
            label: 'Low 24 Hr Price',
            minWidth: 170,
            align: 'right',
            format: (value) => `$${value}`
          }
        ]
      };
      wrapper = setUp(props, state);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
    it('should render Table Component', () => {
      const component = wrapper;
      expect(component.find('.cointable-component')).toHaveLength(1);
    });
    it('should call getCoinMarketsBypage when page is changed', async () => {
      const pageNumber = 0;
      const perPage = 10;
      const getCoinMarketsBypage = await props.getCoinMarketsBypage(pageNumber, perPage);
      const handleOnPageChange = jest.spyOn(props, 'getCoinMarketsBypage');
      const component = shallow(
        <CoinTable {...props} getCoinMarketsBypage={getCoinMarketsBypage} />
      );

      component.find(CustomTable).simulate('onPageChange');
      expect(handleOnPageChange).toHaveBeenCalledWith(pageNumber, perPage);
    });
    it('should catch error if getCoinMarketsBypage does crashes', async () => {
      const pageNumber = 0;
      const perPage = 10;
      try {
        await props.getCoinMarketsBypage(pageNumber, perPage);
      } catch (e) {
        expect(e).toThrowError();
      }
    });
  });
});
