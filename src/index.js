import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { IntlProvider, addLocaleData } from "react-intl";
import esLocaleData from "react-intl/locale-data/es";

import App from './components/App';
import reducers from './reducers';

addLocaleData(esLocaleData);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<IntlProvider locale="en">
		<Provider store={store}>
			<App />
		</Provider>
	</IntlProvider>,
	document.querySelector('#root')
);
