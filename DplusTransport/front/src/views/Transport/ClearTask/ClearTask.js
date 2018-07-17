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
} from 'reactstrap';



import { gql, withApollo, compose } from 'react-apollo'



class ClearTask extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      showMess:'',
      showDropdown:'',
      showDate:'',
      dropdownOpen: new Array(6).fill(false),
    };
  }

  chooseMess=(e)=>{
    this.setState({
      showMess:e.target.value,
     
    })
 }



 chooseDate=(e)=>{
  this.setState({
    showDate:e.target.value
  })
}

QueryClearTask = () => {
  this.props.client.query({
    query: QueryClearTask,
    variables: {
      "MessID":this.state.showMess,
      "Date":this.state.showDate,

    }
  }).then((result) => {
    console.log("result", result)
    var arrData = []
    var tblData
    result.data.QueryClearTask.forEach(function (val, i) {
      tblData = 
      <tr>
                      <td><center><input type="checkbox" value=""></input></center></td>
                      <td><center>{i+1}</center></td>
                      <td><center>{val.Status}</center></td>
                      <td><center>{val.ReasonCN}</center></td>
                      <td><center>{val.Datetime}</center></td>
                      <td><center>{val.INVOICEID}</center></td>
                      <td><center>{val.CustomerName}</center></td>
                      <td><center>{val.AmountActual}</center></td>
                        <td><center><button class="btn btn-outline-success btn-block">เคลียร์</button></center></td>
                        <td><center><button class="btn btn-outline-danger btn-block">CN</button></center></td>
                    </tr>
      
      
    
      arrData.push(tblData)
    });
    this.setState({
      showTable: arrData
    })
  }).catch((err) => {

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

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
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
              <h4><strong>เคลียร์งาน</strong></h4>
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
                        <div class="pr-1 form-group">
                        <Label for="date" class="pr-1"><strong>วันที่</strong></Label>
                          &nbsp;&nbsp;<Input id="date" name="date" placeholder="" required="" type="date" class="form-control" onChange={this.chooseDate} ></Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <button  type="button" class="btn btn-success" onClick={this.QueryClearTask}>ค้นหา</button>
                       
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label for="exampleInputName2" class="pr-1"><strong>Messenger</strong></Label>&nbsp;&nbsp;
                          <Input id="exampleInputName2" placeholder="" required=""  type="text" class="form-control" value= {this.state.showMess} disabled>
                          </Input>
                          &nbsp;&nbsp;<Label for="exampleInputName3" class="pr-1"><strong>วันที่</strong></Label>&nbsp;&nbsp;
                      <Input id="exampleInputName3" placeholder="" required="" type="text" class="form-control" value={this.state.showDate} disabled>
                          </Input>
                          </div>
                      </form>
                    </div>
                  </div>
                  <h5><strong>จำนวนรวม 0 บาท</strong></h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="5%"><center><button aria-pressed="true" class="btn-pill btn btn-primary btn-block">all</button></center></th>
                        <th width="10%"><center>ลำดับ</center></th>
                        <th width="10%"><center>status</center></th>
                        <th ><center>หมายเหตุ</center></th>
                        <th width="10%"><center>วันที่</center></th>
                        <th width="15%"><center>รหัส invoice</center></th>
                        <th><center>ผู้รับ</center></th>
                        <th><center>ยอดเงิน</center></th>
                        <th width="5%"><center></center></th>
                        <th width="5%"><center></center></th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    
                        {this.state.showTable} 
                   
                      
                    </tbody>
                  </Table>
                  <div col="2" class="mb-3 mb-xl-0 text-center col"><button class="btn-pill btn btn-success btn-lg">เคลียร์</button></div>
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

const QueryClearTask = gql`
query QueryClearTask($MessID:String!,$Date:String!){
  QueryClearTask(MessID:$MessID,Date:$Date){
    Status
    ReasonCN
    INVOICEID
    CustomerName
    AmountActual
    Datetime
  }
}
`

const GraphQL = compose(
)(ClearTask)
export default withApollo (GraphQL)

