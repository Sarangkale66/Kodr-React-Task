import type { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}

export default Home
