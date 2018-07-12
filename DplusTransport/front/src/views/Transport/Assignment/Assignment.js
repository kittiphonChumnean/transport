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
  Input
}
  from 'reactstrap';
  import { gql, withApollo, compose } from 'react-apollo'
class Assignment extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      showMess:'',
      showDropdown:'',
      showText: "",
      showtrip: "",
      showzone:"",
      addrow: '',
      INVOICEID:'',
      DataDELIVERYNAME:'',
      DataCustomer:'',
      itemIDmess:'',
      itemInvoice:'',
      itemtrip:'',
      dropdownOpen: new Array(6).fill(false),
    };
    this.ClickSave = this.ClickSave.bind(this)
  }
//----------addRow Table----------//
  addRowTable =()=>{
    var row
    row =   
    <tr>
      <td><center>2</center></td>
      <td><center><input id="invoice"  required= "" type="text" class="form-control" ></input></center></td>
      <td><center></center></td>
      <td><center></center></td>
      <td><center><button class="btn btn-outline-danger btn-block">ยกเลิก</button></center></td>
      <td width="1%"><button class="btn btn-outline-warning btn-block" >ยิง</button></td>
    </tr>
    
    this.setState({
      addrow: row
    })
 }

 //------------query IDmess with dropdow--------------//
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

//-----------------data invoice-------------------//
  queryAssingmentInvoice=()=>{
    //console.log("1234567890")
      this.props.client.query({
        query:queryAssingmentInvoice,
        variables: {
          "INVOICEID":this.state.INVOICEID
         
        }
      }).then((result) => {
        console.log("3333",result)
        var DataCustomer
        var DataDELIVERYNAME
        result.data.queryAssingmentInvoice.forEach(function (val,i) {
          DataCustomer = val.CustomerName,
          DataDELIVERYNAME = val.DELIVERYNAME

        });     
        this.setState({
          DataCustomer:DataCustomer,
          DataDELIVERYNAME,DataDELIVERYNAME
        })
    }).catch((err) => {

    });
}

//-----------------zone messenger--------------//
  queryAssingmentMess=()=>{
    //console.log("1234567890")
      this.props.client.query({
        query:queryAssingmentMess,
        variables: {
          "IDMess":this.state.showMess
         
        }
      }).then((result) => {
        console.log("3333",result)
        var Datazone
        result.data.queryAssingmentMess.forEach(function (val,i) {
          Datazone = val.Zone
        });     
        this.setState({
          showzone:Datazone
        })
    }).catch((err) => {

    });
}





  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  chooseMess=(e)=>{
    this.setState({
      showMess:e.target.value,
      showText: e.target.value,
      itemIDmess:e.target.value,
    })
 }

 chooseinvoice=(e)=>{
  this.setState({
    INVOICEID:e.target.value,
    itemInvoice:e.target.value,
    
  })
}
 ChangeText = (e) => {
  this.setState({
      showtrip: e.target.value,
      itemtrip:e.target.value,
      
  })
}
 
//---------------insert data to database----------------//
ClickSave(e) {
  
  this.setDataSave(this.state, this.props)
 
}

setDataSave(self, props) {
  var arrData = []
  arrData.push({
    INVOICEID: self.itemInvoice,
    MessengerID: self.itemIDmess,
    Trip: self.itemtrip
  })
  this.saveData(self, props, arrData)
}

saveData(self, props, data) {
  props.client.mutate({
      mutation: queryAssingment,
      variables: {
          "inData": data
      }
      
  }).then(res => {
    console.log(data)
      console.log("Client Res", res)
      this.queryAssingment2()
      if (res.data.queryAssingment.status === "2") {
          alert("บันทึกข้อมูลเรียบร้อย")
          window.location.reload()
      } else {
        console.log(data)
          alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
          return false
      }
  })
}

//---------------update data to database----------------//
queryAssingment2=()=>{
  this.props.client.mutate({
      mutation:queryAssingment2
  }).then((result) => {
      console.log("update",result)
      
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
                <h4><strong>จ่ายงาน</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group ">
                        <Label for="exampleSelect"><strong>Messenger</strong></Label>
                        &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect"  onChange={this.chooseMess}>
                        <option value="">---</option>
                          {this.state.showDropdown}
                        </Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <Label for="exampleSelect"><strong>Trip</strong></Label>
                        &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect" onChange= {this.ChangeText} >
                        <option value="">---</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>

                        </Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        
                        <button  type="button" class="btn btn-success" onClick={this.queryAssingmentMess}>ค้นหา</button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Messenger</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required=""  type="text" class="form-control" value= {this.state.showText} disabled>
                          </input>
                        </div>
                        &nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Trip</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showtrip} disabled >
                          </input>
                        </div>
                        &nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Route</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showzone} disabled>
                          </input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <h5><strong>จำนวนรวม 1 บิล</strong></h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="10%"><center>ลำดับ</center></th>
                        <th width="15%"><center>รหัส  invoice</center></th>
                        <th><center>ผู้รับ</center></th>
                        <th><center>ห้าง</center></th>
                        <th width="10%"></th>
                        <th width="1%"><button class="btn btn-outline-warning btn-block" onClick={this.addRowTable}>+</button></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><center>1</center></td>
                        <td><center><input id="invoice"  required= "" type="text" class="form-control"  onChange={this.chooseinvoice}></input></center></td>
                        <td><center>{this.state.DataCustomer}</center></td>
                        <td><center>{this.state.DataDELIVERYNAME}</center></td>
                        <td><center><button class="btn btn-outline-danger btn-block">ยกเลิก</button></center></td>
                        <td width="1%"><button class="btn btn-outline-warning btn-block"  onClick={this.queryAssingmentInvoice} >ยิง</button></td>
                      </tr>

                    
                      {this.state.addrow}
                    </tbody>
                  </Table>
                  <div col="2" class="mb-3 mb-xl-0 text-center col"><button class="btn-pill btn btn-success btn-lg" onClick={this.ClickSave}>บันทึก</button></div>
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

const queryAssingmentMess = gql`
query queryAssingmentMess($IDMess:String!){
  queryAssingmentMess(IDMess:$IDMess){
    Zone
  }
}
`

const queryAssingmentInvoice = gql`
query queryAssingmentInvoice($INVOICEID:String!){
  queryAssingmentInvoice(INVOICEID:$INVOICEID){
    CustomerName,
    DELIVERYNAME
  }
}
`

const queryAssingment = gql`
mutation queryAssingment($inData:[BilltoAppModel]){
  queryAssingment(inData:$inData){
        status
    }
}
`

const queryAssingment2 = gql`
mutation queryAssingment2{
  queryAssingment2{
    INVOICEID
    }
}
`


const GraphQL = compose(
)(Assignment)
export default withApollo (GraphQL)

