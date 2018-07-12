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
      showTable:''
    };
  }

  invoice=(e)=>{
    this.setState({
      showInvoice:e.target.value
    })
 }

 selectOrder=()=>{
  console.log("1234567890")
    this.props.client.query({
      query:selectOrder,
      variables: {
        "INVOICEID":this.state.showInvoice,
      }
    }).then((result) => {
      var arrData = []
        var tblData
        var status =[]
        var invoice
        var Mess
        var CusName
        var CusAddess
        result.data.selectOrder.forEach(function (val,i) {
          if(val.status[i] == '5'){
            status[i] = 'Messenger ตรวจของเรียบร้อย'   
          }else if(val.status[i] == '6'){
            status[i] = 'Messenger คอนเฟริมออกรอบ'   
          }else if(val.status[i] == '7'){
            status[i] = 'Messenger โทรหาลูกค้า'   
          }else if(val.status[i] == '8'){
            status[i] = 'Messenger กดโทรหาลูกค้า'   
          }else if(val.status[i] == '9'){
            status[i] = 'Messenger แก้ไขการส่งของ'   
          }else if(val.status[i] == 'A1'){
            status[i] = 'ส่งของเรียบร้อย'   
          }else if(val.status == 'B1'){
            status[i] = 'ไม่สามารถส่งของได้ เนื่องจากร้านปิด'   
          }
          
          tblData = <tbody>
            <tr>
              <th><center>{i+1}</center></th>
              <th width="15%"><center>{moment(val.DateTime).format("DD-MM-YYYY")}</center></th> 
              <th width="15%"><center>{moment(val.DateTime).format("hh:mm:ss a")}</center></th>
              <th><center><img src={require('../../../assets/img/brand/checked.png')} />&nbsp;&nbsp;</center></th>
              <th width="20%"><center>{status[i]}</center></th>
              <th><center>{val.location}</center></th>
            </tr>
          </tbody>
          invoice = val.invoice
          Mess = val.MessengerID
          CusName = val.CustomerName
          CusAddess =val.AddressShipment
        arrData.push(tblData)
        });
        this.setState({
          showTable:arrData,
          showINVOICEID:invoice,
          showMessengerID:Mess,
          showCustomerName:CusName,
          showAddressShipment:CusAddess,
        })
  }).catch((err) => {

  });
}

  render() {
    return (
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
                          <Button color="success" onClick={this.selectOrder}>ค้นหา</Button>
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
                  <h3><strong>สถานะปัจจุบัน : เสร็จสิ้น </strong></h3>
                  <Table striped>
                    <tr>
                      <th><center>ลำดับ</center></th>
                      <th><center>วันที่ </center></th>
                      <th><center>เวลา</center></th>
                      <th><center> </center></th>
                      <th><center>สถานะ</center></th>
                      <th><center>สถานที่</center></th>
                    </tr>
                      {this.state.showTable}
                  </Table>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

const selectOrder = gql`
query selectOrder($INVOICEID:String!){
    selectOrder(INVOICEID:$INVOICEID){
      invoice
      DateTime
      status
      location
      MessengerID
      CustomerName
      AddressShipment
    }
  }
`

const GraphQL = compose(
)(TrackingOrder)
export default withApollo (GraphQL)