import React from 'react';
import './index.css';
import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import '../styles/reactTable.css';
import Pagination from '../../components/Pagination'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Tooltip  } from 'reactstrap'
import {GiEarthAsiaOceania} from 'react-icons/gi'
import {AiFillEdit, AiOutlineUserAdd, AiFillDelete} from 'react-icons/ai'
import {MdCancel} from 'react-icons/md'
import SweetAlert from 'react-bootstrap-sweetalert'
import utc2Img from '../../image/utc2.png'

const Marker = ({ text }) => <div>{text}</div>;

const Location = props => {
    const {
        className
    } = props;
    const [modal, setModal] = React.useState(false);

    const toggle = item => {
        setModal(!modal)
        setEditAddress(item.address)
        setEditName(item.name)
        setId(item._id)
    };

    const [alert, setAlert] = React.useState(null)

    const [editName, setEditName] = React.useState('')
    const [editAddress, setEditAddress] = React.useState('')
    const [id, setId] = React.useState('')

    const handleEditNameChange = e => {
        setEditName(e.target.value)
    }

    const handleEditStudent = () =>{
        Geocode.fromAddress(editAddress)
        .then(res=>{
            axios.post('http://localhost:2222/update?id=' + id + '&name=' + editName + '&address=' + editAddress)
            .then(()=>{
                setAlert(
                    <SweetAlert
                        success
                        title='Thành công'
                        onConfirm={()=>{
                            setAlert(null)
                            setModal(!modal)
                            getList()
                        }}
                    >
                    </SweetAlert>
                )
            })
        })
        .catch(e=>{
            setAlert(
                <SweetAlert
                    danger
                    title='Địa chỉ không hợp lệ'
                    onConfirm={()=>{
                        setAlert(null)
                    }}
                ></SweetAlert>
            )
        })
    }

    const handleEditAddressChange = e => {
        setEditAddress(e.target.value)
    }

    Geocode.setApiKey('AIzaSyDBM4erjQ8ODdGvPnxDqjoiyq7wJgru0Ck')
    Geocode.setLanguage('vi')
    Geocode.setRegion('vi')

    const [defaultProps, setDefault] = React.useState({
        center: {
          lat: 10.8458083,
          lng: 106.7945438
        },
        zoom: 17
    })

    const utc2 = {
        _id: 0,
        name: 'PHÂN HIỆU TRƯỜNG ĐH GTVT TẠI TP. HỒ CHÍ MINH',
        address: '451 Lê Văn Việt, Tăng Nhơn Phú A, thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
        lat: 10.8458083,
        lng:106.7945438,
    }

    const [list, setList] = React.useState([])

    const getList = () =>{
        axios.get('http://localhost:2222/list')
        .then(res=>{
            setList(res.data.list)
        })
    }

    React.useEffect(()=>{
        getList()
    },[setList])

    const handleCenter = item =>{
        setDefault({
            center: {
                lat: item.lat,
                lng: item.lng
              },
            zoom: 17
        })
    }

    const handleDelete = item =>{
        setAlert(
            <SweetAlert
                warning
                showCancel
                title='Xác nhận xóa sinh viên!'
                cancelBtnText='Hủy'
                cancelBtnBsStyle='info'
                confirmBtnText='Xác nhận'
                onConfirm={()=>{
                    axios.delete('http://localhost:2222/delete?id=' + item._id)
                    .then(()=>{
                        setAlert(
                            <SweetAlert
                                success
                                title='Thành công'
                                onConfirm={()=>{
                                    setAlert(null)
                                    getList()
                                }}
                            >
                            </SweetAlert>
                        )
                    })
                }}
                onCancel={()=>{
                    setAlert(null)
                }}
            ></SweetAlert>
        )
    }

    const renderList = list.map(item=>{
        return {
            _id: item._id,
            id: item._id.slice(0,6),
            name: item.name,
            address: item.address,
            actions: <div style={{display: 'flex'}}>
                <Button
                    style={{backgroundColor: `${item.color}`, marginLeft: '5px'}}
                    onClick={() => handleCenter(item)}
                >
                    <GiEarthAsiaOceania/>
                </Button>
                <Button
                    style={{marginLeft: '5px'}}
                    color='info'
                    onClick={() => toggle(item)}
                >
                    <AiFillEdit/>
                </Button>
                <Button
                    style={{marginLeft: '5px'}}
                    color='danger'
                    onClick={() => handleDelete(item)}
                >
                    <AiFillDelete/>
                </Button>
            </div>
        }
    })

    const columns = [
        {
            Header: 'MSV',
            accessor: 'id',
            width: 100
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'actions',
            accessor: 'actions',
            width: 130
        },
    ]

    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const toggle1 = () => setTooltipOpen(!tooltipOpen);

    const markers = list.map((item, index)=>{
        return(
                <Marker
                    lat={item.lat}
                    lng={item.lng}
                    text={<button style={{width: '0px', height:'1px', border: 'none'}} onClick={()=>handleCenter(item)}>
                            <div id={'ok'+ index} style={{backgroundColor: `${item.color}`, height: '50px', width: '50px', borderRadius: '50px'}}>
                            </div>
                            <Tooltip style={{backgroundColor: 'wheat', color: 'black'}} placement="top" isOpen={tooltipOpen} target={'ok' + index} toggle={toggle1}>
                                <span className='font-weight-bold'>Tên: </span> {item.name}
                                <br/>
                                <span className='font-weight-bold'>Địa chỉ: </span> {item.address}
                            </Tooltip>
                            </button>}
                    key={item._id}
                ></Marker>
        )
    })

    const [modal1, setModal1] = React.useState(false)
    const [addName, setAddName] = React.useState('')
    const [addAddress, setAddAddress] = React.useState('')

    const handleAddNameChange = e => {
        setAddName(e.target.value)
    }

    const handleAddAddressChange = e =>{
        setAddAddress(e.target.value)
    }

    const  handleAddStudent = () =>{
        setModal1(!modal1)
        setAddName('')
        setAddAddress('')
    }

    const handleAdd = () =>{
        Geocode.fromAddress(addAddress)
        .then(res=>{
            const lat = res.results[0]
            console.log(lat)
            axios.post('http://localhost:2222/add?name=' + addName + '&address=' + addAddress)
            .then(()=>{
                setAlert(
                    <SweetAlert
                        success
                        title='Thành công'
                        onConfirm={()=>{
                            setAlert(null)
                            handleAddStudent()
                            getList()
                            setAddName('')
                            setAddAddress('')
                        }}
                    >
                </SweetAlert>
            )
            })
        })
        .catch(e=>{
            setAlert(
                <SweetAlert
                    danger
                    title='Địa chỉ không hợp lệ'
                    onConfirm={()=>{
                        setAlert(null)
                    }}
                >

                </SweetAlert>
            )
        })
    }



    return(
        <div className='view' style={{display: 'flex'}}>
            <div className='table_controller'>
                <Button color='primary' onClick={handleAddStudent}>
                    <AiOutlineUserAdd/> Thêm
                </Button>
                {' '}
                <Button onClick={()=>handleCenter(utc2)} style={{padding: '0px', borderRadius: '38px'}} color='warning'>
                    <img style={{height: '38px', width: '38px'}} src={utc2Img} alt='utc2img'></img>
                </Button>
                <ReactTable
                    style={{marginTop: '20px'}}
                    data={renderList}
                    columns={columns}
                    showPageSizeOptions={false}
                    PaginationComponent={Pagination}
                    pageSize={8}
                />
                <Modal style={{marginTop: '200px'}} isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Sửa chữa thông tin</ModalHeader>
                    <ModalBody>
                        <Label>Họ và tên: </Label>
                        <Input type='text' onChange={handleEditNameChange} value={editName}/>
                        <br/>
                        <Label>Địa chỉ: </Label>
                        <Input type='text' onChange={handleEditAddressChange} value={editAddress}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={handleEditStudent}><AiFillEdit/> Xác nhận</Button>{' '}
                        <Button color="danger" onClick={toggle}><MdCancel/> Hủy</Button>
                    </ModalFooter>
                </Modal>

                <Modal style={{marginTop: '200px'}} isOpen={modal1} toggle={handleAddStudent} className={className}>
                    <ModalHeader toggle={handleAddStudent}>Thêm sinh viên</ModalHeader>
                    <ModalBody>
                        <Label>Họ và tên: </Label>
                        <Input type='text' onChange={handleAddNameChange} value={addName}/>
                        <br/>
                        <Label>Địa chỉ: </Label>
                        <Input type='text' onChange={handleAddAddressChange} value={addAddress}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={handleAdd}><AiFillEdit/> Thêm</Button>{' '}
                        <Button color="danger" onClick={handleAddStudent}><MdCancel/> Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div style={{ marginLeft: '20px',height: '800px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8'}}
                    center={defaultProps.center}
                    zoom={defaultProps.zoom}
                >
                <Marker
                    lat={utc2.lat}
                    lng={utc2.lng}
                    text={<button onClick={()=>handleCenter(utc2)} style={{width: '0px', height:'1px', border: 'none'}}><img style={{width: '50px', height: '50px'}} src={utc2Img} id='utc2asfd' alt='utc2'/></button>}
                />
                <Tooltip style={{backgroundColor: 'wheat', color: 'black'}} placement="top" isOpen={tooltipOpen} target="utc2asfd" toggle={toggle1}>
                    <span className='font-weight-bold'>Tên: </span> {utc2.name}
                    <br/>
                    <span className='font-weight-bold'>Địa chỉ: </span> {utc2.address}
                </Tooltip>
                {markers}
                </GoogleMapReact>
            </div>
            {alert}
        </div>
    )
}
export default Location;