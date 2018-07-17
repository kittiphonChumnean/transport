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

class AccountReport extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      showSale: '',
      showDate: '',
      showTable: '',

      dropdownOpen: new Array(6).fill(false),
    };
  }






  //-----pdf-----//
  printPDF() {
    var docDefinition = {

      content: [
        { text: 'รายงานบัญชี', style: 'header', fontSize: 20 },
        { text: 'วันที่  ' + datePDF, style: 'header', fontSize: 18 },
        table(arrDataPDF, ['ลำดับ', 'Invoice', 'รหัสลูกค้า', 'จำนวนเงินตามInvoice', 'เงินสดที่เก็บได้', 'ค้างจ่าย'])

        // table(externalDataRetrievedFromServer, ['ลำดับ', 'เลขที่ invoice', 'รหัสลูกค้า', 'จำนวนเงิน (invoice)','เงินสดที่เก็บได้','ค้างจ่าย'])
      ],
      defaultStyle: {
        font: 'THSarabun',
        fontSize: 16,
      }
    };
    pdfMake.createPdf(docDefinition).open()
  }


  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }



  QueryAccountReport = () => {
    this.props.client.query({
      query: QueryAccountReport,
      variables: {
        "SaleID": this.state.showSale,
        "Date": this.state.showDate,

      }
    }).then((result) => {
      console.log("result", result)
      var arrData = []
      var tblData
      var arrDataPDF_
      //arrDataPDF=result.data.QueryAccountReport;



      result.data.QueryAccountReport.forEach(function (val, i) {
        tblData =
          <tr>
            <td><center>{i + 1}</center></td>
            <td><center>{val.INVOICEID}</center></td>
            <td><center>{val.CustomerID}</center></td>
            <td><center>{val.AmountBill}</center></td>
            <td><center>{val.AmountActual}</center></td>
            <td><center>{(val.AmountBill) - (val.AmountActual)}</center></td>

          </tr>


        arrData.push(tblData)


      },
        result.data.QueryAccountReport.forEach(function (val2, i) {
          arrDataPDF_ = {

            ลำดับ: i + 1,
            Invoice: val2.INVOICEID,
            รหัสลูกค้า: val2.CustomerID,
            จำนวนเงินตามInvoice: val2.AmountBill,
            เงินสดที่เก็บได้: val2.AmountActual,
            ค้างจ่าย: (val2.AmountBill) - (val2.AmountActual),
          },

            arrDataPDF.push(arrDataPDF_)


        },
          datePDF = this.state.showDate

        ));


      this.setState({
        showTable: arrData
      })
    }).catch((err) => {

    });
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
      showSale: e.target.value
    })
  }

  chooseDate = (e) => {
    this.setState({
      showDate: e.target.value,
    })
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
                <h4><strong>รายงานบัญชี</strong>
                  <img src={require('../../../assets/img/brand/pdf.png')} onClick={this.printPDF} align="right" />
                 
                    <Workbook filename="AccountReport.xlsx" element={<img src={require('../../../assets/img/brand/excel.png')} align="right" />}>
                      <Workbook.Sheet data={arrDataPDF} name="Sheet A">
                        <Workbook.Column label="ลำดับ" value="ลำดับ" />
                        <Workbook.Column label="Invoice" value="Invoice" />
                        <Workbook.Column label="รหัสลูกค้า" value="รหัสลูกค้า" />
                        <Workbook.Column label="จำนวนเงินตามInvoice" value="จำนวนเงินตามInvoice" />
                        <Workbook.Column label="เงินสดที่เก็บได้" value="เงินสดที่เก็บได้" />
                        <Workbook.Column label="ค้างจ่าย" value="ค้างจ่าย" />

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
                        <Label for="date" class="pr-1"><strong>วันที่</strong></Label>
                        &nbsp;&nbsp;<Input id="date" name="date" placeholder="" required="" type="date" class="form-control" onChange={this.chooseDate} ></Input>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                        <button type="button" class="btn btn-success" onClick={this.QueryAccountReport}>ค้นหา</button>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        <Label for="exampleInputName2" class="pr-1"><strong>Sale</strong></Label>
                        &nbsp;&nbsp;<Input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showSale} disabled>
                        </Input>

                      </div>
                      <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Label for="exampleInputName3" class="pr-1"><strong>วันที่</strong></Label>&nbsp;&nbsp;
                      <Input id="exampleInputName3" placeholder="" required="" type="text" class="form-control" value={this.state.showDate} disabled>
                        </Input>
                      </div>
                    </form>
                  </div>
                </div>
                <br />
                <center>
                  <Table responsive>
                    <thead>
                      <tr>

                        <th><center>ลำดับ</center></th>
                        <th><center>เลขที่ invoice</center></th>
                        <th><center>รหัสลูกค้า</center></th>
                        <th><center>จำนวนเงิน (invoice)</center></th>
                        <th><center>เงินสดที่เก็บได้</center></th>
                        <th><center>ค้างจ่าย</center></th>
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

const QueryAccountReport = gql`
query QueryAccountReport($SaleID:String!,$Date:String!){
  QueryAccountReport(SaleID:$SaleID,Date:$Date){
    INVOICEID
    CustomerID
    AmountBill
    AmountActual
    SaleID
  }
}
`

const GraphQL = compose(
)(AccountReport)
export default withApollo(GraphQL)

