import FormikDemo from './demo/FormikDemo';
import { CssBaseline } from '@mui/material';
import ReactHookFormDemo from './demo/ReactHookFormDemo';

export default function App() {

  return (
    <>
      <CssBaseline />

      <h1>
        Formik demo
      </h1>
      <FormikDemo />

      <h1>
        ReactHookFormDemo
      </h1>
      <ReactHookFormDemo />

    </>
  );
}
