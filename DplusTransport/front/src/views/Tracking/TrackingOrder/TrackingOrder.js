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
        var Laststatus
        var invoice
        var Mess
        var CusName
        var CusAddess
        var status_list = {
          '5':'Messenger ตรวจของเรียบร้อย',
          '6':'Messenger คอนเฟริมออกรอบ',
          '7':'Messenger โทรหาลูกค้า',
          '8':'Messenger กดโทรหาลูกค้า',
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
          tblData = <tbody>
            <tr>
              <th><center>{i+1}</center></th>
              <th width="15%"><center>{moment(val.DateTime).format("DD-MM-YYYY")}</center></th> 
              <th width="15%"><center>{moment(val.DateTime).format("hh:mm:ss a")}</center></th>
              <th><center><img src={require('../../../assets/img/brand/checked.png')} />&nbsp;&nbsp;</center></th>
              <th width="20%"><center>{status_list[val.status]}</center></th>
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
          showLastStatus: Laststatus
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
                  <h3><strong>สถานะปัจจุบัน : {this.state.LastStatus}</strong></h3>
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