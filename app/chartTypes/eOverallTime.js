import React from 'react';

import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar, VictoryLabel } from 'victory';
import { cleanData } from './chartData/frontEndData.js';
import { LeaderBoard } from './chartData/overallSplitTimes.js';
import { SecondsToTime } from './helpers/helperFunctions';
import { getStyles } from './helpers/chartStyles';

const styles = getStyles();

export default class eOverallChart extends React.Component {
  constructor() {
    super();
    this.state = { barData:[] };
  }

  componentWillMount() {
    let frontEndData = cleanData(this.props.runners);
    
    const barData = LeaderBoard(frontEndData);
    this.setState({ barData:barData });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.runners === this.props.runners) {
      return;
    }

    let frontEndData = cleanData(nextProps.runners);
    const barData = LeaderBoard(frontEndData);
    
    this.setState({ barData:barData });
  }

  render() {

    if(this.state.barData === undefined) {
      return <p>No Charts</p>;
    }
    return (
      <div>
        
        <svg viewBox="0 0 400 400" >
        
          <rect x="0" y="0" width="400" height="400" fill="#232325"/>
        
          <VictoryChart 
          domainPadding={{ y: 20, x:20}} 
          theme={VictoryTheme.material}
          padding={{ top: 80, bottom: 80, left: 80, right: 80 }}>
              
            <VictoryBar 
              horizontal
              data={this.state.barData}
              x="x"
              y="y"
              style={styles.stackBarStyleA}
              labels={(d) => (SecondsToTime(d.y))}
              animate={
                {
                  duration: 2000,
                  onLoad: { duration: 2000 }
                }
              }>
            </VictoryBar>
            
            <VictoryAxis
              dependentAxis
              tickLabelComponent={<VictoryLabel events={{
                onClick: (e) => {
                  this.props.changeRunner(e.target.innerHTML);
                  
                }
              }} />}
              style={{ tickLabels: { fill: "tomato" } }}
            />
              
            <VictoryAxis
              label={"Total Time (mins)"}
              axisLabelComponent={
                <VictoryLabel 
                  style={styles.title}
                  dy={20}/>}
              tickFormat={(t) => ``}
              tickLabelComponent={
                <VictoryLabel 
                  style={styles.title}/>  
              } 
            />
          </VictoryChart>
        </svg>
      </div>
    );
  }
}

