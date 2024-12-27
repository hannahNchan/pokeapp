import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, Chip, Avatar, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PikaDialog from '../../ui/PikaDialog';
import utilities from '../../utils/constants';
import PokemonDetails from '../PokemonDetails';
import Loader from '../../ui/loader';

const PokemonCard = ({ data, type }) => {
  const [pokemon, setPokemon] = useState(null);
  const [openPokeDialog, setOpenPokeDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type === 'all') {
      return setIsVisible(true);
    }
    if (pokemon && Object.values(pokemon).length !== 0) {
      const isFromType = pokemon.types.some((m) => m.type.name === type);
      setIsVisible(isFromType);
    }
  }, [type]);

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

  useEffect(() => {
    if (typeof data === 'string') {
      fetchPokemon();
    } else if (typeof data === 'object' && data !== null) {
      setPokemon(data);
    }
  }, [data]);

  if (!pokemon) {
    return <Loader size="mini" />;
  }

  const BlueTextTypography = styled(Typography)(() => ({
    color: '#3b6d99b3'
  }));

  const setGradient = () => {
    const colors = pokemon.types.map((type) => utilities.pokemonTypes[type.type.name]);
    return colors.length > 1 ? `linear-gradient(90deg, ${colors.join(', ')} 70%)` : colors[0];
  };

  const onHandleClose = () => {
    setOpenPokeDialog(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 3 }}>
      <PikaDialog open={openPokeDialog} handleClose={onHandleClose}>
        <PokemonDetails pokemon={pokemon} />
      </PikaDialog>
      <Card
        onClick={() => setOpenPokeDialog(true)}
        role="button"
        sx={[
          {
            maxWidth: 'auto',
            width: 'auto',
            mx: 'auto',
            mt: 4,
            borderRadius: '16px',
            boxShadow: 3,
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: '#edf7fb'
          },
          {
            '&:hover': {
              backgroundColor: '#b4dae9'
            }
          }
        ]}>
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
              Afinity
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
    </Grid>
  );
};

PokemonCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.string
};

export default PokemonCard;
