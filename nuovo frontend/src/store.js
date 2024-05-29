import { createStore, combineReducers } from 'redux';
import { sessionService } from 'redux-react-session';
import reducers from './reducers'; // Importa i tuoi riduttori qui

// Combina i tuoi riduttori
const rootReducer = combineReducers(reducers);

// Crea il negozio Redux
const store = createStore(rootReducer);

// Inizializza il servizio di sessione
sessionService.initSessionService(store);

export default store;
