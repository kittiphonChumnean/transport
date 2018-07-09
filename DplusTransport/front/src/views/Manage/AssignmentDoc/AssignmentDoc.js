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

class AddMas extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
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
                <div class="col-6">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                      this.toggle(0);
                    }}>                
                      <DropdownToggle caret>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Messenger</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Messenger</DropdownItem>
                        <DropdownItem>DP1243424</DropdownItem>
                        <DropdownItem>DP8675735</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> &nbsp;&nbsp;

                    <label for="exampleInputName2" class="pr-1">&nbsp;&nbsp;<strong>วันที่</strong>&nbsp;&nbsp;</label>
                    <input id="exampleInputName2" placeholder="" required="" type="date" class="form-control"></input>&nbsp;&nbsp;&nbsp;

                    <Dropdown isOpen={this.state.dropdownOpen[2]} toggle={() => {
                      this.toggle(2);
                    }}>                
                      <DropdownToggle caret>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>ประเภทงาน</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>ประเภท</DropdownItem>
                        <DropdownItem>รับของเคลม</DropdownItem>
                        <DropdownItem>รับ-ส่งเอกสาร</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> &nbsp;&nbsp;&nbsp;
                  </form>
                </div>
                    <br/>
                <div class="col-6">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <label for="name" class=""><strong>ต้นทาง</strong></label>&nbsp;&nbsp;
                        <input id="name" placeholder="" required="" type="text" class="form-control"></input>
                      </div>

                  
                  &nbsp;&nbsp;<div class="pr-1 form-group">
                        <label for="name" class=""><strong>ปลายทาง</strong></label>&nbsp;&nbsp;
                        <input id="name" placeholder="" required="" type="text" class="form-control"></input>
                      </div>

                      </form>
                  <br/>
                  </div>
                <div class="col-6">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <label for="name" class=""><strong>รายละเอียด</strong></label>&nbsp;&nbsp;
                        <textarea rows="10" cols="55" id="name" ></textarea>
                      </div>
                  </form>
                </div>
                <br/>
                <div class="col-4">
                <button class="btn btn-success ">บันทึก</button>
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

export default AddMas;