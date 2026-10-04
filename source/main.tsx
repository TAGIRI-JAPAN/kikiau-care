import { createRoot } from 'react-dom/client';
import CareLab from './app/care-lab';
import './app/globals.css';
import './app/bold-studio.css';
import './app/fonts.css';

const root = document.getElementById('root');
if (!root) throw new Error('kikiau: root element is missing');
createRoot(root).render(<CareLab />);
