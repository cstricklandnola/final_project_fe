import ReactDOM from 'react-dom';
import './index.css';
import {default as App} from './App';
import NotificationsProvider from './Notifications/NotificationsProvider';

ReactDOM.render(
  <NotificationsProvider>
  <App />
  </NotificationsProvider>,
  document.getElementById('root')
)
