import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Label,
  Input,
  Table,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import { withApollo, gql, compose } from 'react-apollo';
import ConfirmDetail from './ConfirmDetail';

class ConfirmBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showDropdown:'',
      showSale:'',
      showDate:'',
      showTable:'',
      INVOICEID:false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
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

  chooseDate=(e)=>{
    this.setState({
      showDate:e.target.value
    })
  }

  seachBill=()=>{
    //console.log("1234567890")
      this.props.client.query({
        query:selectAllBill,
        variables: {
          "SaleID":this.state.showSale,
          "invoicedate":this.state.showDate
        }
      }).then((result) => {
        console.log("3333",result)
        var arrData = []
        var tblData
        result.data.selectAllBill.forEach(function (val,i) {
          tblData = <tbody>
            <tr>
              <td><center><Input type="checkbox" value=""></Input></center></td>
              <td><center>{i+1}</center></td>
              <td><center><Button color="link" >{val.INVOICEID}</Button></center></td> 
              <td> </td>
              <td><center>{val.DELIVERYNAME}</center></td>
              <td><center>{val.Customer_Address}</center></td>
              <td><center><Button color="success">คอนเฟริม</Button></center></td>
            </tr>
          </tbody>
        arrData.push(tblData)
        });
        this.setState({
          showTable:arrData
        })
    }).catch((err) => {

    });
}

  confirm() {
    var arrData = []
    this.state.showTable.forEach(function (val,i) {
      arrData.push({
        INVOICEID: val.INVOICEID,
        DELIVERYNAME: val.DELIVERYNAME,
        Customer_Address: val.Customer_Address,
        Sale_Name: val.Sale_Name,
        StoreZone: val.StoreZone,
        CustomerID: val.CustomerID,
        CustomerName: val.CustomerName
    })
    });
    this.saveData(arrData)
  }

  saveData(data) {
    this.props.client.mutate({
        mutation: insertBill,
        variables: {
            "insertData": data
        }
    }).then(res => {
        console.log("Client Res", res)
        if (res.data.insertMaster_And_Transaction.status === "2") {
            alert("บันทึกข้อมูลเรียบร้อย")
            window.location.reload()
        } else {
            alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
            return false
        }
    })
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
                <h4><strong>คอนเฟริมบิล</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group ">
                        <Label for="exampleSelect"><strong>Sale</strong></Label>
                        &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect" onChange={this.selectSale}>
                          {this.state.showDropdown}
                        </Input>
                        </div>
                        <div class="pr-1 form-group">
                          &nbsp;<Label for="date" class="pr-1"><strong>วันที่</strong></Label>
                          &nbsp;&nbsp;<Input id="date" name="date" placeholder="" required="" type="date" class="form-control" onChange={this.chooseDate} ></Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <Button onClick={this.seachBill}>ค้นหา</Button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                          &nbsp;&nbsp;<Label for="exampleInputName2" class="pr-1"><strong>Sale</strong></Label>&nbsp;&nbsp;
                          <Input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showSale} disabled>
                          </Input>
                          &nbsp;&nbsp;<label for="exampleInputName3" class="pr-1"><strong>วันที่</strong></label>&nbsp;&nbsp;
                          <Input id="exampleInputName3" placeholder="" required="" type="text" class="form-control" value={this.state.showDate} disabled>
                          </Input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <br />
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="5%"><center><Button color="primary">all</Button></center></th>
                        <th width="5%"><center>ลำดับ </center></th>
                        <th width="15%"><center>รหัส invoice</center></th>
                        <th width="10%"><center>จำนวนกล่อง</center></th>
                        <th width="20%"><center>ผู้รับ</center></th>
                        <th><center>ที่อยู่</center></th>
                        <th width="10%"></th>
                      </tr>
                    </thead>
                    {this.state.showTable}
                  </Table>
                  <Button color="success" onclick={this.confirm}>คอนเฟริมทั้งหมด</Button>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>       
      </div>
    );
  }
}


const insertBill = gql`
mutation insertBill($insertData:[inDataTypeAddQuota]){
    insertBill(inData:$insertData){
        status
    }
}
`

const selectSale = gql`
  query selectSale{
    selectSale{
      SaleID
    }
  }
`

const selectAllBill = gql`
query selectAllBill($SaleID:String!,$invoicedate:String!){
  selectAllBill(SaleID:$SaleID,invoicedate:$invoicedate){
    INVOICEID
    DELIVERYNAME
    Customer_Address
    Sale_Name
    StoreZone
    CustomerID
    CustomerName
  }
}
`

  const GraphQL = compose(
  )(ConfirmBill)
  export default withApollo (GraphQL)

//export default ConfirmBill