import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import EmailCheck from './components/EmailCheck';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Signout from './components/Signout';
import TopPage from './views/Toppage';
import './App.css';
import EditProfile from './components/EditProfile';
import NewBooks from './components/NewBook';
import GetBookInfos from './views/GetBookInfos';

const DetailGetBooks = () => {
  const { id } = useParams<string>();
  console.log(id);
  return id ? <GetBookInfos id={id} /> : null;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path='/' element={<TopPage />} />
            <Route path='/emailcheck' element={<EmailCheck />} />
            <Route path='/new' element={<NewBooks />} />
            <Route path='/profile' element={<EditProfile />} />
            <Route path={`/detail/:id`} element={<DetailGetBooks />} />
            <Route path={`/edit/:id`} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signout' element={<Signout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
