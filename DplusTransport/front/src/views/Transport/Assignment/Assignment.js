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
  Input
}
  from 'reactstrap';
  import { gql, withApollo, compose } from 'react-apollo'
  var IDMess_
  var Trip_
  var num = 0;
  var arr=[]

  
  
class Assignment extends React.Component {
  constructor(props) {
    super(props);
 
    this.toggle = this.toggle.bind(this);
    this.state = {
      showMess:'',
      showDropdown:'',
      showText: "",
      showtrip: "",
      showzone:"",
      addrow: '',
      INVOICEID:'',
      DataDELIVERYNAME:'',
      DataCustomer:'',
      itemIDmess:'',
      itemInvoice:'',
      itemtrip:'',
      rows: [],
      Datastorezone:'',
      DataSaleID:'',
      msg:'',
    
      dropdownOpen: new Array(6).fill(false),
    };
    this.ClickSave = this.ClickSave.bind(this)
  }
//----------addRow Table----------//
handleChange = idx => e => {
  const { name, value } = e.target;
  const rows = [...this.state.rows];
  rows[idx] = {
    [name]: value

  };
  
  this.setState({
    rows
  });
};

handleAddRow = () => {
  const item = {
    name: "",
    customer: "",
    storezone:"",
    saleID:"",
    invoicetem:"",
  };
 
  this.setState({
    rows: [...this.state.rows, item]
  });
};


handleRemoveRow= idx => e => { 
  console.log("delete"+idx)
  console.log("rows1")
  console.log(this.state.rows)


  //console.log("=====>"+this.state.rows.findIndex(k => k==idx))

  this.state.rows.splice(idx,1)
  this.setState({
    rows: this.state.rows
    //rows: this.state.rows.splice(this.state.rows.findIndex(k => k==idx),1)

   
  });
 num=num-1
 console.log("rows2")
  console.log(this.state.rows)
};

handleRemoveRowOato(idx) { 
  console.log("delete"+idx)
  console.log("rows1")
  console.log(this.state.rows)


  //console.log("=====>"+this.state.rows.findIndex(k => k==idx))

  this.state.rows.splice(idx,1)
  this.setState({
    rows: this.state.rows
    //rows: this.state.rows.splice(this.state.rows.findIndex(k => k==idx),1)

   
  });
 num=num-1
 console.log("rows2")
  console.log(this.state.rows)
};

//-----------------------test------------------------------//
handleChange = idx => e => {
  const { name, value } = e.target;
  const rows = [...this.state.rows];
  rows[idx] = {
    [name]: value
  };
  this.setState({
    rows
  });
};

Enterfn= idx => e => {

  if (e.key === 'Enter') {
    if (arr.findIndex(k => k==e.target.value)<0||arr.length==0){
      arr.push(e.target.value)

    this.handleAddRow()
    this.queryAssingmentInvoice2(idx,e)
    num =num+1

    this.inputTitle.value = "";
    this.state.msg = "";
   
   
 

    //this.setState({
     // teminvoice:''
    //})
    
    
    console.log("row"+this.state.rows)
    console.log("idx"+idx)
  }else{
    window.alert("invoice ซ้ำ")
    this.inputTitle.value = "";
  }
}
}


queryAssingmentInvoice2(idx,e) {
  const { test1,test2  } = e.target;
  const rows = [...this.state.rows];
  //console.log("1234567890")
    this.props.client.query({
      query:queryAssingmentInvoice,
      variables: {
        "INVOICEID":rows[idx].name
     
      }
    }).then((result) => {
   var msg_
      console.log("22222",result,result.data)
   
     // rows[idx].mobile = result.data.queryAssingmentInvoice.CustomerName
      if (result.data.queryAssingmentInvoice.length>=1){

      result.data.queryAssingmentInvoice.forEach(function (val,i) {
console.log("Status==>"+val.Status)
        if (val.Status==2){
        rows[idx].customer = val.CustomerName
        rows[idx].storezone = val.StoreZone
        rows[idx].saleID = val.SaleID}

        else if (val.Status==3){
          window.alert("invoice นี้ได้จ่ายงานไปแล้ว")
          msg_="invoice นี้ได้จ่ายงานไปแล้ว"
          
        }
        else if (val.Status==1){
          window.alert("invoice นี้ยังไม่ได้รับงาน")
          msg_="invoice นี้ยังไม่ได้รับงาน"
          
        }
        console.log("test++>"+ val.Status)
      });
    

      if (msg_!=null){
      this.setState({
        msg:msg_
      })
      this.handleRemoveRowOato(idx)
      console.log("ไปลบ",idx)}
    
    }else{
      window.alert("ไม่มี invoice นี้")
      //this.setState({
        //msg:'ไม่มี invoice นี้'
      //})
      this.handleRemoveRowOato(idx)
      //console.log("ไปลบ",idx)
    }
     

    console.log("msg",msg_)
      this.setState({
     
        
      })
  }).catch((err) => {

  });
}
//-----------------------test------------------------------//
 //------------query IDmess with dropdow--------------//
  queryAssingmentIDmess=()=>{
    this.props.client.query({
        query:queryAssingmentIDmess
    }).then((result) => {
        console.log("result",result)
        var arrMess = []
        var DropdownMess
        result.data.queryAssingmentIDmess.forEach(function (val,i) {
          DropdownMess = <option>{val.IDMess}</option>
          arrMess.push(DropdownMess)
        });
        this.setState({
          showDropdown:arrMess
        })
    }).catch((err) => {

    });
  }

//-----------------data invoice-------------------//
  queryAssingmentInvoice=()=>{
    //console.log("1234567890")
      this.props.client.query({
        query:queryAssingmentInvoice,
        variables: {
          "INVOICEID":this.state.INVOICEID
         
        }
      }).then((result) => {
        console.log("3333",result)
        var DataCustomer
        var Datastorezone
        var DataSaleID
        result.data.queryAssingmentInvoice.forEach(function (val,i) {
          DataCustomer = val.CustomerName,
          Datastorezone = val.StoreZone,
          DataSaleID =  val.SaleID
         

        });     
        console.log("Datastorezone"+Datastorezone)
        this.setState({
          DataCustomer:DataCustomer,
          Datastorezone:Datastorezone,
          DataSaleID:DataSaleID
        })
    }).catch((err) => {

    });
}

//-----------------zone messenger--------------//
  queryAssingmentMess=()=>{
    //console.log("1234567890")
    if(this.state.showMess != '' && this.state.itemtrip != ''){
      this.props.client.query({
        query:queryAssingmentMess,
        variables: {
          "IDMess":this.state.showMess
         
        }
      }).then((result) => {
        console.log("3333",result)
        var Datazone
        result.data.queryAssingmentMess.forEach(function (val,i) {
          Datazone = val.Zone
        });     
        this.setState({
          showzone:Datazone
        })
    }).catch((err) => {

    });
  }else {
    alert("กรุณากรอกข้อมูลให้ครบ")
  }
}





  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  chooseMess=(e)=>{
    this.setState({
      showMess:e.target.value,
      showText: e.target.value,
      itemIDmess:e.target.value,
    })
    IDMess_=this.state.itemIDmess
 }

