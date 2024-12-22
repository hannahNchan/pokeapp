import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme, color }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: 'gray'
    })
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: color,
    ...theme.applyStyles('dark', {
      backgroundColor: 'gray'
    })
  }
}));

const LinearProgressBar = ({ value, color }) => {
  return (
    <Stack spacing={1} sx={{ flexGrow: 5, display: 'flex' }}>
      <BorderLinearProgress color={color} variant="determinate" value={value} />
    </Stack>
  );
};

LinearProgressBar.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string
};

export default LinearProgressBar;
