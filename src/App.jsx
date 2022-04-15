import { useState } from 'react';
import { CssBaseline, Grid, Tab, Tabs } from '@mui/material';
import FormikDemo from './demo/FormikDemo';
import ReactHookFormDemo from './demo/ReactHookFormDemo';

export default function App() {

  const [index, setIndex] = useState(0);

  return (
    <>
      <CssBaseline />

      <Grid container gap={3} sx={{ padding : 3 }}>
        <Grid container item>
          <Tabs value={index} onChange={(_, newIndex) => setIndex(newIndex)}>
            <Tab label="Formik" />
            <Tab label="React Hook Form" />
          </Tabs>
        </Grid>

        <Grid item>
          {index === 0 ? (
            <FormikDemo />
          ) : (
            <ReactHookFormDemo />
          )}
        </Grid>
      </Grid>
    </>
  );
}
