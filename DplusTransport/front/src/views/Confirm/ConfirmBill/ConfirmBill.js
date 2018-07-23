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
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { withApollo, gql, compose } from 'react-apollo';
import ConfirmDetail from './ConfirmDetail';
var arrCheck=[]

class ConfirmBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showDropdown:'',
      showSale:'',
      showDate:'',
      showTable:'',
      INVOICEID:false,
      dataTable:'',
      showTableModal:'',
      showINVOICEID:'',
      TableDetail:'',
      isGoing: true,
    };
    this.ConfrimBill = this.ConfrimBill.bind(this)
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange= invoice => event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (target.checked==true){
      arrCheck.push(invoice)    
    }else{
      arrCheck.splice(arrCheck.findIndex(k => k==invoice),1)
    }
    
    this.setState({
      [name]: value
    });
    console.log(target.checked+'==>'+invoice)
    console.log(arrCheck)
  }

  selectSale=(e)=>{
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
        //onsole.log("3333",result)
        var arrData = []
        var tblData
        result.data.selectAllBill.forEach(function (val,i) {
          tblData = <tbody>
            <tr>
            <td><center> <input
            name="isGoing"
            type="checkbox"
            onChange={this.handleInputChange(val.INVOICEID)} /></center></td>
              <td><center>{i+1}</center></td>
              <td><center><Button color="link" onClick={()=>this.toggle(val.INVOICEID)}>{val.INVOICEID}</Button></center></td> 
              <td> </td>
              <td><center>{val.DELIVERYNAME}</center></td>
              <td><center>{val.Customer_Address}</center></td>
              <td><center><Button color="success" onClick={()=>this.DocumentSet(val.INVOICEID)}>คอนเฟริม</Button></center></td>
            </tr>
          </tbody>
        arrData.push(tblData)
        },this);
        this.setState({
          showTable:arrData,
          dataTable:result
        })
    }).catch((err) => {

    });
}


toggle(INVOICEID) {
  this.props.client.query({
    query:selectDetailBill,
    variables: {
      "INVOICEID":INVOICEID
    }
  }).then((result) => {
    //onsole.log("3333",result)
    var arrData = []
    var tblData
    var invoice
    var QTY
    var TotalAmount
    result.data.selectDetailBill.forEach(function (val,i) {
      var PriceOfUnit = val.TotalAmount / val.QTY
      tblData =<tbody>
        <tr>
          <td><center>{i+1}</center></td>
          <td><center>{val.ITEMID}</center></td>
          <td><center>{val.ItemName}</center></td>
          <td><center>{val.QTY}</center></td>
          <td><center>{val.TotalAmount}</center></td>
          <td><center>{PriceOfUnit}</center></td>
        </tr>
    </tbody>
    arrData.push(tblData)
    invoice = val.INVOICEID
    },this);
    this.setState({
      showTableModal:arrData,
      showINVOICEID:invoice,
    })
}).catch((err) => {

});
  this.setState({
    modal: !this.state.modal
  });
}

