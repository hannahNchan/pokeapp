import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@mui/material';

const ReadMoreText = ({ url }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxLength, setMaxLength] = useState(100);
  const [text, setText] = useState(100);

  const fetchDescription = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((text) => {
        const allText = text.flavor_text_entries
          .filter((m) => {
            return m.language.name === 'en';
          })
          .map((m) => m.flavor_text)
          .join();
        setText(decodeURIComponent(allText));
      });
  };

  useEffect(() => {
    if (url) {
      setMaxLength(100);
      fetchDescription(url);
    }
  }, [url]);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncatedText =
    text.length > maxLength && !isExpanded ? text.slice(0, maxLength) + '...' : text;

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {truncatedText}
      </Typography>
      {text.length > maxLength && (
        <Button variant="contained" color="primary" onClick={toggleReadMore}>
          {isExpanded ? 'Read less' : 'Read more'}
        </Button>
      )}
    </Box>
  );
};

ReadMoreText.propTypes = {
  url: PropTypes.string.isRequired
};

export default ReadMoreText;
