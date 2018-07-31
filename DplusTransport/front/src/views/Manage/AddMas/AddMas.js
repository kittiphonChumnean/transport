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
      <html lang="en">
      <title>เพิ่มแมสเซนเจอร์</title> 
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                <h4><strong>เพิ่มแมสเซนเจอร์</strong></h4>
                </CardHeader>
                </Card>
            </Col>
          </Row>  
        </div>
      </html>
    );
  }
}

export default AddMas;