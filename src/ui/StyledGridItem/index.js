import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid2';

const StyledGridItem = ({ children, ...rest }) => {
  return (
    <Grid sx={{ flexGrow: 1 }} {...rest}>
      {children}
    </Grid>
  );
};

StyledGridItem.propTypes = {
  children: PropTypes.node.isRequireda
};

export default StyledGridItem;
