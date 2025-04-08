import { createRoot } from 'react-dom/client'
import './index.css'
import Ponies from './Ponies.tsx'

createRoot(document.getElementById('root')!).render(
  <Ponies />
)
