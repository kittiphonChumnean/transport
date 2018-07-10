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
      dropdownOpen: new Array(6).fill(false),
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
      showText: e.target.value
    })
 }
 ChangeText = (e) => {
  this.setState({
      showtrip: e.target.value
  })
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
                          {this.state.showDropdown}
                        </Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <Label for="exampleSelect"><strong>Trip</strong></Label>
                        &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect" onChange= {this.ChangeText} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>

                        </Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button aria-pressed="true" class="btn-pill btn btn-success btn-block">&nbsp;&nbsp;&nbsp;&nbsp;ค้นหา&nbsp;&nbsp;&nbsp;&nbsp;</button>
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
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center><button class="btn btn-outline-danger btn-block">ยกเลิก</button></center></td>
                      </tr>
                    </tbody>
                  </Table>
                  <div col="2" class="mb-3 mb-xl-0 text-center col"><button class="btn-pill btn btn-success btn-lg">บันทึก</button></div>
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

const GraphQL = compose(
)(Assignment)
export default withApollo (GraphQL)

