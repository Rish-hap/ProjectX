import React from 'react'
import { Redirect } from "react-router-dom"

 const protected_route = ({authObject, ...rest}) => (getComponent) => {
                if(!!(authObject().isAuthenticated)){
                    return  getComponent()
                  }else{
                    console.log("Protected route")
                    let { logout } = {...rest}
                    logout()
                    return  <Redirect to="/signin" />
                  }
}

export default protected_route
