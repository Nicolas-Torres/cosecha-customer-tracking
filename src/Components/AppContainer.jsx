import { Outlet } from "react-router-dom"
import Container from "./Container"

const AppContainer = () => {
  return (
    <Container>
      <Outlet/>
    </Container>
  )
}

export default AppContainer