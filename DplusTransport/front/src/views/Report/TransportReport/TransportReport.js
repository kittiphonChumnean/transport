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
import Workbook from 'react-excel-workbook'//excel

//------------------//pdf------------------//
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var arrDataPDF = []
var datePDF



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
      headerRows: 1,
      body: buildTableBody(data, columns)
    }
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



var dateTime
class TransportReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSale: '',
      showDateTime: '',
      selectSale: '',
      selectDate: '',
    };
  }


  //-----pdf-----//
  printPDF() {
    var docDefinition = {

      content: [
        { text: 'รายงานการส่ง', style: 'header', fontSize: 20 },
        { text:'วันที่  '+datePDF, style: 'header' ,fontSize:18},
        table(arrDataPDF, ['ลำดับ', 'invoice', 'ลูกค้า', 'Sale', 'Messenger', 'สถานะ'])

        // table(externalDataRetrievedFromServer, ['ลำดับ', 'เลขที่ invoice', 'รหัสลูกค้า', 'จำนวนเงิน (invoice)','เงินสดที่เก็บได้','ค้างจ่าย'])
      ],
      defaultStyle: {
        font: 'THSarabun',
        fontSize: 14
      }

    };



    pdfMake.createPdf(docDefinition).open()

  }





  selectSale = () => {
    this.props.client.query({
      query: selectSale
    }).then((result) => {
      console.log("result", result)
      var arrSale = []
      var DropdownSale
      result.data.selectSale.forEach(function (val, i) {
        DropdownSale = <option>{val.SaleID}</option>
        arrSale.push(DropdownSale)
      });
      this.setState({
        showDropdown: arrSale
      })
    }).catch((err) => {

    });
  }

  chooseSale = (e) => {
    this.setState({
      selectSale: e.target.value
    })
  }

  chooseDate = (e) => {
    this.setState({
      selectDate: e.target.value
    })
  }

  transportReport = () => {
    console.log("1234567890")
    dateTime = moment(this.state.selectDate).format("YYYY-MM-DD")
    this.props.client.query({
      query: transportReport,
      variables: {
        "SaleID": this.state.selectSale,
        "DateTime": dateTime,
      }
    }).then((result) => {
      console.log("result", result)
      var arrData = []
      var tblData
      var Sale
      var DateTime
      var LastStatus
      var arrDataPDF_
      var status_list = {
        'A1': 'ส่งสินค้าเรียบร้อย',
        'A2': 'ส่งสินค้าเรียบร้อย แต่มีการแก้ไข',
        'B1': 'ไม่สามารถส่งสินค้าได้ เนื่องจากลูกค้ากดผิด',
        'B2': 'ไม่สามารถส่งสินค้าได้ เนื่องจากร้านปิด',
        'B3': 'ไม่สามารถส่งสินค้าได้ เนื่องจากOrderซ้ำ',
        'B4': 'ไม่สามารถส่งสินค้าได้ เนื่องจากสินค้าผิด',
        'B5': 'ไม่สามารถส่งสินค้าได้ เนื่องจากSaleคีย์ผิด',
        'B6': 'ไม่สามารถส่งสินค้าได้ เนื่องจากลูกค้าสั่งร้านอื่นแล้ว',
        'B7': 'ไม่สามารถส่งสินค้าได้ เนื่องจากSaleแจ้งราคาผิด'
      }
      result.data.transportReport.forEach(function (val, i) {
        tblData = <tbody>
          <tr>
            <td><center>{i + 1}</center></td>
            <td><center>{val.INVOICEID}</center></td>
            <td><center>{val.CustomerID}</center></td>
            <td><center>{val.SaleID}</center></td>
            <td><center>{val.MessengerID}</center></td>
            <td><center>{status_list[val.Status]}</center></td>
          </tr>
        </tbody>
        Sale = val.SaleID
        DateTime = moment(val.DateTime).format("DD-MM-YYYY")
        arrData.push(tblData)
      },
        result.data.transportReport.forEach(function (val2, i) {
          arrDataPDF_ = {

            ลำดับ:i + 1,
            invoice: val2.INVOICEID,
            ลูกค้า: val2.CustomerID,
            Sale: val2.SaleID,
            Messenger: val2.MessengerID,
            สถานะ: status_list[val2.Status]
            
          },




            arrDataPDF.push(arrDataPDF_)

       },
        datePDF = dateTime
          
        ));
      this.setState({
        showTable: arrData,
        showSale: Sale,
        showDateTime: DateTime
      })
    }).catch((err) => {

    });
  }


  componentWillMount() {
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
                <img src={require('../../../assets/img/brand/pdf.png')} onClick={this.printPDF} align="right" />
                <Workbook filename="TransportReport.xlsx" element={<img src={require('../../../assets/img/brand/excel.png')} align="right" />}>
                      <Workbook.Sheet data={arrDataPDF} name="Sheet A">
                        <Workbook.Column label="ลำดับ" value="ลำดับ" />
                        <Workbook.Column label="invoice" value="invoice" />
                        <Workbook.Column label="ลูกค้า" value="ลูกค้า" />
                        <Workbook.Column label="Sale" value="Sale" />
                        <Workbook.Column label="Messenger" value="Messenger" />
                        <Workbook.Column label="สถานะ" value="สถานะ" />
                       
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
                <br />

                <Table>
                  <thead>
                    <tr>
                      <th><center>ลำดับ</center></th>
                      <th><center>เลขที่ invoice</center></th>
                      <th><center>รหัสลูกค้า</center></th>
                      <th><center>Sale</center></th>
                      <th><center>Messenger</center></th>
                      <th><center>สถานะ</center></th>
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
export default withApollo(GraphQL)