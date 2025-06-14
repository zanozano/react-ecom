import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import './styles/main.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='flex'>
				<Sidebar />
				<div className='rounded w-full flex justify-between flex-wrap'>
					<Routes>
						<Route path='/' element={<MainContent />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
