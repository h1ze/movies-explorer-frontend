import './App.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

function App() {
  return (
    <div className="page">
      <Header />
      <Promo />
      <NavTab />
      {/* <Main />
        <Footer /> */}
    </div>
  );
}

export default App;
