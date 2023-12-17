import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { checkinAction } from '../../features/redux/actions/customerAction'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import spinner from '../../assets/spinner.gif'
import DoneIcon from '@mui/icons-material/Done'
import { getAdminService } from '../../features/services/adminServices'

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
}

const ModalPassword = ({ open, handleClose }) => {

  const [loading, setLoading] = useState(false)
  const [checkingSuccess, setCheckingSuccess] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.customer)

  const { id } = useParams()
  const validationSchema = yup.object({
    code: yup
      .string('Enter your admin code')
      .required('Code is required')
  })

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      const { code } = values
      getAdminService()
        .then(({ password: COSECHA_CODE }) => {
          if (code === COSECHA_CODE) {
            setLoading(true)
            const checkin = new Date().toLocaleString('es-PE')
            const update = { checkin, id }
            dispatch(checkinAction(update))
              .then((response) => {
                if (response.payload && status === 'success') {
                  setLoading(false)
                  setCheckingSuccess(true)
                  setButtonDisabled(true)
                  setTimeout(() => {
                    handleClose()
                    setButtonDisabled(false)
                    setCheckingSuccess(false)
                  }, 1500)
                }
              })
            resetForm()
          } else {
            setErrors({ code: 'Bad code' })
          }

        })
    },
  })

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
        <Box sx={{ ...style, width: 300, display: 'flex', flexDirection: 'column' }}>
          <h2 id="parent-modal-title">Código de administrador:</h2>
          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{ width: 500, maxWidth: '100%', paddingBottom: '16px' }}
              display='flex'
              flexDirection='column'
              alignItems='center'
              gap='24px'
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
              {loading
                ? <img src={spinner} alt="icon" width="50" />
                : null
              }
              {checkingSuccess
                ? <DoneIcon color='success' />
                : null
              }
            </Box>
            <Button
              className='tracking'
              variant="contained"
              color='primary'
              size="large"
              type='submit'
              disabled={buttonDisabled}
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