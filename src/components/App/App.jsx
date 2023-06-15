import './App.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

function App() {
  return (
    <div className="page">
      <Header />
      <Promo />
      <NavTab />
      <AboutProject />
      {/* <Main />
        <Footer /> */}
    </div>
  );
}

export default App;
