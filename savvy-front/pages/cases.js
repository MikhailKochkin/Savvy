import Cases from '../components/Cases';
import Banner from '../components/Banner';

const Home = props => (
      <div>
          <Banner/>
          <Cases page={parseFloat(props.query.page) || 1}/>
      </div>
)

export default Home;