 chooseinvoice=(e)=>{
  this.setState({
    INVOICEID:e.target.value,
    itemInvoice:e.target.value,
    
  })
}
 ChangeText = (e) => {
  this.setState({
      showtrip: e.target.value,
      itemtrip:e.target.value,
      
  })
  Trip_=this.state.itemtrip
}
 
//---------------insert data to database----------------//
ClickSave(e) {
  
  this.setDataSave( this.state,this.props)
 
 
}

setDataSave( self, props) {
  if(self.itemIDmess != '' && self.itemtrip != '' && this.state.rows != ''){
    console.log("setDataSave")
    var arrData = []
    console.log("row=="+ this.state.rows[0])
    this.state.rows.forEach(function (val,idx) {
      arrData.push({
        INVOICEID:val.name,
        MessengerID: self.itemIDmess,
        Trip: self.itemtrip
      })
    });   
    arrData.pop()

    console.log("arrData")
    console.log(arrData)
    this.saveData( props, arrData)
  }else {
    alert("กรุณากรอกข้อมูลให้ครบ")
  }
}



saveData( props, data) {

  props.client.mutate({
      mutation: queryAssingment,
      variables: {
          "inData": data
      }
      
  }).then(res => {
    console.log(data)
      console.log("Client Res", res)
      this.queryAssingment2()
      if (res.data.queryAssingment.status === "2") {
          alert("บันทึกข้อมูลเรียบร้อย")
          window.location.reload()
      } else {
        console.log(data)
          alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
          return false
      }
  })
}

//---------------update data to database----------------//
queryAssingment2=()=>{
  this.props.client.mutate({
      mutation:queryAssingment2
  }).then((result) => {
      console.log("update",result)
      
  }).catch((err) => {

  });
}


