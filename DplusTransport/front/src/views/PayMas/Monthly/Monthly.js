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

class Monthly extends Component {
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
      <html lang="en">
      <title>คิดค่ารอบMessanger (รายเดือน)</title> 
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                  <h4><strong>คิดค่ารอบ Messanger (รายเดือน)</strong></h4>
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
                            <label for="exampleInputName2" class="pr-1"><strong>เดือน</strong></label>
                            &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="month" class="form-control"></input>

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
                          &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>เดือน</strong></label>
                          &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                            </input>
                        </div>
                        <div class="pr-1 form-group">
                          &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>ค่ารอบรวม</strong></label>
                          &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                            </input>
                        </div>
                        </form>
                      </div>
                    </div>
                    <br/>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th><center>ลำดับ</center></th>
                          <th><center>วันที่</center></th>
                          <th><center>ห้าง</center></th>
                          <th><center>ค่ารอบ</center></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><center>1</center></td>
                          <td><center>1</center></td>
                          <td><center>1</center></td>
                          <td><center>1</center></td>
                        </tr>
                      </tbody>
                    </Table>
                  </center>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </html>
    );
  }
}

export default Monthly;
