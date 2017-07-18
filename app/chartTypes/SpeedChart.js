import React from 'react';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine } from 'victory';

import { cleanData } from './chartData/frontEndData.js';
import {speedDataforIndividual} from './chartData/lapSpeedData.js';
import { getMax, percentifyData } from './helpers/helperFunctions';
import { getStyles } from './helpers/chartStyles';

const styles = getStyles();

export default class SpeedChart extends React.Component {
  constructor() {
    super();
    this.state = { lapSpeedData:[],
                   person:"MIKE" };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.runners === this.props.runners) {
      return;
    }

    let frontEndData = cleanData(nextProps.runners);

    const lapSpeedData = speedDataforIndividual(this.state.person, frontEndData);
    
    this.setState({ lapSpeedData:lapSpeedData });
  }

  render() {
    const maxSpeed = getMax(this.state.lapSpeedData, "speed",5);
    return (
      
      <svg viewBox="0 0 400 400" >
        
          <rect x="0" y="0" width="400" height="400" fill="#232325"/>
      
        <VictoryChart
          theme={VictoryTheme.material}
          padding={{ top: 80, bottom: 80, left: 80, right: 80 }}
          domainPadding={30}>
          
          <VictoryLabel x={175} y={50} 
            style={styles.title}
            text={"Lap Breakdown for " + this.state.person}
            textAnchor ="middle"
          />
        
          {/* X-Axis */}
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Lap 1", "Lap 2", "Lap 3", "Lap 4"]}
            tickLabelComponent={
                <VictoryLabel 
                style={styles.title}
                verticalAnchor={"middle"}
                angle={270} 
                dx={-20}/>  
            } 
          />

          {/* Y-Axis [LAP RUN SPEED] */}
          <VictoryLine
              data={percentifyData(this.state.lapSpeedData, "lap", "speed", 5)}
              x="lap"
              y="speed"
              interpolation="catmullRom"
              style={{ 
                data: { stroke: "#f1da33", strokeWidth: 3, strokeLinecap: "round" } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 2000 }
              }}
          />
          <VictoryAxis 
              dependentAxis
              orientation="left"
              standalone={false}
              tickFormat={(x) => (`${Math.ceil(x * maxSpeed/.5)*.5} mph`)}
              style={{ tickLabels: { fill: "#f1da33" } }}
            />
          
            
        </VictoryChart>
      </svg>
    )
  }
  
  
}

