import React from 'react';
import { shallow } from 'enzyme';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import CoinCard from './CoinCard';

const setUp = (props = {}) => {
  const wrapper = shallow(<CoinCard {...props} />);
  return wrapper;
};

describe('CoinCard', () => {
  describe('has props', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = {
        isOpen: true,
        data: {
          name: 'Test name',
          image: 'image',
          symbol: 'bxy',
          links: {
            homepage: ''
          },
          market_cap: {
            eur: 2
          },
          hashing_algorithm: '',
          genesis_date: '',
          description: {
            en: 'New Description'
          }
        },
        setIsModalOpen: jest.fn()
      };
      wrapper = setUp(props);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should render Card, Grid & Table', () => {
      const component = wrapper;
      expect(component.find(CardHeader)).toHaveLength(1);
      expect(component.find(Table)).toHaveLength(2);
      expect(component.find(TableRow)).toHaveLength(4);
    });
    it('should open Expand when clicked in button ', () => {
      const component = wrapper;
      component.find('[aria-label="show more"]').simulate('click');
      expect(component.find(Collapse).prop('in')).toBe(true);
    });

    it('should close Modal when close is clicked ', () => {
      const setIsModalOpen = props.setIsModalOpen();
      const handleIsModalOpen = jest.spyOn(props, 'setIsModalOpen');
      const component = shallow(<CoinCard {...props} setIsModalOpen={setIsModalOpen} />);

      component.find('[aria-labelledby="modal-modal-title"]').simulate('onClose');
      expect(handleIsModalOpen).toHaveBeenCalled();
    });
  });
});
