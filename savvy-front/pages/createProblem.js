import PleaseSignIn from '../components/PleaseSignIn';
import dynamic from 'next/dynamic';

const DynamicLoadedEditor = dynamic(
    import('../components/create/CreateProblem'),
    {
      loading: () => (<p>Загрузка...</p>),
      ssr: false
    }
  )

const CreateProblemPage = ({...props}) => (
    <PleaseSignIn>
        <DynamicLoadedEditor {...props} />
    </PleaseSignIn>
);

export default CreateProblemPage;