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
  form,
} from 'reactstrap';

class TrackingMas extends Component {
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
              <h4><strong>ติดตามแมสเซนเจอร์</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">

                        <div class="pr-1 form-group">
                          <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                            this.toggle(0);
                          }}>
                            <DropdownToggle caret>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Messanger</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header>Header</DropdownItem>
                              <DropdownItem>Massanger 1</DropdownItem>
                              <DropdownItem>Massanger 2</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>วันที่</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="date" class="form-control"></input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<Dropdown isOpen={this.state.dropdownOpen[1]} toggle={() => {
                            this.toggle(1);
                          }}>
                            <DropdownToggle caret>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>รอบ</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header>Header</DropdownItem>
                              <DropdownItem> 1</DropdownItem>
                              <DropdownItem> 2</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button aria-pressed="true" class="btn-pill btn btn-success btn-block">ค้นหา</button>
                        </div>
                      </form>
                      <br/>
                      <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <label for="exampleInputName2" class="pr-1"><strong>Messenger</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                        </input>
                      </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Route</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputEmail2" class="pr-1"><strong>วันที่</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputEmail2" placeholder="" required="" type="email" class="form-control" value=" " disabled>
                          </input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputEmail2" class="pr-1"><strong>Trip</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputEmail2" placeholder="" required="" type="email" class="form-control" value=" " disabled>
                          </input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <br/>
                  <h3><strong>สถานะปัจจุบัน : ส่งได้ 2 บิล รอส่ง 3 บิล </strong></h3>
                  <Table >
                  <div class="table table-striped">
                    <tbody>
                      <tr>
                        <th><center>26/06/2560</center></th>
                        <th><center>08.00</center></th>
                        <th><center><img src={require('../../../assets/img/brand/checked.png')} />&nbsp;&nbsp;</center></th>
                        <th><center>CTY0019936095 ส่งเรียบร้อย</center></th>
                      </tr>
                      <tr>
                        <th><center>26/06/2560</center></th>
                        <th><center>09.00</center></th>
                        <th><center><img src={require('../../../assets/img/brand/checked.png')} />&nbsp;&nbsp;</center></th>
                        <th><center>CTY0019936095 ส่งเรียบร้อย</center></th>
                      </tr>
                    </tbody>
                    </div>
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

export default TrackingMas;
