import List from '../List/index.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <List />
      <footer className="App-footer mt-3 p-4 text-center">Developed By: <a href="https://www.alrexconsus.com" target="_blank">Alrex Consus</a></footer>
    </div>
  );
}

export default App;
