import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid2';
import { Avatar, Chip, Box, Typography, CardContent, Tab, Tabs } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

import utilities from '../../utils/constants';
import ReadMoreText from '../../ui/LoadMore';
import DetailsList from '../../ui/DetailsList';
import LinearProgressBar from '../../ui/LinearProgressBar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const PokemonDetails = ({ pokemon }) => {
  const setGradient = () => {
    const colors = pokemon.types.map((type) => utilities.pokemonTypes[type.type.name]);
    return colors.length > 1 ? `linear-gradient(90deg, ${colors.join(', ')} 70%)` : colors[0];
  };

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          background: setGradient(),
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          position: 'relative'
        }}>
        <Typography
          variant="h2"
          sx={{ marginTop: 0, fontWeight: 'bold', textTransform: 'capitalize' }}>
          {pokemon.name}
        </Typography>
        <Typography variant="subtitle2">#{pokemon.id.toString().padStart(3, '0')}</Typography>
        <Avatar
          src={pokemon.sprites?.other['official-artwork'].front_default}
          alt={pokemon.name}
          sx={{
            width: 350,
            height: 350,
            position: 'absolute',
            bottom: -205,
            boxShadow: 0,
            border: '5px solid transparent',
            borderRadius: '50%'
          }}
        />
      </Box>
      <CardContent sx={{ pt: 10 }}>
        <Box mb={2}></Box>
        <Grid container spacing={2}>
          <DetailsList
            details={[
              { key: 'Name', value: pokemon.name },
              { key: 'Id', value: pokemon.id },
              { key: 'Height', value: pokemon.height / 10 },
              { key: 'Weight', value: pokemon.weight / 10 },
              { key: 'Color', value: pokemon.color?.name || '' }
            ]}
          />
        </Grid>
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
        <Box mt={2}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="icon label tabs example">
            <Tab icon={<InfoIcon />} label="More..." />
            <Tab icon={<EqualizerIcon />} label="Stats" />
            <Tab icon={<RemoveDoneIcon />} label="Evolutions" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ReadMoreText url={pokemon.species.url} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Main stats
            </Typography>
            {pokemon.stats.map((stat, index) => (
              <Grid key={'index' + index}>
                <Grid>
                  <Typography variant="body2" fontWeight="bold">
                    {utilities.shortNamesStats[stat.stat.name.toLowerCase()]}
                    {' - '}
                    {stat.base_stat}
                  </Typography>
                </Grid>
                <Grid size={11}>
                  <LinearProgressBar
                    value={stat.base_stat}
                    color={utilities.statsColors[stat.stat.name.toLowerCase()]}
                  />
                </Grid>
              </Grid>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            Evolutions
          </TabPanel>
        </Box>
      </CardContent>
    </>
  );
};

PokemonDetails.propTypes = {
  pokemon: PropTypes.object.isRequired
};

export default PokemonDetails;
