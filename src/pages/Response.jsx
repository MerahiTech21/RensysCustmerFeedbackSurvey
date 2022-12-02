import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Individual from '../components/response/Individual';
import Questions from '../components/response/Questions';
import Summary from '../components/response/Summary';
import './Response.css'

function Response() {
  const [key, setKey] = useState('summary');

  return (
    <div className='mt-0'>
      <div className='m-0'><h6 className='m-0'>2 Responses</h6></div>
    <div className='d-flex flex-column justify-content-between align-items-end mb-2 me-5 mt-0' >
      <div>
    <div  >Survey Name : Customer Feedback Survey</div>
    <div  >Survey Status :Active</div>
    </div>
    </div>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      transition={false}
      onSelect={(k) => setKey(k)}
      className="mb-3 d-flex justify-content-center align-items-center border-color-gray-600"
      // fill
      // justify
      // variant="pills"
      
    >
      <Tab eventKey="summary" title="Summary" className='me-1 border-0' >
        <Summary />
      </Tab>
      <Tab eventKey="question" title="Question">
        <Questions />
      </Tab>
      <Tab eventKey="individual" title="Individual" >
        <Individual />
      </Tab>
    </Tabs>
    </div>
  );
}

export default Response;