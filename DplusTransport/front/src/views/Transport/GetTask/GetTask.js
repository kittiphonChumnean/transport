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
import Autosuggest from 'react-autosuggest';
var arr = []
var num = 0
var invoicetem = []

const languages = [

  
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => (
  //<option value={suggestion.name}>{suggestion.name}</option>

<div option={suggestion.name} tabindex="0" role="option" class="select-option no-outline" on="tap:autosuggest-list.hide" aria-selected="false">{suggestion.name}</div>


  //<div>
    //{suggestion.name}
 // </div>
);


class GetTask extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
      showText: "",
      showTable: '',
      msg: '',
      showinvoice: 0,
      invoiceData: [],
      color: '',
      value: '',
      suggestions: []

    };
  }

  queryGetteskDocomment=()=>{
    this.props.client.query({
        query:queryGetteskDocomment
    }).then((result) => {
        console.log("result",result)
        
        result.data.queryGetteskDocomment.forEach(function (val,i) {
          languages.push({
            name:val.DocumentSet
           
          })
        });
        console.log("languages"+languages)
        this.setState({
          
        })
    }).catch((err) => {

    });
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  

  queryGettesk = () => {
    if (this.state.showText != '') {
      console.log("queryGettesk")
      this.props.client.query({
        query: queryGettesk,
        variables: {
          "DocumentSet": this.state.showText,
        }
      }).then((result) => {
        console.log("result", result)
        var arrData = []
        var tblData
        var msg_

        if (result.data.queryGettesk.length >= 1) {
          result.data.queryGettesk.forEach(function (val, i) {
            //console.log(val.Status)
            if (val.Status == 2 || val.Status == 3) {
              this.setState({
                color: "#ccffcc"//เขียว
              })
            } else {
              //console.log("elseeeeeeeee")
              //console.log(arr[0])
              if (arr.length >= 1) {
                var m = 0
                //console.log("INVOICEID"+val.INVOICEID+"arr"+arr[0])
                for (var j = 0; j < arr.length; j++) {
                  //console.log("test"+val.INVOICEID+arr[j])
                  if (val.INVOICEID == arr[j]) {
                    m++
                  }
                }

                if (m >= 1) {
                  this.setState({
                    color: "#ffffb3"//สีแหลือง
                  })
                } else {
                  this.setState({
                    color: "#f5f5ef"//สีเทา
                  })
                  invoicetem.push(val.INVOICEID)
                }
              } else {
                this.setState({
                  color: "#f5f5ef"//สีเทา
                })
                invoicetem.push(val.INVOICEID)
                num = num + 1
              }
            }

            tblData = <tbody>
              <tr>
                <td  bgcolor={this.state.color}> {i + 1}</td>
                <td bgcolor={this.state.color}>{val.SaleID}</td>
                <td bgcolor={this.state.color}>{val.INVOICEID}</td>
                <td align="right" bgcolor={this.state.color}>{val.QTYbox}</td>
                <td bgcolor={this.state.color}>{val.CustomerName}</td>
              </tr>
            </tbody>
            arrData.push(tblData)


          }, this);
        } else {
          window.alert("ไม่มีเลขชุดเอกสารนี้")
          //msg_ = 'ไม่มีเลขชุดเอกสารนี้'
        }

        this.setState({
          showTable: arrData,
          msg: msg_
        })

        console.log("invoice == " + this.state.showinvoice)
      }

      ).catch((err) => {
      });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
    this.getfocus()

  }
 getfocus() {
    document.getElementById("invoice").focus();
}


  queryGetteskUpdate = () => {
    if (this.state.invoiceData != '') {
      if (num > arr.length) {
        if (window.confirm("INVOICE ไม่ครบจะไปต่อหรือไม่")) {
          if (window.confirm("กรุณายืนยัน")) {
            window.alert("รับงานสำเร็จ " + this.state.invoiceData.length + " รายการ")
            window.location.reload()
            console.log(this.state.invoiceData)

            this.props.client.mutate({

              mutation: queryGetteskUpdate,

              variables: {
                "inData": this.state.invoiceData

              }

            }).then(res => {

              this.queryGettesk()
              //window.alert("รับงานสำเร็จ")

              if (res.data.queryGetteskUpdate.status == "2") {
                console.log("result", res)
                window.alert("รับงานสำเร็จ " + this.state.invoiceData.length + " รายการ")

                window.location.reload()
              } else {
                console.log(this.state.invoiceData)
                alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
                return false
              }
            }).catch((err) => {

            });
          }
        }
      } else {
        if (window.confirm("กรุณายืนยัน")) {
          window.alert("รับงานสำเร็จ " + this.state.invoiceData.length + " รายการ")
          window.location.reload()
          console.log(this.state.invoiceData)

          this.props.client.mutate({

            mutation: queryGetteskUpdate,

            variables: {
              "inData": this.state.invoiceData

            }

          }).then(res => {

            this.queryGettesk()

            if (res.data.queryGetteskUpdate.status == "2") {
              console.log("result", res)
              window.alert("รับงานสำเร็จ " + this.state.invoiceData.length + " รายการ")

              window.location.reload()
            } else {
              console.log(this.state.invoiceData)
              alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
              return false
            }
          }).catch((err) => {

          });
        }
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
  }

  ChangeText = (e) => {
    this.setState({
      showText: e.target.value
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
  Enterfn = e => {

    if (e.key === 'Enter') {
      console.log("-----" + e.target.value)
      console.log(arr)
      console.log("invoicetem" + invoicetem)
      console.log(invoicetem.findIndex(l => l == e.target.value))
      if (invoicetem.findIndex(l => l == e.target.value) >= 0) {

        if (arr.findIndex(k => k == e.target.value) < 0 || arr.length == 0) {

          arr.push(e.target.value)
          this.state.invoiceData.push({
            INVOICEID: e.target.value
          })
          this.inputTitle.value = "";
          this.queryGettesk()
        } else {
          window.alert("invoice ซ้ำ")
          this.inputTitle.value = "";
        }
      } else {
        window.alert("invoice ไม่ใช่ของชุดเอกสารนี้ หรือ ได้รับไปแล้ว")
        this.inputTitle.value = "";
      }
       
    }
    //console.log(this.state.invoiceData)
    //console.log("showNum" + num)
    //console.log("Enter")
  }

  
componentWillMount(){
  this.queryGetteskDocomment()
}
  
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };
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
                          <label for="exampleInputName2" name="123" class="pr-1"><strong>เลขชุดเอกสาร</strong></label>
                          <Autosuggest
        onChange={this.queryGetteskDocomment}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        class="form-control"
         onChange={this.ChangeText}
      />
                          &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" onChange={this.ChangeText}></input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button type="button" class="btn btn-success" onClick={this.queryGettesk}>ค้นหา</button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                          &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>เลขชุดเอกสาร</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showText} disabled>

                          </input>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>เลข INVOICE</strong></label>&nbsp;&nbsp;
                          <input id="invoice" Placeholder="กรุณา scan QR code" ref={el => this.inputTitle = el}  required="required" onKeyPress={this.Enterfn} type="text" class="form-control"  ></input>
                        </div>
                        <font color="red">&nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>{this.state.msg}</strong></label>&nbsp;&nbsp;</font>
                      </form>
                    </div>



                  <h5><strong>จำนวนรวม {this.state.showTable.length} บิล</strong></h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="5%">ลำดับ</th>
                        <th width="10%">SaleID</th>
                        <th width="15%">รหัส  invoice</th>
                        <th width="10%">จำนวนกล่อง</th>
                        <th>ผู้รับ</th>
                      </tr>
                    </thead>
                    {this.state.showTable}
                  </Table>
                  <div col="2" class="mb-3 mb-xl-0 text-center col"><button onClick={this.queryGetteskUpdate} class="btn-pill btn btn-success btn-lg" >เทียบ</button></div>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}



const queryGetteskDocomment = gql`
  query queryGetteskDocomment{
    queryGetteskDocomment{
      DocumentSet
    }
  }
`

const queryGettesk = gql`
query queryGettesk($DocumentSet:String!){
  queryGettesk(DocumentSet:$DocumentSet){
    INVOICEID
    QTYbox
    CustomerName
    Status
    SaleID
  }
}
`
const queryGetteskUpdate = gql`
mutation queryGettesk($inData:[upDateStateGetTeskModel]){
  queryGettesk(inData:$inData){
        status
    }
}
`






const GraphQL = compose(
)(GetTask)
export default withApollo(GraphQL)
