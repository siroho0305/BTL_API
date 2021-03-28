import React from 'react';
import { BrowserRouter as Switch, Route, Link, withRouter } from "react-router-dom";
import routes from '../../routes';
import './MenuCol.css';
import {Row, Col, Button} from 'reactstrap'
import {BiLogOut} from 'react-icons/bi'

const App = props =>{
  const { path } = props

  const handleLogout = () =>{
    props.history.push('/')
  }
  const routeList = routes.map(route => {
    return(
      <div key={route.path}>
        <div className='container' style={{marginBottom: '30px', marginLeft: '20px'}}>
          <Button onClick={handleLogout} color='info'>
            <BiLogOut/> Đăng xuất
          </Button>
        </div>
        <Link to={route.path} className='menu-col-item-link'>
            <div className={route.path === path ? 'menu-col-item-active' : 'menu-col-item' } /* className='menu-col-item' */>
              <Row>
                  <Col style={{fontSize: '30px'}} xs='3'>
                    {route.icon}
                  </Col>
                  <Col style={{paddingTop: '10px'}}>
                    {route.name}
                  </Col>
              </Row>
            </div>
        </Link>
      </div>
    )
  })
  return(
        <div className='menu-col'>
          {routeList}
          <Switch/>
          <Route/>
        </div>
  )
}

export default withRouter(App);