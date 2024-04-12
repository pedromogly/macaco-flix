import RoutesApp from "./routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2500}/>
      <RoutesApp/>
    </div>
  );
}

export default App;
