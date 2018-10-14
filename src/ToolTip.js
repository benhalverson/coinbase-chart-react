import React, { Component } from 'react';

import './tooltip.css';

class ToolTip extends Component {
  render() {
    const {hover, activePoint} = this.props;
    const svgLocation = document.getElementsByClassName('linechart')[0].getBoundingClientRect();

    let placementStyles = {};
    let width = 100;
    //placementStyles.width = width + 'px'; //let it be width based on content
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