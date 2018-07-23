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
  FormFeedback,
  Input

} from 'reactstrap';
import { gql, withApollo, compose } from 'react-apollo'


class GetTask extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
      showText: "",
      showTable: '',
      num:'',
      showinvoice:0,
      
    };
  }


  queryGettesk = () => {
    this.props.client.query({
      query: queryGettesk,
      variables: {
        "DocumentSet":this.state.showText,
      }
    }).then((result) => {
      console.log("result", result)
      var arrData = []
      var tblData
     
     
      result.data.queryGettesk.forEach(function (val, i) {
        tblData = <tbody>
          <tr>
            <td> <center>{i+1}</center></td>
            <td><center><input  id="invoice" placeholder={val.INVOICEID} required="required" onChange={this.ChangeInvoice}   type="text" class="form-control"  ></input>
            </center></td>
            <td><center>{val.QTYbox}</center></td>
            <td><center>{val.CustomerName}</center></td>
          </tr>
        </tbody>
        arrData.push(tblData)
      
      }, this);
    
      this.setState({
        showTable: arrData,
        num:arrData.length,
       
      })
      console.log("num == "+this.state.num)
      console.log("invoice == "+this.state.showinvoice)
    }).catch((err) => {

    });
  }


  
  queryGetteskUpdate = () => {

if (this.state.showinvoice >= this.state.num){

    if(window.confirm("กรุณายืนยัน")){
    this.props.client.mutate({
      mutation: queryGetteskUpdate,
      variables: {
        "DocumentSet":this.state.showText,
      }
    }).then((result) => {
      console.log("result", result)
      window.alert("รับงานสำเร็จ")
      window.location.reload()
      
    }).catch((err) => {
      
    });
  }
}else
{ alert('Invoice ไม่ครบ' )}
}

  ChangeText = (e) => {
    this.setState({
        showText: e.target.value
    })
}
ChangeInvoice = (e) => {
  this.setState({
      showinvoice: this.state.showinvoice+1
     
  })
  console.log("showinvoice=="+this.state.showinvoice)
}

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
              <h4><strong>รับงาน</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group ">
                          <label for="exampleInputName2" class="pr-1"><strong>เลขชุดเอกสาร</strong></label>
                          &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" onChange={this.ChangeText}></input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button  type="button" class="btn btn-success" onClick={this.queryGettesk}>ค้นหา</button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>เลขชุดเอกสาร</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value= {this.state.showText} disabled>
                          </input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <h5><strong>จำนวนรวม {this.state.num} บิล</strong></h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="15%"><center>ลำดับ</center></th>
                        <th width="30%"><center>รหัส  invoice</center></th>
                        <th width="15%"><center>จำนวนกล่อง</center></th>
                        <th><center>ผู้รับ</center></th>
                      </tr>
                    </thead>
                    {this.state.showTable}
                  </Table>
                  <div col="2" class="mb-3 mb-xl-0 text-center col"><button class="btn-pill btn btn-success btn-lg"onClick={this.queryGetteskUpdate} >เทียบ</button></div>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const queryGettesk = gql`
query queryGettesk($DocumentSet:String!){
  queryGettesk(DocumentSet:$DocumentSet){
    INVOICEID
    QTYbox
    CustomerName
  }
}
`

const queryGetteskUpdate = gql`
mutation queryGettesk($DocumentSet:String!){
  queryGettesk(DocumentSet:$DocumentSet){
    Status
  }
}
`


const GraphQL = compose(
)(GetTask)
export default withApollo(GraphQL)
