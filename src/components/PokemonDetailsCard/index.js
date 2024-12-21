import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent } from '@mui/material';

const PokemonDetailsCard = ({ pokemon }) => {
  return (
    <div>
      <Card sx={{ boxShadow: 3, width: '100%', padding: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" align="center">
            {pokemon.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            #{pokemon.id}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 1, color: 'blue' }}>
            {pokemon.type}
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Height: {pokemon.height}
          </Typography>
          <Typography variant="body2" align="center">
            Weight: {pokemon.weight}
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Abilities: {pokemon.abilities.join(', ')}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" align="center" fontWeight="bold">
              Stats:
            </Typography>
            <Box display="flex" justifyContent="space-between">
              {Object.entries(pokemon.stats).map(([key, value]) => (
                <Typography key={key} variant="caption" color="text.secondary">
                  {key.toUpperCase()}: {value}
                </Typography>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

PokemonDetailsCard.propTypes = {
  pokemon: PropTypes.object
};

export default PokemonDetailsCard;
