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

class ManagePrivilege extends Component {

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
              <h4><strong>จัดการสิทธิ์</strong></h4>

              </CardHeader>
              <CardBody>
                <center>

                  <Table responsive>
                    <thead>
                      <tr>

                        <th>ลำดับ</th>
                        <th><center>Username</center></th>
                        <th> </th>
                        <th><center>คอนเฟริม</center></th>
                        <th><center>งานจัดส่ง</center></th>
                        <th><center>ติดตาม</center></th>
                        <th><center>คิดค่ารอบแมสเซนเจอร์</center></th>
                        <th><center>รายงาน</center></th>
                        <th><center>จัดการ</center></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><button aria-pressed="true" class="btn-pill btn btn-primary btn-block">all</button>
                        
                        </td>
                        <td><input id="input" placeholder="" required="" type="checkbox" class="form-control"></input></td>
                        <td><input id="input2" placeholder="" required="" type="checkbox" class="form-control"></input></td>
                        <td><input id="input3" placeholder="" required="" type="checkbox" class="form-control"></input></td>
                        <td><input id="input4" placeholder="" required="" type="checkbox" class="form-control"></input></td>
                        <td><input id="input5" placeholder="" required="" type="checkbox" class="form-control"></input></td>
                        <td><input id="input6" placeholder="" required="" type="checkbox" class="form-control"></input></td>
                      </tr>




                    </tbody>


                    
                  </Table>
                  <div class="col-2">
                    <button class="btn btn-success btn-block">บันทึก</button>
                  </div>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ManagePrivilege;