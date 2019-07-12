import Landing from '../components/Landing';
import User from '../components/User';

const Index = () => (
    <User>
      {({data: {me}}) => ( 
        <Landing me={me} />
      )}
    </User>

);

export default Index;