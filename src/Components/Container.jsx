import Header from './Header'
import Box from '@mui/material/Box';

const Container = ({ children }) => {
  return (
    <>
      <Header />
      <Box display='flex' justifyContent='center' paddingTop='24px' height='400px' >
        {children}
      </Box>
    </>
  )
}

export default Container