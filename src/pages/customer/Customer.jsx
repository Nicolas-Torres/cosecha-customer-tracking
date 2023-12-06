import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalPassword from './ModalPassword';

const Customer = () => {

  const lastVisit = new Date().toLocaleString()
  const DNI = '987654321'

  const [openModal, setOpenModal] = useState(false)

  const handleCustomerTracking = () => {
    setOpenModal(true)
  }


  return (
    <Card sx={{ minWidth: 275, display: 'flex', direction: 'row', flexDirection: 'column', justifyContent: 'space-between' }} >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '0px' }} >
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
            Luis Valladares
          </Typography>
          <Typography sx={{ fontSize: 16 }} component="div">
            DNI: {DNI}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography sx={{ fontSize: 16 }} color="text.primary">
            Veces que visitó la tienda: 
          </Typography>
          <Typography sx={{ fontSize: 32 }} color="text.primary">
            5 
          </Typography>
        </CardContent>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} component="div" gutterBottom>
            Última visita:
          </Typography>
          <Typography >
            {lastVisit}
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