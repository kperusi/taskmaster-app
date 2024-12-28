import { BrowserRouter } from "react-router";
// import './App.css';
// import HomePage from './pages/HomePage';
import Router from "./pages/Router";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Router />
        </Provider>
      </BrowserRouter>
      {/* <HomePage/>
       */}
    </div>
  );
}

export default App;
