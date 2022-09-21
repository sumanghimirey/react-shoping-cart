import React from 'react'
import {Col, Row} from "react-bootstrap"
import StoreItem from '../components/StoreItem'
import storeItem from "../data/items.json"


function Store() {
  return (
    <>
    <div>Store</div>
    <Row md={2} xs={1} lg={3} className="g-3">
      {storeItem.map(item => (
        <Col key={item.id}>
        <StoreItem {...item} />
        </Col>
      ))}

    </Row>
    </>
  )
}

export default Store