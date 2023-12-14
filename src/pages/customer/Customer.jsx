import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ModalPassword from './ModalPassword'
import Skeleton from '@mui/material/Skeleton'
import { getCustomerAction } from '../../features/redux/actions/customerAction'
import { useParams } from 'react-router-dom'

const Customer = () => {

  const { id } = useParams()

  const [openModal, setOpenModal] = useState(false)
  const { data: customer, status } = useSelector((state) => state.customer)
  const { nombre, cuenta, dni, checkins } = customer

  const dispatch = useDispatch()

  const handleCustomerTracking = () => {
    setOpenModal(true)
  }

  useEffect(() => {
    dispatch(getCustomerAction(id))
  }, [])

  return (
    <Card sx={{ minWidth: 275, display: 'flex', direction: 'row', flexDirection: 'column', justifyContent: 'space-between' }} >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '0px' }} >
        <CardContent >
          {cuenta !== ""
            ? <Typography sx={{ fontSize: 32, fontWeight: 'bold' }} color="text.primary" variant='h1' >
              {status === 'loading' || status === 'idle'
                ? <Skeleton animation="wave" variant="rounded" height={36} />
                : `@${cuenta}`
              }
            </Typography>
            : null
          }
          <Typography sx={{ fontSize: 32, }} color="text.primary" variant='h1' >
            {status === 'loading' || status === 'idle'
              ? <Skeleton animation="wave" variant="rounded" height={36} />
              : `${nombre}`
            }
          </Typography>
          <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: '8px', paddingBottom: '8px !important' }}>
            <Typography sx={{ fontSize: 24, }} component="div">
              DNI:
            </Typography>
            <Typography sx={{ fontSize: 24 }} component="div">
              {status === 'loading' || status === 'idle'
                ? <Skeleton animation="wave" variant="rounded" width={90} height={24} />
                : ` ${dni}`
              }
            </Typography>
          </CardContent>
        </CardContent>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" >
            N° de visitas:
          </Typography>
          <Typography sx={{ fontSize: 32 }} color="text.primary">
            {status === 'loading' || status === 'idle'
              ? <Skeleton animation="wave" variant="rounded" width={40} />
              : `${checkins.length}`
            }
          </Typography>
        </CardContent>
        <CardContent >
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} component="div" gutterBottom>
            Última visita:
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold', border: '1px solid black', borderRadius: '4px', padding: '8px' }} >
            {status === 'loading' || status === 'idle'
              ? <Skeleton animation="wave" variant="rounded" height={24} />
              : `${checkins.length === 0 ? 'Nuevo cliente' : checkins.at(-1)}`
            }
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', padding: '16px' }}>
        <Button
          className='tracking'
          variant="contained"
          color='primary'
          size="large"
          onClick={handleCustomerTracking}
        >
          REGISTRAR VISITA
        </Button>
        <ModalPassword
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
      </CardActions>
    </Card>
  )
}

export default Customer