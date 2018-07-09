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
              <h4><strong>เพิ่มแมสเซนเจอร์</strong></h4>
              </CardHeader>
              <CardBody>
              <div class="col-12">
                <center>
                <div class="col-8">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                      this.toggle(0);
                    }}>                
                      <DropdownToggle caret>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>รหัสพนักงาน</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>รหัสพนักงาน</DropdownItem>
                        <DropdownItem>DP1243424</DropdownItem>
                        <DropdownItem>DP8675735</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> &nbsp;&nbsp;&nbsp;

                    <div class="pr-1 form-group">
                      <label for="name" class=""><strong>เบอร์โทร</strong></label>&nbsp;&nbsp;
                      <input id="name" placeholder="" required="" type="text" class="form-control"></input>
                    </div>

                    &nbsp;&nbsp;<div class="pr-1 form-group">
                      <label for="name" class=""><strong>i-mei</strong></label>&nbsp;&nbsp;
                      <input id="name" placeholder="" required="" type="text" class="form-control"></input>
                    </div>
                  </form>
                </div>
                    <br/>
                <div class="col-6">
                <center>
                  <form action="" method="post" class="form-inline" margin="auto auto">
                    <Dropdown isOpen={this.state.dropdownOpen[1]} toggle={() => {
                      this.toggle(1);
                    }}>                
                      <DropdownToggle caret>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>รถ</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>รถ</DropdownItem>
                        <DropdownItem>มอเตอร์ไซค์</DropdownItem>
                        <DropdownItem>กระบะ</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>&nbsp;&nbsp;&nbsp;

                  
                      <div class="pr-1 form-group">
                        <label for="name" class=""><strong>เลขทะเบียนรถ</strong></label>&nbsp;&nbsp;
                        <input id="name" placeholder="" required="" type="text" class="form-control"></input>
                      </div>

                      &nbsp;&nbsp;<button class="btn btn-success ">บันทึก</button>&nbsp;&nbsp;
                  
                  </form>
                </center>
                </div>
                </center>
              </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <h4><strong>กำหนดเส้นทาง</strong></h4>

              </CardHeader>
              <CardBody>
              <div class="col-12">
                <center>
                <div class="col-6">
                  <form action="" method="post" class="form-inline" margin="auto auto">
                    <Dropdown isOpen={this.state.dropdownOpen[2]} toggle={() => {
                      this.toggle(2);
                    }}>                
                      <DropdownToggle caret>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Messenger</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Messenger</DropdownItem>
                        <DropdownItem>DP1243424</DropdownItem>
                        <DropdownItem>DP8675735</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> &nbsp;&nbsp;&nbsp;
                    
                    <Dropdown isOpen={this.state.dropdownOpen[3]} toggle={() => {
                      this.toggle(3);
                    }}>                
                      <DropdownToggle caret>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Sale</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Sale</DropdownItem>
                        <DropdownItem>S0001</DropdownItem>
                        <DropdownItem>S0002</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> &nbsp;&nbsp;&nbsp;

                    <Dropdown isOpen={this.state.dropdownOpen[4]} toggle={() => {
                      this.toggle(4);
                    }}>                
                      <DropdownToggle caret>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Zone</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Zone</DropdownItem>
                        <DropdownItem>บางกะปิ</DropdownItem>
                        <DropdownItem>พระรามสาม</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> &nbsp;&nbsp;&nbsp;
                    
                    &nbsp;&nbsp;<button class="btn btn-outline-warning "><strong>+</strong></button>&nbsp;&nbsp;
                  </form>
                      <br/>
                  <button class="btn btn-success ">เพิ่มเส้นทาง</button>
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