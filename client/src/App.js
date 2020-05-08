import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../src/components/AppNavbar';
import ShoppingList from '../src/components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import ItemModal from '../src/components/ItemModal'
import { Container } from 'reactstrap';
import './App.css';
import { loadShopper} from './actions/authActions';



class App extends Component {

  componentDidMount() {
    store.dispatch(loadShopper());
  }


  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
       
      </div>
      </Provider>
    );
  }

  }

  

export default App;
