import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

import RegisterModal from '../components/Auth/RegisterModal';
import Logout from '../components/Auth/Logout';
import LoginModal from './Auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




class AppNavbar extends Component {
    
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }




    toggle = ()=> {
        this.setState({
            isOpen: !this.state.isOpen
        });

    }

    render(){

        const { isAuthenticated, shopper } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem >
                    <span className='navbar-text mr-3'>
                      <strong >{ shopper? `Welcome ${shopper.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                  <Logout />
                </NavItem>

            </Fragment>
        );
        const guestLinks = (
            <Fragment>
                 <NavItem>
                   <RegisterModal />
                 </NavItem>
                        
                 <NavItem>
                  <LoginModal />
                 </NavItem>
                
            </Fragment>
        )
        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                       {isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                    </Collapse>    
                </Container>
                </Navbar>
           
            
        </div>


        );
            }
    

}

const mapStateToProps = (state) => ({
     auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);