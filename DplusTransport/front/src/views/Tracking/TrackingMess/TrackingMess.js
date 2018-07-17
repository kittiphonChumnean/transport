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
import { withApollo, gql, compose } from 'react-apollo';

var dateTime
var trip
class TrackingMess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMess:'',
      showDate:'',
      showTrip:'',
      showZone:'',
      showTable:'',
      showDateTime:'',
      showMessID:'',
      showMessTrip:''
    };
  }

  queryAssingmentIDmess=()=>{
    this.props.client.query({
        query:queryAssingmentIDmess
    }).then((result) => {
        console.log("result",result)
        var arrMess = []
        var DropdownMess
        result.data.queryAssingmentIDmess.forEach(function (val,i) {
          DropdownMess = <option>{val.IDMess}</option>
          arrMess.push(DropdownMess)
        });
        this.setState({
          showDropdown:arrMess
        })
    }).catch((err) => {

    });
  }

  ChooseMess=(e)=>{
    this.setState({
      showMess:e.target.value
    })
    //console.log("Mess",this.state.showMess)
 }

  ChooseDate=(e)=>{
    this.setState({
      showDate:e.target.value     
    })
  }

  ChooseTrip=(e)=>{
    this.setState({
      showTrip:e.target.value
    })
    //console.log("Trip",this.state.showTrip)
  }

  trackingMess=()=>{
    console.log("1234567890")
    dateTime = moment(this.state.showDate).format("YYYY-MM-DD")
    trip = parseInt(this.state.showTrip)
    //console.log("ค่า",this.state.showTrip)
    //console.log("ค่า2",this.state.showDate)
    //console.log("ค่า3",this.state.showMess)
      this.props.client.query({
        query:trackingMess,
        variables: {
          "MessengerID":this.state.showMess,
          "DateTime":dateTime,
          "Trip": trip,
        }
      }).then((result) => {
        console.log("result",result)
        var arrData = []
          var tblData
          var status =[]
          var Mess
          var DateTime
          var Zone
          var Trip
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
          result.data.trackingMess.forEach(function (val,i) {
            tblData = <tbody>
              <tr>
                <th><center>{i+1}</center></th>
                <th width="15%"><center>{moment(val.DateTime).format("DD-MM-YYYY")}</center></th> 
                <th width="15%"><center>{moment(val.DateTime).format("hh:mm:ss")}</center></th>
                <th><center><img src={require('../../../assets/img/brand/checked.png')} />&nbsp;&nbsp;</center></th>
                <th><center>{val.invoice}</center></th>
                <th width="20%"><center>{status_list[val.status]}</center></th>
                <th><center>{val.location}</center></th>
              </tr>
            </tbody>
            Mess = val.MessengerID
            Zone =val.StoreZone
            Trip = val.Trip
            DateTime = moment(val.DateTime).format("DD-MM-YYYY")
          arrData.push(tblData)
          });
          this.setState({
            showTable:arrData,
            showMessID:Mess,
            showZone:Zone,
            showMessTrip:Trip,
            showDateTime:DateTime
          })
    }).catch((err) => {
  
    });
  }

  componentWillMount(){
    this.queryAssingmentIDmess()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
              <h4><strong>ติดตามแมสเซนเจอร์</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">

                        <div class="pr-1 form-group">
                        <Label for="exampleSelect"><strong>Messenger</strong></Label>&nbsp;&nbsp;
                        <Input type="select" name="select" id="exampleSelect" onChange={this.ChooseMess}>
                          <option>---</option>
                          {this.state.showDropdown}
                        </Input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label for="exampleInputName2"><strong>วันที่</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" type="date" onChange={this.ChooseDate}></Input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label for="exampleSelect"><strong>Trip</strong></Label>&nbsp;&nbsp;
                        <Input type="select" name="select2" id="exampleSelect2" onChange={this.ChooseTrip}>
                          <option>---</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <Button color="success" onClick={this.trackingMess} >ค้นหา</Button>
                        </div>
                      </form>
                      <br/>
                      <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <Label><strong>Messenger</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" value={this.state.showMessID} disabled>
                        </Input>
                      </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label><strong>Zone</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" value={this.state.showZone} disabled>
                        </Input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label><strong>วันที่</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" value={this.state.showDateTime} disabled>
                        </Input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label><strong>Trip</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" value={this.state.showMessTrip} disabled>
                        </Input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <br/>
                  <h3><strong>สถานะปัจจุบัน :  </strong></h3>
                  <Table striped>
                    <tr>
                      <th><center>ลำดับ</center></th>
                      <th><center>วันที่ </center></th>
                      <th><center>เวลา</center></th>
                      <th><center> </center></th>
                      <th><center>เลข Invoice</center></th>
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

const queryAssingmentIDmess = gql`
  query queryAssingmentIDmess{
    queryAssingmentIDmess{
      IDMess
    }
  }
`

const trackingMess = gql`
query trackingMess($MessengerID:String!,$DateTime:String!,$Trip:Int!){
  trackingMess(MessengerID:$MessengerID,DateTime:$DateTime,Trip:$Trip){
      MessengerID
      StoreZone
      Trip
      invoice
      DateTime
      status
      location
    }
  }
`

const GraphQL = compose(
)(TrackingMess)
export default withApollo (GraphQL)
