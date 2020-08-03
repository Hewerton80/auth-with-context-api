import React, { FC, useContext } from 'react';
import AuthContext from '../contexts/auth.context';
import {Switch, Redirect} from 'react-router-dom';
import Route from './Route';
//import DashBoard from './dashBoard.routes';
//import SingIn from './auth.routes';
import SingIn from '../pages/authentication/SingIn';
import DashBoard from '../pages/system/DashBoard';

const Routes: FC = ()=>{
    const {singed} = useContext(AuthContext);
    console.log('singed: ', singed)
    return (
        <Switch>
            <Route
                exact
                component={SingIn}
                path='/'
            />
            <Route
                exact
                path='/dashboard'
                component={DashBoard}
                isPrivate
                // render={(routeProps)=>(
                //     singed?(
                //         <DashBoard/>
                //     ):(
                //         <Redirect to={{
                //             pathname: '/',
                //             state: {from: routeProps.location}
                //         }} />
                //     )
                // )}  
            >
                {/* <Route path="/tela1" component={Teste} exact/> */}
            </Route>
            <Redirect from="*" to='/' />        
        </Switch>
    )
}


export default Routes;