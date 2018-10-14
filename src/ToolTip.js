import React, { Component } from 'react';

import './tooltip.scss';

class ToolTip extends Component {
  render() {
    const {hover, activePoint} = this.props;
    const svgLocation = document.getElementsByClassName('linechart')[0].getBoundingClientRect();

    let placementStyles = {};
    let width = 100;
    placementStyles.width = width + 'px';
    placementStyles.left = hover + svgLocation.left - (width/2);

    return (
      <div className='hover' style={ placementStyles }>
        <div className='date'>{ activePoint.d }</div>
        <div className='price'>{ activePoint.p }</div>
      </div>
    )
  }
}

export default ToolTip;