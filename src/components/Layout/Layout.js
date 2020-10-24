import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Layout.scss';
import Toolbar from '../Header/Toolbar/Toolbar';
import Footer from './../../components/Footer/Footer';
import SliderBuilder from './../../containers/SliderBuilder/SliderBuilder';
import Messages from './../../containers/MessgesBuilder/MessagesBuilder';
import PricePage from './../PricePage/PricePage';
import AboutUs from './../../components/AboutUs/AboutUs';
import Advertisement from './../../components/Advertisement/Advertisement';
import Curier from './../../containers/CurierBuilder/CurierBuilder';

const Layout = props => {
   return (
      <>
         <Toolbar/>
         <main className="Main">
            <Switch>
               <Route path={'/price'} component={PricePage}/>
               <Route path={'/delivery'} component={Curier}/>
               <Route path={'/'}>
                  <SliderBuilder/>
                  <Advertisement/>
                  <Messages/>
                  <AboutUs/>
               </Route>
            </Switch>
         </main>
         <Footer/>
      </>
   );
};

export default Layout;