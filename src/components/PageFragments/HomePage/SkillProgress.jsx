import React from 'react';
import { Row, Col } from 'antd';
import ProgressBar from '../../Progress';

const SkillsProgress = () => (
  <div>
    <h2>My Skills</h2>
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={24} md={12}>
        <ProgressBar
          percent={70}
          text="Javascript"
        />
        <ProgressBar
          percent={60}
          text="ReactJS"
        />
        <ProgressBar
          percent={80}
          text="ExtJS"
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <ProgressBar
          percent={30}
          text="Gatsby"
        />
        <ProgressBar
          percent={50}
          text="NodeJS"
        />
        <ProgressBar
          percent={60}
          text="Typescript"
        />
      </Col>
    </Row>
  </div>
);

export default SkillsProgress;
