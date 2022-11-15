import React from 'react';
import { shallow } from 'enzyme';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import CoinCard from '../CoinCard/CoinCard';
import CustomTable from './CustomTable';
import Loader from '../Backdrop/Loader';

const setUp = (props = {}) => {
  const wrapper = shallow(<CustomTable {...props} />);
  return wrapper;
};

describe('CustomTable', () => {
  describe('has props', () => {
    let wrapper;
    let props;
    let state;
    beforeEach(() => {
      props = {
        isLoading: false,
        currentPage: 0,
        tableData: [
          { id: 1, image: 'image', name: 'name', symbol: 'byt', current_price: 1 },
          { id: 2, image: 'image', name: 'name', symbol: 'byt', current_price: 1 },
          { id: 3, image: 'image', name: 'name', symbol: 'byt', current_price: 1 }
        ],
        coinData: {},
        onPageChange: jest.fn(),
        onRowClick: jest.fn(),
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
      state = {
        controller: {
          page: 0,
          rowsPerPage: 10
        },
        isModalOpen: false,
        setController: jest.fn(),
        setIsModalOpen: jest.fn()
      };
      wrapper = setUp(props, state);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should render Table', () => {
      const component = wrapper;
      expect(component.find(Table)).toHaveLength(1);
    });
    it('should render Loader when isLoading true', () => {
      const component = shallow(<CustomTable {...props} isLoading={true} />);
      expect(component.find(Loader)).toHaveLength(1);
    });
    it('should not render Table when TableData is not passed', () => {
      const component = shallow(<CustomTable {...props} tableData={null} />);
      expect(component.find('[role="checkbox"]')).toHaveLength(0);
      expect(component.text('No Data Available')).toBeTruthy();
    });
    it('will open CoinCard when isLoading is false and Row is clicked', () => {
      const onRowClick = props.onRowClick();
      const handleOnRowClick = jest.spyOn(props, 'onRowClick');

      const component = shallow(<CustomTable {...props} onRowClick={onRowClick} />);

      component.find(TableRow).at(1).simulate('click');

      expect(handleOnRowClick).toBeCalled(); // onClick event on the row is called
      expect(component.find(CoinCard)).toHaveLength(1); // coincard component should reder after the api call
    });
    it('will call onPageChange when page is changed', () => {
      const pageNumber = 0;
      const perPage = 10;
      const onPageChange = props.onPageChange(pageNumber + 1, perPage);
      const handleOnPageChange = jest.spyOn(props, 'onPageChange');

      const component = shallow(<CustomTable {...props} onPageChange={onPageChange} />);
      component.find(TablePagination).at(0).simulate('onPageChange');

      expect(handleOnPageChange).toHaveBeenCalledWith(pageNumber + 1, perPage); // onClick event on the row is called
    });
  });
});
