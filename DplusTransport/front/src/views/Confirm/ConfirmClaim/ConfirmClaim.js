import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Table,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class ConfirmClaim extends Component {
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
        <title>คอนเฟริมเคลม</title>  
        <div className="animated fadeIn">
          <Row>

            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                  <h4><strong>คอนเฟริมเคลม</strong></h4>
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
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <DropdownToggle caret>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Sale</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem>Sale 1</DropdownItem>
                                <DropdownItem>Sale 2</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>&nbsp;&nbsp;
                          </div>
                          <div class="pr-1 form-group">
                          &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>วันที่</strong></label>
                          &nbsp;&nbsp;<input id="exampleInputName2" placeholder="" required="" type="date" class="form-control"></input>
                          </div>
                          &nbsp;<div class="pr-1 form-group">
                            <button aria-pressed="true" class="btn-pill btn btn-success btn-block">&nbsp;&nbsp;&nbsp;&nbsp;ค้นหา&nbsp;&nbsp;&nbsp;&nbsp;</button>
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class="pr-1 form-group">
                          &nbsp;&nbsp;<label for="exampleInputName2" class="pr-1"><strong>Sale</strong></label>&nbsp;&nbsp;
                            <input id="exampleInputName2" placeholder="" required="" type="text" class="form-control" value=" " disabled>
                            </input>
                          </div>
                        </form>
                      </div>
                    </div>
                    <br/>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th width="10%"><center><button aria-pressed="true" class="btn-pill btn btn-primary btn-block">all</button></center></th>
                          <th width="10%"><center>ลำดับ</center></th>
                          <th width="15%"><center>รหัส ij</center></th>
                          <th width="15%"><center>ผู้รับ</center></th>
                          <th><center>ที่อยู่</center></th>
                          <th width="10%"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><center><input type="checkbox" value=""></input></center></td>
                          <td><center>1</center></td>
                          <td><center>1</center></td>
                          <td><center>1</center></td>
                          <td><center>1</center></td>
                          <td><center><button class="btn btn-outline-success btn-block">คอนเฟริม</button></center></td>
                        </tr>
                    </tbody>
                    </Table>
                    <button class="btn-pill btn btn-success btn-lg">คอนเฟริม</button>
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

export default ConfirmClaim;
