import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from './Loader';

const setUp = (props = {}) => {
  const wrapper = shallow(<Loader {...props} />);
  return wrapper;
};

describe('Loader', () => {
  describe('has props', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = {
        isOpen: false
      };
      wrapper = setUp(props);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should render correctly', () => {
      const component = wrapper;
      expect(component).toMatchSnapshot();
    });
    it('should not render Backdrop', () => {
      const component = wrapper;
      expect(component.contains(<Backdrop open={props.isOpen} />)).toEqual(false);
    });
    it('should render Backdrop', () => {
      const component = shallow(<Loader isOpen={true} />);
      expect(component.find(Backdrop)).toHaveLength(1);
      expect(component.contains(<CircularProgress color="inherit" />)).toEqual(true);
    });
  });
});
