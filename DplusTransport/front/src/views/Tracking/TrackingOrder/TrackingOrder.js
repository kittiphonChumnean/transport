import React, { Component } from 'react';
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  Badge,
  Dropdown,
  Label,
  Input,
  form,
} from 'reactstrap';
import moment from 'moment';
import 'moment-timezone';
import { withApollo, gql, compose } from 'react-apollo';

class TrackingOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvoice:'',
      showINVOICEID:'',
      showMessengerID:'',
      showCustomerName:'',
      showAddressShipment:'',
      showTable:'',
      showLastStatus:''
    };
  }

  invoice=(e)=>{
    this.setState({
      showInvoice:e.target.value
    })
 }

 selectDataMess=()=>{
  //console.log("1234567890")
  if(this.state.showInvoice != ''){
      this.props.client.query({
        query:selectDataMess,
        variables: {
          "INVOICEID":this.state.showInvoice,
        }
      }).then((result) => {
        //console.log("result",result)
          var Mess
          var CusName
          var CusAddess
          
          result.data.selectDataMess.forEach(function (val,i) {  
            Mess = val.MessengerID
            CusName = val.CustomerName
            CusAddess =val.AddressShipment
            });
            this.setState({
              showMessengerID:Mess,
              showCustomerName:CusName,
              showAddressShipment:CusAddess
            })
            
        }).catch((err) => {

        });
        this.selectOrder()
  } else {
    alert("กรุณากรอกข้อมูลให้ครบ")
  }
}


 selectOrder=()=>{
  console.log("1234567890")
      this.props.client.query({
        query:selectOrder,
        variables: {
          "INVOICEID":this.state.showInvoice,
        }
      }).then((result) => {
        console.log("result",result)
        if (result.data.selectOrder.length != 0){
          var arrData = []
          var tblData
          var Laststatus
          var lengthStatus = 0
          var Laststatus_text
          var invoice
          var correct
          var _false
          var img
          var status_list = {
            '1':'คอนเฟริมงานเข้าระบบ',
            '2':'รับงานเข้าระบบ',
            '3':'จ่ายงานให้ Messenger',
            '4':'Messenger รับงานเข้า Application',
            '5':'Messenger ตรวจของเรียบร้อย',
            '6':'Messenger คอนเฟริมออกรอบ',
            '7':'Messenger กดโทรหาลูกค้า',
            '8':'Messenger กดนำทาง',
            '9':'Messenger แก้ไขการส่งของ',
            'A1':'ส่งสินค้าเรียบร้อย',
            'A2':'ส่งสินค้าเรียบร้อย แต่มีการแก้ไข',
            'B1':'ไม่สามารถส่งสินค้าได้ เนื่องจากลูกค้ากดผิด',
            'B2':'ไม่สามารถส่งสินค้าได้ เนื่องจากร้านปิด',
            'B3':'ไม่สามารถส่งสินค้าได้ เนื่องจากOrderซ้ำ',
            'B4':'ไม่สามารถส่งสินค้าได้ เนื่องจากสินค้าผิด',
            'B5':'ไม่สามารถส่งสินค้าได้ เนื่องจากSaleคีย์ผิด',
            'B6':'ไม่สามารถส่งสินค้าได้ เนื่องจากลูกค้าสั่งร้านอื่นแล้ว',
            'B7':'ไม่สามารถส่งสินค้าได้ เนื่องจากSaleแจ้งราคาผิด'
          }
          result.data.selectOrder.forEach(function (val,i) {  
            correct = require('../../../assets/img/brand/checked.png')
            _false = require('../../../assets/img/brand/false.png')
            if (val.status == 'B1' || val.status == 'B2' ||val.status == 'B3' ||val.status == 'B4' ||val.status == 'B5' ||val.status == 'B6' ||val.status == 'B7'){
              img = _false
            }else {
               img = correct
             }        
            tblData =<tr>
                <th><center>{i+1}</center></th>
                <th width="10%"><center> </center></th>
                <th width="15%"><center>{val.Date}</center></th> 
                <th width="15%"><center>{val.Time}</center></th>
                <th><center><img height="55" width="55" src={img} />&nbsp;&nbsp;</center></th>
                <th width="20%"><center>{status_list[val.status]}</center></th>
                <th><center>{val.location}</center></th>
              </tr>
            lengthStatus = lengthStatus+1
            arrData.push(tblData)
            });
            Laststatus = result.data.selectOrder[lengthStatus-1].status
            Laststatus_text = status_list[Laststatus]
            invoice = this.state.showInvoice
            this.setState({
              showTable:arrData,
              showINVOICEID:invoice,
              showLastStatus: Laststatus_text
            })
        }else{
            alert("ไม่พบข้อมูล")
        }
        }).catch((err) => {

        });
}

  render() {
    return (
      <html lang="en">
      <title>ติดตามสินค้า</title>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                <h4><strong>ติดตามสินค้า</strong></h4>
                </CardHeader>
                <CardBody>
                  <center>
                    <div class="col-12">
                      <div class="card-body">
                        <form action="" method="post" class="form-inline" margin="auto auto">
                          <div class="pr-1 form-group">
                            <Label><strong>รหัส invoice</strong></Label>
                            &nbsp;&nbsp;<Input id="invoice" onChange={this.invoice}></Input>
                          </div>
                          &nbsp;&nbsp;<div class="pr-1 form-group">
                            <Button color="success" onClick={this.selectDataMess}>ค้นหา</Button>
                          </div>
                        </form>
                        <br/>
                        <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group">
                          <Label><strong>รหัส invoice</strong></Label>
                          &nbsp;&nbsp;<Input id="invoice" value={this.state.showINVOICEID} disabled></Input>
                        </div>
                          <div class="pr-1 form-group">
                          &nbsp;&nbsp;<Label for="exampleInputName2" class="pr-1"><strong>Messenger</strong></Label>
                          &nbsp;&nbsp;<Input id="Mess" value={this.state.showMessengerID} disabled></Input>
                          </div>
                          <div class="pr-1 form-group">
                          &nbsp;&nbsp;<Label for="exampleInputEmail2" class="pr-1"><strong>ชื่อผู้รับ</strong></Label>
                          &nbsp;&nbsp;<Input id="CusName" value={this.state.showCustomerName} disabled></Input>
                          </div>
                          <div class="pr-1 form-group">
                          &nbsp;&nbsp;<Label for="exampleInputEmail2" class="pr-1"><strong>ที่อยู่ผู้รับ</strong></Label>
                          &nbsp;&nbsp;<Input id="CusAddess" value={this.state.showAddressShipment}disabled></Input>
                          </div>
                        </form>
                      </div>
                    </div>
                    <br/>
                    <h3><strong>สถานะปัจจุบัน : {this.state.showLastStatus}</strong></h3>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th><center>ลำดับ</center></th>
                          <th><center>เลข SO</center></th>
                          <th><center>วันที่ </center></th>
                          <th><center>เวลา</center></th>
                          <th><center> </center></th>
                          <th><center>สถานะ</center></th>
                          <th><center>สถานที่</center></th>
                        </tr>
                        </thead>
                        <tbody>
                          {this.state.showTable}
                        </tbody>
                    </table>
                  </center>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </html>
    );
  }
}

const selectDataMess = gql`
query selectDataMess($INVOICEID:String!){
  selectDataMess(INVOICEID:$INVOICEID){
      MessengerID
      CustomerName
      AddressShipment
    }
  }
`

const selectOrder = gql`
query selectOrder($INVOICEID:String!){
    selectOrder(INVOICEID:$INVOICEID){
      invoice
      Date
      Time
      status
      location
    }
  }
`

const GraphQL = compose(
)(TrackingOrder)
export default withApollo (GraphQL)