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
import moment from 'moment';

var dateTime
class TransportReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSale:'',
      showDateTime:'',
      selectSale:'',
      selectDate:''
    };
  }

  selectSale=()=>{
    this.props.client.query({
        query:selectSale
    }).then((result) => {
        console.log("result",result)
        var arrSale = []
        var DropdownSale
        result.data.selectSale.forEach(function (val,i) {
          DropdownSale = <option>{val.SaleID}</option>
          arrSale.push(DropdownSale)
        });
        this.setState({
          showDropdown:arrSale
        })
    }).catch((err) => {

    });
  }

  chooseSale=(e)=>{
    this.setState({
      selectSale:e.target.value
    })
  }

 chooseDate=(e)=>{
    this.setState({
      selectDate:e.target.value
    })
  }
  
  transportReport=()=>{
    console.log("1234567890")
    dateTime = moment(this.state.selectDate).format("YYYY-MM-DD")
      this.props.client.query({
        query:transportReport,
        variables: {
          "SaleID":this.state.selectSale,
          "DateTime":dateTime,
        }
      }).then((result) => {
        console.log("result",result)
        var arrData = []
          var tblData
          var Sale
          var DateTime
          result.data.transportReport.forEach(function (val,i) {
            tblData = <tbody>
              <tr>
                <td><center>{i+1}</center></td>
                <td><center>{val.INVOICEID}</center></td> 
                <td><center>{val.CustomerID}</center></td>
                <td><center>{val.SaleID}</center></td>
                <td><center>{val.MessengerID}</center></td>
                <td><center>{val.Status}</center></td>
                <td><center>{val.ReasonCN}</center></td>
              </tr>
            </tbody>
            Sale = val.SaleID
            DateTime = moment(val.DateTime).format("DD-MM-YYYY")
          arrData.push(tblData)
          });
          this.setState({
            showTable:arrData,
            showSale:Sale,
            showDateTime:DateTime
          })
    }).catch((err) => {
  
    });
  }


 componentWillMount(){
  this.selectSale()
}
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
              <h4><strong>รายงานการส่ง</strong>
                <img src={require('../../../assets/img/brand/pdf.png')} align="right" />
                &nbsp;&nbsp;<img src={require('../../../assets/img/brand/excel.png')} align="right" />
                </h4>
              </CardHeader>
              <CardBody>              
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline">
                        <div class="pr-1 form-group ">
                          <Label for="exampleSelect"><strong>Sale</strong></Label>
                          &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect" onChange={this.chooseSale}>
                            <option>---</option>
                            {this.state.showDropdown}
                          </Input>                         
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <Label for="exampleInputName2" ><strong>วันที่</strong></Label>&nbsp;&nbsp;
                          <Input id="exampleInputName2" type="date" onChange={this.chooseDate}></Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <Button color="success" onClick={this.transportReport}>ค้นหา</Button>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        <Label for="exampleInputName2"><strong>Sale</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" value={this.state.showSale} disabled>
                        </Input>
                      </div>
                      <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label for="exampleInputName2"><strong>วันที่</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" value={this.state.showDateTime} disabled>
                          </Input>
                      </div>
                      </form>
                    </div>
                  </div>
                  <br/>  

                  <Table>
                    <thead>
                      <tr>
                        <th><center>ลำดับ</center></th>
                        <th><center>เลขที่ invoice</center></th>
                        <th><center>รหัสลูกค้า</center></th>
                        <th><center>Sale</center></th>
                        <th><center>Messenger</center></th>
                        <th><center>สถานะ</center></th>
                        <th><center>หมายเหตุ</center></th>
                      </tr>
                    </thead>
                    {this.state.showTable}
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const selectSale = gql`
  query selectSale{
    selectSale{
      SaleID
    }
  }
`

const transportReport = gql`
query transportReport($SaleID:String!,$DateTime:String!){
  transportReport(SaleID:$SaleID,DateTime:$DateTime){
      INVOICEID
      CustomerID
      SaleID
      MessengerID
      Status
      ReasonCN
    }
  }
`

const GraphQL = compose(
)(TransportReport)
export default withApollo (GraphQL)