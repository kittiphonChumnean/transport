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
} from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withApollo, gql, compose } from 'react-apollo';
import EllipsisText  from 'react-ellipsis-text';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
var style_modal = {
  color:'red',
  marginRight:10,
  marginLeft:10
}
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var arrDataPDF = []

var arrCheck=[]
function buildTableBody(data, columns) {
  var body = [];

  body.push(columns);

  data.forEach(function (row) {
    var dataRow = [];

    columns.forEach(function (column) {
      dataRow.push(row[column].toString());
    })

    body.push(dataRow);
  });

  return body;
}

function table(data, columns) {
  return {
    table: {
      //widths: [0, 0, 0, 0],
     
      headerRows: 1,
      body: buildTableBody(data, columns),

    },
    layout: {
      hLineWidth: function(i, node) {
        return 1;
        
      }
    },
    margin: [55, 15, 0, 0]
  };
}


pdfMake.fonts = {
  THSarabun: {
    normal: 'THSarabun.ttf',
    bold: 'THSarabun Bold',
    italics: 'THSarabun Italic',
    bolditalics: 'THSarabun Bold Italic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

var Document_SetPDF
var salePDF
var darePDF

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
      startDate: moment(),
      show_date: '',
      show_sale:'',
      showButtonConfrim: '',
      checked: false,
    };
    this.ConfrimBill = this.ConfrimBill.bind(this)
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  printPDF() {
    //window.location.reload()
    console.log("printt")
      this.props.client.query({
        query:selectPDF,
        variables: {
          "DocumentSet":Document_SetPDF
        }
      }).then((result) => {
          console.log("result",result)
          var arrDataPDF_ = []
          result.data.selectPDF.forEach(function (val,i) {
            arrDataPDF_ = {
              ลำดับ: i + 1,
              Invoice: val.INVOICEID,
              Sale: val.SaleID,
              ผู้รับ: val.CustomerName,
              ที่อยู่: val.AddressShipment
            },
              arrDataPDF.push(arrDataPDF_)
          });
      }).catch((err) => {

      });

    var docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        { text: 'เลขชุดเอกสาร '  + Document_SetPDF, style: 'header', fontSize: 48 ,margin:[ 88, 2, 5, 5 ]},
        { text: 'Sale ' + salePDF + '   วันที่ ' + darePDF, style: 'header', fontSize: 44 ,margin:[ 75, 2, 5, 5 ]},

        table(arrDataPDF, ['ลำดับ', 'Invoice', 'Sale', 'ผู้รับ', 'ที่อยู่'] )
      ],
      defaultStyle: {
        font: 'THSarabun',
        fontSize: 14
      }
    };
    //window.location.reload()
    pdfMake.createPdf(docDefinition).print()
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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

 onCheckAll=(e)=>{
   //console.log("...")
    this.setState({
      checked: !this.state.checked
    },()=>console.log(this.state.checked))
    
 }

  seachBill=()=>{
    //console.log("1234567890",this.state.showSale)
    if(this.state.showSale != ''){
      var formatDate = moment(this.state.startDate).format("YYYY-MM-DD")
      this.props.client.query({
        query:selectAllBill,
        variables: {
          "SaleID":this.state.showSale,
          "invoicedate":formatDate
        }
      }).then((result) => {
        //onsole.log("3333",result)
        if(result.data.selectAllBill.length != 0){
          var arrData = []
          var tblData
          result.data.selectAllBill.forEach(function (val,i) {
            tblData = <tbody>
              <tr>
              <td><center> <input
              name="isGoing"
              type="checkbox"      
              bsSize="large"
              allChecked={this.state.allChecked}
              onChange={this.handleInputChange(val.INVOICEID)} /></center></td>
                <td><center>{i+1}</center></td>
                <td><center>{val.SaleID}</center></td>
                <td><center><button type="button" class="btn btn-sm btn-link" onClick={()=>this.toggle(val.INVOICEID)}>{val.INVOICEID}</button></center></td> 
                <td><center></center></td>
                <td><center></center></td>
                <td><p data-tip={val.DELIVERYNAME}><EllipsisText text={val.DELIVERYNAME} length={'30'} /></p></td>
                <td><p data-tip={val.Customer_Address}><EllipsisText text={val.Customer_Address} length={'40'} /></p></td>
              </tr>
            </tbody>
          arrData.push(tblData)
          },this);
          var ButtonConfrim = <Button color="primary" onClick={this.DocumentSet}>คอนเฟริมบิล</Button>
          var date = moment(formatDate).format("DD-MM-YYYY")
          salePDF = this.state.showSale
          darePDF = date
          this.setState({
            showTable:arrData,
            dataTable:result,
            show_date: date,
            show_sale: this.state.showSale,
            showButtonConfrim: ButtonConfrim
          })
        }else{
          alert("ไม่พบข้อมูล")
      }
      }).catch((err) => {

    });
    }else {
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
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

DocumentSet=()=>{
  var Document_Set
  var tempDate = moment();
  var _Date = moment(tempDate).format("YYMM")
  //console.log("Date",_Date)
    if(window.confirm("กรุณายืนยันการคอนเฟริม")){
    this.props.client.query({
        query:DocumentSet
    }).then((result) => {
        //console.log("result",result.data.DocumentSet[0].last)
        var _result = result.data.DocumentSet[0].last
        if(_result < 10){
          Document_Set = 'D'+_Date+'-000'+_result
        }else if(_result < 100){
          Document_Set = 'D'+_Date+'-00'+_result
        }else if(_result < 1000){
          Document_Set = 'D'+_Date+'-0'+_result
        }else if(_result >= 1000){
          Document_Set = 'D'+_Date+'-'+_result
        }
        console.log('DocumentSet',Document_Set)
        this.ConfrimBill(Document_Set)
        Document_SetPDF = Document_Set
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
        //console.log("Client Res", res)
        if (res.data.insertBill.status === true) {
          if(window.confirm("บันทึกข้อมูลเรียบร้อย กรุณายืนยันการ Print")){
            this.printPDF(DocumentSet)
            //window.location.reload()
          }
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
      <html lang="en">
      <title>คอนเฟริมบิล</title>     
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
                          &nbsp;&nbsp;<DatePicker selected={this.state.startDate} onChange={this.handleChange} tabIndex={1}/>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <Button color="success" onClick={this.seachBill}>ค้นหา</Button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                          &nbsp;&nbsp;<Label for="exampleInputName2" class="pr-1"><strong>Sale</strong></Label>&nbsp;&nbsp;
                          <Input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.show_sale} disabled>
                          </Input>
                          &nbsp;&nbsp;<label for="exampleInputName3" class="pr-1"><strong>วันที่</strong></label>&nbsp;&nbsp;
                          <Input id="exampleInputName3" placeholder="" required="" type="text" class="form-control" value={this.state.show_date} disabled>
                          </Input>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.showButtonConfrim}
                        </div>
                      </form>
                    </div>
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th width="5%"><center><button class="btn btn-sm btn-pill btn-primary" onClick={this.onCheckAll}>ลบ</button></center></th>
                        <th width="5%"><center>ลำดับ</center></th>
                        <th width="5%"><center>Sale ID</center></th>
                        <th width="10%"><center>รหัส invoice</center></th>
                        <th width="10%"><center>เลข SO</center></th>
                        <th width="10%"><center>จำนวนกล่อง</center></th>
                        <th width="15%">ผู้รับ</th>
                        <th width="20%">ที่อยู่</th>
                      </tr>
                    </thead>
                    {this.state.showTable}
                  </Table>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row> 

          <Modal  isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader >รหัส INVOICEID: <strong>{this.state.showINVOICEID}</strong></ModalHeader>
            <ModalBody >
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
      </html>
    );
  }
}

const selectPDF = gql`
query selectPDF($DocumentSet:String!){
  selectPDF(DocumentSet:$DocumentSet){
    INVOICEID
    SaleID
    CustomerName
    AddressShipment
  }
}
`


const insertBill = gql`
mutation insertBill($inData:[ConfrimModel],$DocumentSet:String!){
    insertBill(inData:$inData,DocumentSet:$DocumentSet){
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

  const GraphQL = compose(
  )(ConfirmBill)
  export default withApollo (GraphQL)

//export default ConfirmBill