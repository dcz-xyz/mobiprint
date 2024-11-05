import React, { useState } from 'react';
import { Button, Switch } from '@mui/material';

const PrintingToggle = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handleToggle = () => {
    setIsPrinting(!isPrinting);
  };

  return (
    <div>
      <label htmlFor="printingToggle">Printing:</label>
      <Switch
        id="printingToggle"
        checked={isPrinting}
        onChange={handleToggle}
        color="primary"
      />
    </div>
  );
};

export default PrintingToggle;