 componentWillMount(){
  this.queryAssingmentIDmess()
}


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <h4><strong>จ่ายงาน</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group ">
                        <Label for="exampleSelect"><strong>Messenger</strong></Label>
                        &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect"  onChange={this.chooseMess}>
                        <option value="">---</option>
                          {this.state.showDropdown}
                        </Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        <Label for="exampleSelect"><strong>Trip</strong></Label>
                        &nbsp;&nbsp;<Input type="select" name="select" id="exampleSelect" onChange= {this.ChangeText} >
                        <option value="">---</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>

                        </Input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                        
                        <button  type="button" class="btn btn-success" onClick={this.queryAssingmentMess}>ค้นหา</button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Messenger</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required=""  type="text" class="form-control" value= {this.state.showText} disabled>
                          </input>
                        </div>
                        &nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Trip</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showtrip} disabled >
                          </input>
                        </div>
                        &nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Route</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value={this.state.showzone} disabled>
                          </input>
                        </div>

                          &nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>INVOICEID</strong></label>&nbsp;&nbsp;
                        <input
                         value={this.state.invoicetem}
                          type="text"
                          name="name"
                          onChange={this.handleChange(num)}
                          className="form-control"
                          onKeyPress={this.Enterfn(num)}
                          ref={el => this.inputTitle = el}
                        />
                        </div>
                        
                        &nbsp; &nbsp;<font color="red"><label  class="pr-1"   ><strong> </strong></label></font>&nbsp;&nbsp;
                      </form>
                    </div>
                  </div>
                 
                  <h5><strong>จำนวนรวม {this.state.rows.length} บิล</strong></h5>
                 
                 
                


<table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th width="2%" className="text-center"> ลำดับ </th>
                    <th width="10%" className="text-center"> รหัส invoice </th>
                    <th width="10%" className="text-center"> SaleID </th>
                    <th width="40%" className="text-center"> ผู้รับ </th>
                    <th width="40%" className="text-center"> ห้าง </th>
                 
                    <th width="5%" ></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx+1}</td>
                      <td>
                        
                          {this.state.rows[idx].name }
                        
                      </td>
                      <td>
                    <center>{this.state.rows[idx].saleID } </center>
                      </td>
                      <td>
                    <center>{this.state.rows[idx].customer } </center>
                      </td>
                      <td>
                    <center>{this.state.rows[idx].storezone } </center>
                      </td>
                      
                      <td>
                      <button class="btn btn-sm btn-pill btn-danger"  onClick={this.handleRemoveRow(idx)} >ลบ</button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             
             
              

<br/><br/>
 <div col="2" class="mb-3 mb-xl-0 text-center col"><button class="btn-pill btn btn-success btn-lg" onClick={this.ClickSave}>บันทึก</button></div>


                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>






    );
  }
}

const queryAssingmentIDmess = gql`
  query queryAssingmentIDmess{
    queryAssingmentIDmess{
      IDMess
    }
  }
`

const queryAssingmentMess = gql`
query queryAssingmentMess($IDMess:String!){
  queryAssingmentMess(IDMess:$IDMess){
    Zone
  }
}
`

const queryAssingmentInvoice = gql`
query queryAssingmentInvoice($INVOICEID:String!){
  queryAssingmentInvoice(INVOICEID:$INVOICEID){
    CustomerName,
    StoreZone,
    SaleID,
    Status
  }
}
`

const queryAssingment = gql`
mutation queryAssingment($inData:[BilltoAppModel]){
  queryAssingment(inData:$inData){
        status
    }
}
`

const queryAssingment2 = gql`
mutation queryAssingment2{
  queryAssingment2{
    INVOICEID
    }
}
`


const GraphQL = compose(
)(Assignment)
export default withApollo (GraphQL)

