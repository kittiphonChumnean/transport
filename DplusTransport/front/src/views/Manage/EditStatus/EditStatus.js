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

class EditStatus extends Component {
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
              <h4><strong>แก้ไขสถานะ</strong></h4>
              </CardHeader>
              <CardBody>
                <center>
                  <div class="col-12">
                    <div class="card-body">
                      <form action="" method="post" class="form-inline" margin="auto auto">
                        <div class="pr-1 form-group">
                          <label for="exampleInputName2" class="pr-1"><strong>รหัส invoice</strong></label>
                          &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control"></input>
                        </div>
                        &nbsp;&nbsp;<div class="pr-1 form-group">
                          <button aria-pressed="true" class="btn-pill btn btn-success btn-block">ค้นหา</button>
                        </div>
                      </form>
                      <br/>
                      <form action="" method="post" class="form-inline" margin="auto auto">
                      <div class="pr-1 form-group">
                        <label for="exampleInputName2" class="pr-1"><strong>รหัส invoice</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                        </input>
                      </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Messenger</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputEmail2" class="pr-1"><strong>ชื่อผู้รับ</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputEmail2" placeholder="" required="" type="email" class="form-control" value=" " disabled>
                          </input>
                        </div>
                        <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputEmail2" class="pr-1"><strong>ที่อยู่ผู้รับ</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputEmail2" placeholder="" required="" type="email" class="form-control" value=" " disabled>
                          </input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <br/>
                  <h3><strong>สถานะปัจจุบัน : เสร็จสิ้น </strong></h3>
                  <Table responsive>
                  <div class="table table-striped">
                    <tbody>
                      <tr>
                        <th><center>26/06/2560</center></th>
                        <th><center>08.00</center></th>
                        <th><center><img src={require('../../../assets/img/brand/checked.png')} />&nbsp;&nbsp;</center></th>
                        <th><center>รับงานเข้าระบบ</center></th>
                        <th width="5%"><center><button aria-pressed="true" class="btn-pill btn btn-danger btn-block active">ลบ</button></center></th>
                      </tr>
                      <tr>
                        <th><center>26/06/2560</center></th>
                        <th><center>09.00</center></th>
                        <th><center><img src={require('../../../assets/img/brand/checked.png')} />&nbsp;&nbsp;</center></th>
                        <th><center>แมสคอนเฟริมออกรอบ</center></th>
                        <th width="5%"><center><button aria-pressed="true" class="btn-pill btn btn-danger btn-block active">ลบ</button></center></th>
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

export default EditStatus;
