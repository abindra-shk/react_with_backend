import logo from './logo.svg';
import './App.scss';
import { TodoScreen } from './pages/Todo.screen';
import { LoginForm } from './components/modules/user/login';
import AppRouter from './routes/AppRouter';
function App() {
  return (
    <div className="App">
      {/* <LoginForm/> */}
      <AppRouter/>
      {/* <TodoScreen/> */}
    </div>
  );
}

export default App;
