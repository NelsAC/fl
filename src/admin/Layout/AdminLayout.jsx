
import { Sidebar } from "../components/Sidebar"


export const AdminLayout = ({ children }) => {
  return (
    <>
        <Sidebar />
        { children }
    </>
  )
}
