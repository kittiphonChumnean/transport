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
var arr =[]
var num=0

class GetTask extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
      showText: "",
      showTable: '',
    
      msg:'',
      showinvoice:0,
      invoiceData:[],
      color:'',
    };
  }


  queryGettesk = () => {
    console.log("queryGettesk")
    this.props.client.query({
      query: queryGettesk,
      variables: {
        "DocumentSet":this.state.showText,
      }
    }).then((result) => {
      console.log("result", result)
      var arrData = []
      var tblData
      
    var msg_
    

      if (result.data.queryGettesk.length>=1){

  
        
       
      result.data.queryGettesk.forEach(function (val, i) {
       
       
          console.log(val.Status)
          if(val.Status==2||val.Status==3){
            this.setState({
              color:"palegreen"
            
            })
            
////
           
         
          
          }else{
            console.log("elseeeeeeeee")
            console.log(arr[0])
if (arr.length>=1){
console.log("lengtharr>>>>>1")
var m=0
console.log("m"+m)

console.log("INVOICEID"+val.INVOICEID+"arr"+arr[0])
            for (var j=0;j<arr.length;j++){
              console.log("test"+val.INVOICEID+arr[j])
            
          
                if (val.INVOICEID==arr[j]) {
                  console.log("INVOICEID=arr")
                 m++
                
                }
                
                console.log("m"+m)
            }
            console.log("m3"+m)
            if (m>=1){
              this.setState({
                color:"#ffffb3"
              
              })
              
            }else{
              this.setState({
                color:""
              
              })
            
            }
        

          }else{
            this.setState({
              color:""
            
            })
            num=num+1
            console.log("num++")
          }
          }
        


        tblData = <tbody>
          <tr>
            <td bgcolor={this.state.color}> <center>{i+1}</center></td>
            <td bgcolor={this.state.color}><center>{val.INVOICEID}
            </center></td>
            <td bgcolor={this.state.color}><center>{val.QTYbox}</center></td>
            <td bgcolor={this.state.color}><center>{val.CustomerName}</center></td>
          </tr>
        </tbody>
        arrData.push(tblData)
        
        
      }, this); 
    
    
    
    }
    
    
    else{
      msg_='ไม่มีเลขชุดเอกสารนี้'
    }


  
  


      this.setState({
        showTable: arrData,
       
        msg:msg_
       
      })
     
      console.log("invoice == "+this.state.showinvoice)
      } 
  
  ).catch((err) => {

    });
  }

 

  
  queryGetteskUpdate= () => {
if (num>arr.length){
if (window.confirm("INVOICE ไม่ครบจะไปต่อหรือไม่")){
    if(window.confirm("กรุณายืนยัน")){
      window.location.reload()
      console.log(this.state.invoiceData)
     
    this.props.client.mutate({
      
      mutation: queryGetteskUpdate,
      
      variables: {
        "inData":this.state.invoiceData
      
      }
      
    }).then(res => {
      
      this.queryGettesk()

      if (res.data.queryGetteskUpdate.status == "2") {
      console.log("result", res)
      window.alert("รับงานสำเร็จ")
     
      window.location.reload()
      }else {
        console.log(this.state.invoiceData)
          alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
          return false
      }
    }).catch((err) => {
      
    });
  }
}
}else{
  if(window.confirm("กรุณายืนยัน")){
    window.location.reload()
    console.log(this.state.invoiceData)
   
  this.props.client.mutate({
    
    mutation: queryGetteskUpdate,
    
    variables: {
      "inData":this.state.invoiceData
    
    }
    
  }).then(res => {
    
    this.queryGettesk()

    if (res.data.queryGetteskUpdate.status == "2") {
    console.log("result", res)
    window.alert("รับงานสำเร็จ")
   
    window.location.reload()
    }else {
      console.log(this.state.invoiceData)
        alert("ผิดพลาด! ไม่สามารถบันทึกข้อมูลได้")
        return false
    }
  }).catch((err) => {
    
  });
}
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
  Enterfn=  e => {

    if (e.key === 'Enter') {
arr.push(e.target.value)
      this.state.invoiceData.push({
        INVOICEID:e.target.value
        
      })
       
      this.queryGettesk()
    
    }
    console.log(this.state.invoiceData)
    console.log("showNum"+num)
    console.log("Enter")
  }

  render() {
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
                          <label for="exampleInputName2" class="pr-1"><strong>เลขชุดเอกสาร</strong></label>
                          &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" onChange={this.ChangeText}></input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button  type="button" class="btn btn-success" onClick={this.queryGettesk}>ค้นหา</button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>เลขชุดเอกสาร</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value= {this.state.showText} disabled>

                          </input>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>เลข INVOICE</strong></label>&nbsp;&nbsp;
                          <input  id="invoice" required="required" onKeyPress={this.Enterfn}   type="text" class="form-control"  ></input>
                        </div>
                        <font color="red">&nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>{this.state.msg}</strong></label>&nbsp;&nbsp;</font>
                      </form>
                    </div>
                  </div>
                  

                  
                  <h5><strong>จำนวนรวม {this.state.showTable.length} บิล</strong></h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="15%"><center>ลำดับ</center></th>
                        <th width="30%"><center>รหัส  invoice</center></th>
                        <th width="15%"><center>จำนวนกล่อง</center></th>
                        <th><center>ผู้รับ</center></th>
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

const queryGettesk = gql`
query queryGettesk($DocumentSet:String!){
  queryGettesk(DocumentSet:$DocumentSet){
    INVOICEID
    QTYbox
    CustomerName
    Status
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
