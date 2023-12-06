import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TRACKING_CODE = '123'

const ModalPassword = ({ open, handleClose }) => {

  const validationSchema = yup.object({
    code: yup
      .string('Enter your admin code')
      .required('Code is required')
  });

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      console.log(values)

      //! DESHABILITAR BOTON LUEGO DE ENVIAR FORM
      const { code } = values
      if (code === TRACKING_CODE) {
        console.log('OK', values)
        resetForm()
      } else {
        console.log('ERROR', values)
        setErrors({ code: 'Bad code' })
      }
    },
  });



  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose()
          formik.resetForm()
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, display: 'flex', flexDirection: 'column' }}>
          <h2 id="parent-modal-title">Código de administrador:</h2>
          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{ width: 500, maxWidth: '100%', paddingBottom: '16px' }}
            >
              <TextField
                sx={{ border: 'black' }}
                fullWidth
                id='code'
                name='code'
                type='password'
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label=''
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Box>
            <Button
              className='tracking'
              variant="contained"
              color='primary'
              size="large"
              type='submit'
            >
              REGISTRAR VISITA
            </Button>

          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalPassword