import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login.js';
import List from './pages/List.js';
import Book from './pages/Book.js';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;