import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const DetailsList = ({ details }) => {
  return (
    <div>
      <List dense>
        {details.map((detail, index) => (
          <ListItem key={'index-' + index}>
            <ListItemText primary={detail.key} secondary={detail.value} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

DetailsList.propTypes = {
  details: PropTypes.array
};

export default DetailsList;
