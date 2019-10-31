import React from "react";
import {Col, Row} from "antd";

class Master extends React.Component {
    render() {
        document.body.style.backgroundColor = "#f8fbfd";
        return <Row>
            <Col md={4} />
            <Col md={16}>

            </Col>
            <Col md={4} />
        </Row>
    }
}

export default Master;
