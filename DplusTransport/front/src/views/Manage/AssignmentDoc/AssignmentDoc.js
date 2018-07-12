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

class AssignmentDoc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
              <h4><strong>จ่ายงานเอกสาร</strong></h4>
              </CardHeader>
              <CardBody>
              <div class="col-12">
                <center>
                <div class="col-4">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                    <div class="pr-1 form-group">
                      <Label for="exampleSelect"><strong>Messenger</strong></Label>&nbsp;&nbsp;
                      <Input type="select" name="select" id="exampleSelect" onChange={this.ChooseMess}>
                        <option>---</option>
                        {this.state.showDropdown}
                      </Input>
                    </div>
                    <div class="pr-1 form-group">
                      &nbsp;&nbsp;<Label for="exampleInputName2"><strong>วันที่</strong></Label>
                      &nbsp;&nbsp;<Input id="exampleInputName2" type="date" onChange={this.ChooseDate}></Input>
                    </div>
                  </form>
                </div>
                <br/>
                <div class="col-4">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <Label for="exampleSelect"><strong>ประเภท</strong></Label>&nbsp;&nbsp;
                        <Input type="select" name="select" id="exampleSelect" onChange={this.ChooseMess}>
                          <option>---</option>
                          <option value="รับของเคลม">รับของเคลม</option>
                          <option value="รับ-ส่งเอกสาร">รับ-ส่งเอกสาร</option>
                        </Input>
                      </div>
                      <div class="pr-1 form-group">
                      &nbsp;&nbsp;<Label for="name" class=""><strong>สถานที่</strong></Label>&nbsp;&nbsp;
                        <Input id="name" type="text"></Input>
                      </div>
                  </form>
                  <br/>
                </div>
                <div class="col-4">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <label for="name" class=""><strong>รายละเอียด</strong></label>&nbsp;&nbsp;
                        <textarea rows="10" cols="45" id="name" ></textarea>
                      </div>
                  </form>
                </div>
                <br/>
                <div class="col-5">
                <Button color="success">บันทึก</Button>
                </div>
                </center>
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const GraphQL = compose(
)(AssignmentDoc)
export default withApollo (GraphQL)