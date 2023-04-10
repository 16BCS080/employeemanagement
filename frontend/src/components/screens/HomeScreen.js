import DataTable from './DataTable';
import { useSelector } from 'react-redux'

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Home</h1>
      { userInfo?.role === "admin" &&
        <DataTable /> 
      }
    </div>  
    );
}

export default HomeScreen
