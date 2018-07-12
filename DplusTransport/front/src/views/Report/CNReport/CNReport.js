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




class CNReport extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      showSale:'',
      showstartDate:'',
      showendDate:'',
      showTable:'',
      
      dropdownOpen: new Array(6).fill(false),
    };
  }


  choosestartDate=(e)=>{
    this.setState({
      showstartDate:e.target.value
    })
  }

  chooseendDate=(e)=>{
    this.setState({
      showendDate:e.target.value
    })
  }

  
  QueryCNReport = () => {
    this.props.client.query({
      query: QueryCNReport,
      variables: {
        "SaleID":this.state.showSale,
        "DateStart":this.state.showstartDate,
        "DateEnd":this.state.showendDate,
      }
    }).then((result) => {
      console.log("result", result)
      var arrData = []
      var tblData
      result.data.QueryCNReport.forEach(function (val, i) {
        tblData = 
        <tr>
                        <td><center>{i+1}</center></td>
                        <td><center>{val.SaleID}</center></td>
                        <td><center>{val.INVOICEID}</center></td>
                        <td><center>{val.CustomerID}</center></td>
                        <td><center>{val.QtyBill}</center></td>
                        <td><center>{val.AmountBill}</center></td>
                        <td><center>{val.Datetime}</center></td>
                        <td><center>{val.AmountActual}</center></td>
                        <td><center>{(val.QtyBill)-(val.QtyActual)}</center></td>
                        <td><center>{(val.AmountBill)-(val.AmountActual)}</center></td>
                        <td><center>{(val.QtyBill)- ((val.QtyBill)-(val.QtyActual))}</center></td>
                        <td><center>{val.ReasonCN}</center></td>
                        
                      </tr>
        

        arrData.push(tblData)
      });
      this.setState({
        showTable: arrData
      })
    }).catch((err) => {

    });
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
      showSale:e.target.value
    })
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
    this.selectSale()
  }

  render() {
    return (
     
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
              <h4><strong>รายงานคืนสินค้า</strong>
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
                        <option value="">---</option>
                          {this.state.showDropdown}
                        </Input>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                      <Label for="date" class="pr-1"><strong>วันที่เริ่ม</strong></Label>
                          &nbsp;&nbsp;<Input id="date" name="date" placeholder="" required="" type="date" class="form-control" onChange={this.choosestartDate} ></Input>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                      <Label for="date" class="pr-1"><strong>วันที่สิ้นสุด</strong></Label>
                          &nbsp;&nbsp;<Input id="date" name="date" placeholder="" required="" type="date" class="form-control" onChange={this.chooseendDate} ></Input>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                      <button  type="button" class="btn btn-success" onClick={this.QueryCNReport}>ค้นหา</button>
                      </div>
                    </form>
                    <br/>
                    <form action="" method="post" class="form-inline">
                    <div class="pr-1 form-group">
                    <Label for="exampleInputName2" class="pr-1"><strong>Sale</strong></Label>
                      &nbsp;&nbsp;<Input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showSale} disabled>
                          </Input>
                      </div>
                      <div class="pr-1 form-group">
                      &nbsp;&nbsp;<label for="exampleInputName3" class="pr-1"><strong>วันที่เริ่ม</strong></label>&nbsp;&nbsp;
                      <Input id="exampleInputName3" placeholder="" required="" type="text" class="form-control" value={this.state.showstartDate} disabled>
                          </Input>
                      </div>
                      <div   class="pr-1 form-group" >
                      &nbsp;&nbsp;<label for="exampleInputName3" class="pr-1"><strong>ถึง</strong></label>&nbsp;&nbsp;
                      <Input id="exampleInputName3" placeholder="" required="" type="text" class="form-control" value={this.state.showendDate} disabled>
                          </Input>
                      </div>
                      </form>
                  </div>
                </div>
                  <br/> 
                  <center>
                  <Table responsive>
                    <thead>
                      <tr>

                        <th><center>ลำดับ</center></th>
                        <th><center>Sale</center></th>
                        <th><center>invoice</center></th>
                        <th><center>ลูกค้า</center></th>
                        <th><center>Qty ยอดจริง</center></th>
                        <th><center>ยอดเงินจริง</center></th>
                        <th><center>วันที่เคลียร์บิล</center></th>
                        <th><center>ยอดเงินที่เก็บได้</center></th>
                        <th><center>จำนวน CN</center></th>
                        <th><center>ยอด CN</center></th>
                        <th><center>จำนวนคงเหลือ</center></th>
                        <th><center>เหตุผล</center></th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.showTable}
                    </tbody>
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



const selectSale = gql`
  query selectSale{
    selectSale{
      SaleID
    }
  }
`

const QueryCNReport = gql`
query QueryCNReport($SaleID:String!,$DateStart:String!,$DateEnd:String!){
  QueryCNReport(SaleID:$SaleID,DateStart:$DateStart,DateEnd:$DateEnd){
    SaleID
    INVOICEID
    CustomerID
    QtyBill
    QtyActual
    AmountBill
    AmountActual
    Datetime
    ReasonCN
  }
}
`

const GraphQL = compose(
)(CNReport)
export default withApollo (GraphQL)


//export default CNReport;
