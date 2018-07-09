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

class CNReport extends Component {
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
              <h4><strong>รายงานคืนสินค้า</strong>
                <img src={require('../../../assets/img/brand/pdf.png')} align="right" />
                &nbsp;&nbsp;<img src={require('../../../assets/img/brand/excel.png')} align="right" />
              </h4>
              </CardHeader>
              <CardBody>

                <div class="col-12">
                  <div class="card-body">
                    <form action="" method="post" class="form-inline">
                      <div class="pr-1 form-group ">

                        <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                          this.toggle(0);
                        }}>

                          <DropdownToggle caret>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Sale</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem>Sale 1</DropdownItem>
                            <DropdownItem>Sale 2</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                        <label for="exampleInputName2" class="pr-1"><strong>วันที่เริ่ม</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="date" class="form-control"></input>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                        <label for="exampleInputName2" class="pr-1"><strong>วันที่สิ้นสุด</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="date" class="form-control"></input>
                      </div>
                      &nbsp;&nbsp;<div class="pr-1 form-group">
                      <button aria-pressed="true" class="btn-pill btn btn-success btn-block">ค้นหา</button>
                      </div>
                    </form>
                    <br/>
                    <form action="" method="post" class="form-inline">
                    <div class="pr-1 form-group">
                        <label for="exampleInputName2" class="pr-1"><strong>Sale</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                        </input>
                      </div>
                      <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>วันที่</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                      </div>
                      <div class="pr-1 form-group">
                        &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>ถึง</strong></label>
                        &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                          </input>
                      </div>
                      </form>
                  </div>
                </div>
                  <br/> 
                  <center>
                  <Table responsive>
                    <thead>
                      <tr>

                        <th><center>ลำดับ</center></th>
                        <th><center>Sale</center></th>
                        <th><center>invoice</center></th>
                        <th><center>ลูกค้า</center></th>
                        <th><center>Qty ยอดจริง</center></th>
                        <th><center>ยอดเงินจริง</center></th>
                        <th><center>วันที่เคลียร์บิล</center></th>
                        <th><center>ยอดเงินที่เก็บได้</center></th>
                        <th><center>จำนวน CN</center></th>
                        <th><center>ยอด CN</center></th>
                        <th><center>จำนวนคงเหลือ</center></th>
                        <th><center>เหตุผล</center></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
                        <td><center>1</center></td>
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

    );
  }
}

export default CNReport;
