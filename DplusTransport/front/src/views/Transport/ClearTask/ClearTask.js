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
} from 'reactstrap';

class ClearTask extends Component {
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
              <h4><strong>เคลียร์งาน</strong></h4>
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
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>วันที่</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="date" class="form-control"></input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button aria-pressed="true" class="btn-pill btn btn-success btn-block">ค้นหา</button>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Sale</strong></label>&nbsp;&nbsp;
                          <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                          </div>
                      </form>
                    </div>
                  </div>
                  <h5><strong>จำนวนรวม 0 บาท</strong></h5>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th width="5%"><center><button aria-pressed="true" class="btn-pill btn btn-primary btn-block">all</button></center></th>
                        <th width="10%"><center>ลำดับ</center></th>
                        <th width="10%"><center>status</center></th>
                        <th ><center>หมายเหตุ</center></th>
                        <th width="10%"><center>วันที่</center></th>
                        <th width="15%"><center>รหัส invoice</center></th>
                        <th><center>ผู้รับ</center></th>
                        <th><center>ยอดเงิน</center></th>
                        <th width="10%"><center></center></th>
                        <th width="10%"><center></center></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><center><input type="checkbox" value=""></input></center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center><button class="btn btn-outline-success btn-block">เคลียร์</button></center></td>
                        <td><center><button class="btn btn-outline-danger btn-block">CN</button></center></td>
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

export default ClearTask;
