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
} from 'reactstrap';
import { withApollo, gql, compose } from 'react-apollo';

class AssignmentDoc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDropdown:'',
      showMess:'',
      showDate:'',
      showType:'',
      showLocation:'',
      showDetail:''
    };
  }

  ChooseMess=(e)=>{
    this.setState({
      showMess:e.target.value
    })
 }

 ChooseDate=(e)=>{
  this.setState({
    showDate:e.target.value
  })
}

ChooseType=(e)=>{
  this.setState({
    showType:e.target.value
  })
}

ChooseLocation=(e)=>{
  this.setState({
    showLocation:e.target.value
  })
}

ChooseDetail=(e)=>{
  this.setState({
    showDetail:e.target.value
  })
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

  ClickSave=()=>{
    if(window.confirm("กรุณายืนยันการส่งข้อมูล")){
      this.props.client.mutate({
        mutation:insertDoc,
        variables: {
          "MessengerID": this.state.showMess,
          "Date": this.state.showDate,
          "Type": this.state.showType,
          "Location": this.state.showLocation,
          "Detail": this.state.showDetail,
        }
      }).then((result) => {
          console.log("result",result)
          if (result.data.insertDoc.status === true) {
            alert("บันทึกข้อมูลเรียบร้อย")
            window.location.reload()
        } else {
            alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
            return false
        }
      }).catch((err) => {

      });
    }
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
              <h4><strong>จ่ายงานเอกสาร</strong></h4>
              </CardHeader>
              <CardBody>
              <div class="col-12">
                <div class="col-12">
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
                  </form>
                </div>
                <br/>
                <div class="col-12">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <Label for="exampleSelect"><strong>ประเภท</strong></Label>&nbsp;&nbsp;
                        <Input type="select" name="select" id="exampleSelect" onChange={this.ChooseType}>
                          <option>---</option>
                          <option value="รับของเคลม">รับของเคลม</option>
                          <option value="รับ-ส่งเอกสาร">รับ-ส่งเอกสาร</option>
                        </Input>
                      </div>
                      <div class="pr-1 form-group">
                      &nbsp;&nbsp;<Label for="name" class=""><strong>สถานที่</strong></Label>&nbsp;&nbsp;
                        <Input id="name" type="text" onChange={this.ChooseLocation}></Input>
                      </div>
                  </form>
                  <br/>
                </div>
                <div class="col-12">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <label for="name" class=""><strong>รายละเอียด</strong></label>&nbsp;&nbsp;
                        <textarea rows="10" cols="45" id="name" onChange={this.ChooseDetail}></textarea>
                      </div>
                  </form>
                </div>
                <br/>
                <div class="col-8">
                <Button color="success" onClick={this.ClickSave}>บันทึก</Button>
                </div>
              </div>
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

const insertDoc = gql`
mutation insertDoc($MessengerID:String!,$Date:String!,$Type:String!,$Location:String!,$Detail:String!){
  insertDoc(MessengerID:$MessengerID,Date:$Date,Type:$Type,Location:$Location,Detail:$Detail,){
   status
  }
}
`

const GraphQL = compose(
)(AssignmentDoc)
export default withApollo (GraphQL)