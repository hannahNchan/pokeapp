import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, Chip, Avatar, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import utilities from '../../utils/constants';

const PokemonDetailsCard = ({ data }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(data);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const result = await response.json();
        setPokemon(result);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setPokemon(null);
      }
    };

    if (typeof data === 'string') {
      fetchPokemon();
    } else if (typeof data === 'object' && data !== null) {
      setPokemon(data);
    }
  }, [data]);

  if (!pokemon) {
    return <Typography>Cargando...</Typography>;
  }

  const BlueTextTypography = styled(Typography)(() => ({
    color: '#3b6d99b3'
  }));

  const setGradient = () => {
    const colors = pokemon.types.map((type) => utilities.pokemonTypes[type.type.name]);
    return colors.length > 1 ? `linear-gradient(90deg, ${colors.join(', ')} 70%)` : colors[0];
  };

  return (
    <Card
      sx={{
        maxWidth: 'auto',
        width: 'auto',
        mx: 'auto',
        mt: 4,
        borderRadius: '16px',
        boxShadow: 3,
        overflow: 'hidden',
        position: 'relative'
      }}>
      <Box
        sx={{
          background: setGradient(),
          height: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          position: 'relative'
        }}>
        <Typography variant="h3">
          <strong>
            {'   '}
            {pokemon.name}
          </strong>
        </Typography>
      </Box>
      <CardContent>
        <Grid direction="column" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <BlueTextTypography variant="h6" fontWeight="bold">
            Id #{pokemon.id}
          </BlueTextTypography>
          <Box
            sx={{
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80px'
            }}>
            <Avatar
              src={pokemon.sprites?.other['official-artwork'].front_default}
              alt={pokemon.name}
              sx={{
                zIndex: 100,
                width: '280px',
                height: '280px',
                position: 'absolute',
                right: '-5px'
              }}
            />
          </Box>
          <BlueTextTypography sx={{ marginBottom: 0 }} variant="h6" fontWeight="bold" mb={2}>
            Afinidad
          </BlueTextTypography>
          <Box>
            {pokemon.types.map((type, index) => (
              <Chip
                key={index}
                label={type.type.name}
                sx={{
                  mr: 1,
                  backgroundColor: utilities.pokemonTypes[type.type.name],
                  color: 'white'
                }}
              />
            ))}
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

PokemonDetailsCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default PokemonDetailsCard;
