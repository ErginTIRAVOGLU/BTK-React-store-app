import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartContextProvider } from './context/CartContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.tsx'


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </Provider>

)
