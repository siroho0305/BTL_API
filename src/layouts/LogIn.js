import React from 'react';
import './css/layouts.css';
import { Row, Col, Label, Input, Button, Tooltip } from 'reactstrap'
import utc2 from '../image/utc2.png'
import {BiLogIn} from 'react-icons/bi'
import { withRouter } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'

const LogIn = props =>{
    const [alert, setAlert] =  React.useState(null)

    const [username, setUsername] = React.useState('')
    const [pass, setPass] = React.useState('')

    const handleUsernameChange = e => {
        setUsername(e.target.value)
    }

    const handlePassChange = e => {
        setPass(e.target.value)
    }

    const handleLogin = () =>{
        if(username === 'admin' && pass === '123'){
            props.history.push('/location')
        } else {
            setAlert(
                <SweetAlert
                    danger
                    title='Sai mật khẩu'
                    onConfirm={()=>{
                        setAlert(null)
                    }}
                ></SweetAlert>
            )
        }
    }

    const [tooltipOpen, setTooltipOpen] = React.useState(false);

     const toggle = () => setTooltipOpen(!tooltipOpen);

    return(
        <div>
            <div className='container log_in'>
                <Row style={{marginTop: '20px'}}>
                    <Col style={{textAlign: 'center'}}>
                        <img src={utc2} alt='utc2'/>
                    </Col>
                    <Col style={{fontSize: '20px'}}>
                        <h1>
                            Đăng nhập
                        </h1>
                        <hr/>
                        <Label>
                            Tên đăng nhập
                        </Label>
                        <Input value={username} onChange={handleUsernameChange} type='text' style={{width: '300px'}}></Input>
                        <br/>
                        <Label>
                            Mật khẩu
                        </Label>
                        <Input value={pass} onChange={handlePassChange} type='password' style={{width: '300px'}}></Input>
                        <br/>
                        <Button onClick={handleLogin} id='login' color='info'>
                            Đăng nhập <BiLogIn/>
                        </Button>
                        <Tooltip placement="right" isOpen={tooltipOpen} target="login" toggle={toggle}>

                        </Tooltip>
                    </Col>
                </Row>
            </div>
            {alert}
        </div>
  )
}

export default withRouter(LogIn);