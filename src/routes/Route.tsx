import React, { useContext } from 'react';
import AuthContext from '../contexts/auth.context';
import {Route, RouteProps, Redirect} from 'react-router-dom';
interface RoutePropsPersonalized extends RouteProps{
    isPrivate?: boolean;
    component: React.ComponentType;
}

const RoutePersonalized: React.FC<RoutePropsPersonalized> = ({component: Component, isPrivate, ...rest}) => {
    const { singed } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps=>(
                (isPrivate && singed) || !isPrivate?(
                    <Component />
                ):(
                    <Redirect to={{
                        pathname: '/',
                        state: {from: routeProps.location}
                    }} />
                )
            )}
        
        />
    );
}

export default RoutePersonalized;