DocumentSet2=()=>{
  var Document_Set
    if(window.confirm("กรุณายืนยันการคอนเฟริม")){
    this.props.client.query({
        query:DocumentSet
    }).then((result) => {
        console.log("result",result.data.DocumentSet[0].last)
        var _result = result.data.DocumentSet[0].last
        if(_result < 10){
          Document_Set = 'D0000'+_result
        }else if(_result < 100){
          Document_Set = 'D000'+_result
        }else if(_result < 1000){
          Document_Set = 'D00'+_result
        }else if(_result < 10000){
          Document_Set = 'D0'+_result
        }else if(_result >= 10000){
          Document_Set = 'D'+_result
        }
        console.log('DocumentSet',Document_Set)
        this.ConfrimBill(Document_Set)
    }).catch((err) => {

    });
  }
}

  ConfrimBill(DocumentSet){
    var arrData = []
      arrCheck.forEach(function (val,i) {
        arrData.push({
          INVOICEID:arrCheck[i]
        })
      });
      console.log('arrCheck[i]',arrCheck[0])
      console.log('arr',arrData)
       this.props.client.mutate({
        mutation: insertBill,
        variables: {
            "inData": arrData,
            "DocumentSet": DocumentSet
        }
    }).then(res => {
        console.log("Client Res", res)
        this.updateAX()
        if (res.data.insertBill.status === true) {
            alert("บันทึกข้อมูลเรียบร้อย")
            window.location.reload()
        } else {
            alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
            return false
        }
    })
  }

  updateAX(){
    console.log('เข้า')
    var arrData = []
      this.state.dataTable.data.selectAllBill.forEach(function (val,i) {
        arrData.push({
          INVOICEID:val.INVOICEID
        })
      });

       this.props.client.mutate({
        mutation: updateAX,
        variables: {
            "inData": arrData
        }
    }).then(res => {
      
    })
    
  }

  DocumentSet=(INVOICEID)=>{
    var Document_Set
      if(window.confirm("กรุณายืนยันการคอนเฟริม INVOICEID: "+INVOICEID)){
      this.props.client.query({
          query:DocumentSet
      }).then((result) => {
          console.log("result",result.data.DocumentSet[0].last)
          var _result = result.data.DocumentSet[0].last
          if(_result < 10){
            Document_Set = 'D0000'+_result
          }else if(_result < 100){
            Document_Set = 'D000'+_result
          }else if(_result < 1000){
            Document_Set = 'D00'+_result
          }else if(_result < 10000){
            Document_Set = 'D0'+_result
          }else if(_result >= 10000){
            Document_Set = 'D'+_result
          }
          console.log('DocumentSet',Document_Set)
          this.SaveInvoice(INVOICEID,Document_Set)
      }).catch((err) => {

      });
    }
  }

  SaveInvoice=(INVOICEID,DocumentSet)=>{
      this.props.client.mutate({
        mutation:insertInvoice,
        variables: {
          "INVOICEID": INVOICEID,
          "DocumentSet": DocumentSet
        }
      }).then((result) => {
          console.log("result",result)
          if (result.data.insertInvoice.status === true) {
            alert("บันทึกข้อมูลเรียบร้อย")
            window.location.reload()
            
        } else {
            alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
            return false
        }
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
                <h4><strong>คอนเฟริมบิล</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group ">
                        <Label for="exampleSelect"><strong>Sale</strong></Label>
                        &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect" onChange={this.chooseSale}>
                          <option>---</option>
                          {this.state.showDropdown}
                        </Input>
                        </div>
                        <div class="pr-1 form-group">
                          &nbsp;<Label for="date" class="pr-1"><strong>วันที่</strong></Label>
                          &nbsp;&nbsp;<Input id="date" name="date" type="date" onChange={this.chooseDate} ></Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <Button color="success" onClick={this.seachBill}>ค้นหา</Button>
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
                        <th width="5%"><center> </center></th>
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
                  <Button color="primary" onClick={this.DocumentSet2}>คอนเฟริมบิล</Button>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row> 

          <Modal bsSize="large" isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader>รหัส INVOICEID: <strong>{this.state.showINVOICEID}</strong></ModalHeader>
            <ModalBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th><center>ลำดับ</center></th>
                    <th><center>รหัสสินค้า</center></th>
                    <th><center>ชื่อสินค้า</center></th>
                    <th><center>จำนวน</center></th>
                    <th><center>ยอดเงินรวม</center></th>
                    <th><center>ราคาต่อหน่วย</center></th>
                  </tr>
                </thead>
                {this.state.showTableModal}
              </Table>
           </ModalBody>
          </Modal>
         
      </div>
    );
  }
}


const insertBill = gql`
mutation insertBill($inData:[ConfrimModel],$DocumentSet:String!){
    insertBill(inData:$inData,DocumentSet:$DocumentSet){
        status
    }
}
`

const updateAX = gql`
mutation updateAX($inData:[ConfrimModel]){
    updateAX(inData:$inData){
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

const DocumentSet = gql`
  query DocumentSet{
    DocumentSet{
      last
    }
  }
`

const selectAllBill = gql`
query selectAllBill($SaleID:String!,$invoicedate:String!){
  selectAllBill(SaleID:$SaleID,invoicedate:$invoicedate){
    INVOICEID
    DELIVERYNAME
    Customer_Address
    StoreZone
    CustomerID
    CustomerName
    SaleID
    Sale_Name
  }
}
`

const selectDetailBill = gql`
query selectDetailBill($INVOICEID:String!){
  selectDetailBill(INVOICEID:$INVOICEID){
    INVOICEID
    ITEMID
    ItemName
    QTY
    TotalAmount
  }
}
`

const insertInvoice = gql`
mutation insertInvoice($INVOICEID:String!,$DocumentSet:String!){
    insertInvoice(INVOICEID:$INVOICEID,DocumentSet:$DocumentSet){
        status
    }
}
`

  const GraphQL = compose(
  )(ConfirmBill)
  export default withApollo (GraphQL)

//export default ConfirmBill