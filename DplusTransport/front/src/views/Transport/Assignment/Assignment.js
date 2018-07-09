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
}
  from 'reactstrap';

class Assignment extends Component {
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
                <h4><strong>จ่ายงาน</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group ">
                          <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                            this.toggle(0);
                          }}>
                            <DropdownToggle caret>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Messanger</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header>Header</DropdownItem>
                              <DropdownItem>Messanger 1</DropdownItem>
                              <DropdownItem>Messanger 2</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <Dropdown isOpen={this.state.dropdownOpen[1]} toggle={() => {
                            this.toggle(1);
                          }}>
                            <DropdownToggle caret>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>trip</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header>Header</DropdownItem>
                              <DropdownItem>trip 1</DropdownItem>
                              <DropdownItem>trip 2</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button aria-pressed="true" class="btn-pill btn btn-success btn-block">&nbsp;&nbsp;&nbsp;&nbsp;ค้นหา&nbsp;&nbsp;&nbsp;&nbsp;</button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Messenger</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                        </div>
                        &nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Trip</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                        </div>
                        &nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Route</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <h5><strong>จำนวนรวม 1 บิล</strong></h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="10%"><center>ลำดับ</center></th>
                        <th width="15%"><center>รหัส  invoice</center></th>
                        <th><center>ผู้รับ</center></th>
                        <th><center>ห้าง</center></th>
                        <th width="10%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center><button class="btn btn-outline-danger btn-block">ยกเลิก</button></center></td>
                      </tr>
                    </tbody>
                  </Table>
                  <div col="2" class="mb-3 mb-xl-0 text-center col"><button class="btn-pill btn btn-success btn-lg">บันทึก</button></div>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Assignment;
