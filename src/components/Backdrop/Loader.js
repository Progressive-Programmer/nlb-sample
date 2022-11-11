import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = (props) => {
  const { isOpen } = props;

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;

Loader.propTypes = {
  isOpen: PropTypes.bool
};

Loader.defaultProps = {
  isOpen: false
};
