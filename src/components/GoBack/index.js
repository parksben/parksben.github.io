import React, { Component } from 'react';
import { Button } from 'antd';

export class GoBack extends Component {
  render() {
    return (
      <Button
        size="large"
        type="normal"
        icon="left"
        onClick={() => {
          window.history.go(-1);
        }}>
        返回
      </Button>
    );
  }
}

export default GoBack;
