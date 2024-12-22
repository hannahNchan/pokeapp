import * as React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function Loader({ size }) {
  const classSize = size === 'big' ? 'pokemon' : 'pokemonMini';
  return (
    <div className="parent">
      <div className={classSize}></div>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.string.isRequired
};
