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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

var _dateTime
var trip
class TrackingMess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMess:'',
      showDate:'',
      showTrip:'',
      showTable:'',
      showDateTime:'',
      showMessID:'',
      showMessTrip:'',
      test:'',
      shownotFinish:'',
      showfinish:'',
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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

  ChooseTrip=(e)=>{
    this.setState({
      showTrip:e.target.value
    })
    //console.log("Trip",this.state.showTrip)
  }

  trackingMess=()=>{
    //console.log("1234567890")
    if(this.state.showMess != '' && this.state.showTrip != ''){
      _dateTime = moment(this.state.startDate).format("YYYY-MM-DD")
      trip = parseInt(this.state.showTrip)
        this.props.client.query({
          query:trackingMess,
          variables: {
            "MessengerID":this.state.showMess,
            "DateTime":_dateTime,
            "Trip": trip,
          }
        }).then((result) => {
          //console.log("result",result)
          if(result.data.trackingMess.length != 0){
            var arrData = []
              var tblData
              var Mess
              var DateTime
              var Trip
              var correct
              var _false
              var img
              var status_list = {
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
              
              result.data.trackingMess.forEach(function (val,i) {
                correct = require('../../../assets/img/brand/checked.png')
                _false = require('../../../assets/img/brand/false.png')
                if (val.status == 'B1' || val.status == 'B2' ||val.status == 'B3' ||val.status == 'B4' ||val.status == 'B5' ||val.status == 'B6' ||val.status == 'B7'){
                  img = _false
                }else {
                  img = correct
                }
                tblData =<tr>
                    <th><center>{i+1}</center></th>
                    <th width="15%"><center>{val.Date}</center></th> 
                    <th width="15%"><center>{val.Time}</center></th>
                    <th><center><img height="55" width="55" src={img} />&nbsp;&nbsp;</center></th>
                    <th><center>{val.invoice}</center></th>
                    <th width="20%"><center>{status_list[val.status]}</center></th>
                    <th><center>{val.location}</center></th>
                  </tr>
                Mess = val.MessengerID
                Trip = val.Trip
                DateTime = moment(val.Date).format("DD-MM-YYYY")
              arrData.push(tblData)
              });
              //console.log("วันที่",DateTime)
              this.setState({
                showTable:arrData,
                showMessID:this.state.showMess,
                showMessTrip:Trip,
                showDateTime:DateTime
              })
            } else{
                alert("ไม่พบข้อมูล")
            }
        }).catch((err) => {
      
        });
        this.trackingStatusMess(_dateTime)
    }else{
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
  }

  trackingStatusMess(_dateTime){
    console.log("วัน",_dateTime)
    trip = parseInt(this.state.showTrip)
    this.props.client.query({
      query:trackingStatusMess,
      variables: {
        "MessengerID":this.state.showMess,
        "DateTime":_dateTime,
        "Trip": trip,
      }
    }).then((result) => {
      console.log("status",result)
      var finish = result.data.trackingStatusMess[0].statusA
      var allTrack = result.data.trackingStatusMess[0].allinvoice
      var notFinish =  allTrack - finish
      console.log("status",allTrack)
      this.setState({
        showfinish: finish,
        shownotFinish: notFinish
      })
    }).catch((err) => {
  
    });
  }

  componentWillMount(){
    this.queryAssingmentIDmess()
  }

  render() {
    return (
      <html lang="en">
      <title>ติดตามแมสเซนเจอร์</title> 
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
                          &nbsp;&nbsp;<DatePicker selected={this.state.startDate} onChange={this.handleChange} tabIndex={1}/>
                          </div>
                          <div class="pr-1 form-group">
                          &nbsp;&nbsp;<Label for="exampleSelect"><strong>Trip</strong></Label>&nbsp;&nbsp;
                          <Input type="select" name="select2" id="exampleSelect2" onChange={this.ChooseTrip}>
                            <option value=''>---</option>
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
                    <h3><strong>ยังไม่ได้ส่ง : {this.state.shownotFinish} บิล ส่งแล้ว : {this.state.showfinish} บิล </strong></h3>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th><center>ลำดับ</center></th>
                          <th><center>วันที่ </center></th>
                          <th><center>เวลา</center></th>
                          <th><center> </center></th>
                          <th><center>เลข Invoice</center></th>
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


const trackingStatusMess = gql`
query trackingStatusMess($MessengerID:String!,$DateTime:String!,$Trip:Int!){
  trackingStatusMess(MessengerID:$MessengerID,DateTime:$DateTime,Trip:$Trip){
      statusA
      allinvoice
    }
  }
`

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
      Trip
      invoice
      Date
      Time
      status
      location
    }
  }
`

const GraphQL = compose(
)(TrackingMess)
export default withApollo (GraphQL)
