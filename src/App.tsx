import Sidebar from './components/Sidebar';
import './styles/main.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='flex h-screen'>
				<Sidebar />
			</div>
		</Router>
	);
}

export default App;
