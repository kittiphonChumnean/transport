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
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withApollo, gql, compose } from 'react-apollo';
import Workbook from 'react-excel-workbook'//excel

//------------------//pdf------------------//
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var arrDataPDF = []
var datePDF
var datePDFend
var sale
var _dateStart
var _dateEnd


function buildTableBody(data, columns) {
  var body = [];

  body.push(columns);

  data.forEach(function(row) {
      var dataRow = [];

      columns.forEach(function(column) {
          dataRow.push(row[column].toString());
      })

      body.push(dataRow);
  });

  return body;
}

function table(data, columns) {
  return {
      table: {
        headerRows: 1,
        body: buildTableBody(data, columns),
  
      },
      layout: {
        hLineWidth: function(i, node) {
          return 1;
          
        }
      },
      margin: [8, 15, 0, 0]
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



class CNReport extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      showSale:'',
      showstartDate:'',
      showendDate:'',
      showTable:'',
      startDate: moment(),
      endDate: moment(),
    };
    this.choosestartDate = this.choosestartDate.bind(this);
    this.chooseendDate = this.chooseendDate.bind(this);
  }

//-----pdf-----//
printPDF(){
  var docDefinition = {
      
    content: [
      { text: 'รายงานคืนสินค้า', style: 'header' ,fontSize:20,margin:[ 220, 2, 5, 5 ]},
      { text:'วันที่  '+datePDF+' ถึง '+datePDFend, style: 'header' ,fontSize:18,margin:[ 180, 2, 5, 5 ]},
      { text:'Sale : '+sale+'  ผู้ส่งเอกสาร............................' ,fontSize:18,margin:[ 165, 2, 5, 5 ]},
        table(arrDataPDF, ['ลำดับ','Sale','invoice','ลูกค้า','Qtyยอดจริง','ยอดเงินจริง','วันที่เคลียร์บิล','ยอดเงินที่เก็บได้','จำนวนCN','ยอดCN','จำนวนคงเหลือ','เหตุผล'])
       
       // table(externalDataRetrievedFromServer, ['ลำดับ', 'เลขที่ invoice', 'รหัสลูกค้า', 'จำนวนเงิน (invoice)','เงินสดที่เก็บได้','ค้างจ่าย'])
      ],
  defaultStyle:{
    font: 'THSarabun',
    fontSize:12
  }
  
    };

    

    pdfMake.createPdf(docDefinition).open()
   
  }



  choosestartDate=(date)=>{
    this.setState({
      startDate:date
    })
  }

  chooseendDate=(date)=>{
    this.setState({
      endDate:date
    })
  }

  
  QueryCNReport = () => {
    if(this.state.showSale != ''){
      var formatDate = moment(this.state.startDate).format("YYYY-MM-DD")
      var formatDateEnd = moment(this.state.endDate).format("YYYY-MM-DD")
      this.props.client.query({
        query: QueryCNReport,
        variables: {
          "SaleID":this.state.showSale,
          "DateStart":formatDate,
          "DateEnd":formatDateEnd,
        }
      }).then((result) => {
        _dateStart = moment(formatDate).format("DD-MM-YYYY")
        _dateEnd = moment(formatDateEnd).format("DD-MM-YYYY")
        if(result.data.QueryAccountReport.length != 0){
          console.log("result", result)
          var arrData = []
          var tblData
          var arrDataPDF_
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
          },
        result.data.QueryCNReport.forEach(function (val2, i) {
            arrDataPDF_ =  {  
              
                            ลำดับ:i+1,
                            Sale:val2.SaleID, 
                            invoice: val2.INVOICEID,
                            ลูกค้า:val2.CustomerID,
                            Qtyยอดจริง:val2.QtyBill,
                            ยอดเงินจริง:val2.AmountBill,
                              วันที่เคลียร์บิล:val2.Datetime,
                              ยอดเงินที่เก็บได้:val2.AmountActual,
                              จำนวนCN:(val2.QtyBill)-(val2.QtyActual),
                              ยอดCN:(val2.AmountBill)-(val2.AmountActual),
                              จำนวนคงเหลือ:(val2.QtyBill)- ((val2.QtyBill)-(val2.QtyActual)),
                              เหตุผล:val2.ReasonCN,
                          
            },
                            
                          
                              
                  
            arrDataPDF.push(arrDataPDF_)
          
          },
          datePDF=_dateStart,
          datePDFend=_dateEnd
          ));

          
          this.setState({
            showTable: arrData,
            showstartDate: _dateStart,
            showendDate: _dateEnd
          })
        }else {
          alert("กรุณากรอกข้อมูลให้ครบ")
        }
      }).catch((err) => {

      });
    }else {
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
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
    sale=e.target.value
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
              <img src={require('../../../assets/img/brand/pdf.png')} onClick={this.printPDF} align="right" />
               
              <Workbook filename="CNReport.xlsx" element={<img src={require('../../../assets/img/brand/excel.png')} align="right" />}>
                      <Workbook.Sheet data={arrDataPDF} name="Sheet A">
                        <Workbook.Column label="ลำดับ" value="ลำดับ" />
                        <Workbook.Column label="Sale" value="Sale" />
                        <Workbook.Column label="Invoice" value="Invoice" />
                        <Workbook.Column label="ลูกค้า" value="ลูกค้า" />
                        <Workbook.Column label="Qtyยอดจริง" value="Qtyยอดจริง" />
                        <Workbook.Column label="ยอดเงินจริง" value="ยอดเงินจริง" />
                        <Workbook.Column label="วันที่เคลียร์บิล" value="วันที่เคลียร์บิล" />
                        <Workbook.Column label="ยอดเงินที่เก็บได้" value="ยอดเงินที่เก็บได้" />
                        <Workbook.Column label="จำนวนCN" value="จำนวนCN" />
                        <Workbook.Column label="ยอดCN" value="ยอดCN" />
                        <Workbook.Column label="จำนวนคงเหลือ" value="จำนวนคงเหลือ" />
                        <Workbook.Column label="เหตุผล" value="เหตุผล" />
                       
                      </Workbook.Sheet>

                    </Workbook>   
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
                          &nbsp;&nbsp;<DatePicker selected={this.state.startDate} onChange={this.choosestartDate} tabIndex={1}/>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                      <Label for="date" class="pr-1"><strong>วันที่สิ้นสุด</strong></Label>
                          &nbsp;&nbsp;<DatePicker selected={this.state.endDate} onChange={this.chooseendDate} tabIndex={1}/>
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
