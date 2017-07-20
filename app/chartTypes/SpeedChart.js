import React from 'react';

import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine } from 'victory';

import { cleanData } from './chartData/frontEndData.js';
import {speedDataforIndividual} from './chartData/lapSpeedData.js';
import { mphToTime, groupLapAvg } from './helpers/helperFunctions';
import { getStyles } from './helpers/chartStyles';

const styles = getStyles();

export default class SpeedChart extends React.Component {
  constructor() {
    super();
    this.state = { lapSpeedData:[] };
  }

  componentWillMount() {
    let frontEndData = cleanData(this.props.runners);
    console.log(frontEndData);

    const lapSpeedData = speedDataforIndividual(this.props.runnerSelected, frontEndData);
    
    this.setState({ lapSpeedData:lapSpeedData });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.runners === this.props.runners && this.props.runnerSelected === nextProps.runnerSelected) {
      return;
    }

    let frontEndData = cleanData(nextProps.runners);

    const lapSpeedData = speedDataforIndividual(this.props.runnerSelected, frontEndData);
    
    this.setState({ lapSpeedData:lapSpeedData });
  }

  render() {
    
    const lapAvg = 900/groupLapAvg(this.state.frontEndData);
    
    return (
      
      <svg viewBox="0 0 400 400" >
        
          <rect x="0" y="0" width="400" height="400" style={styles.background}/>
      
        <VictoryChart
          theme={VictoryTheme.material}
          padding={{ top: 80, bottom: 80, left: 80, right: 80 }}
          domainPadding={30}>
          
          <VictoryLabel x={175} y={50} 
            style={styles.title}
            text={"Lap Breakdown for " + this.props.runnerSelected}
            textAnchor ="middle"
          />
        
          {/* X-Axis */}
          <VictoryAxis
            style={styles.barStyleA}
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
          <VictoryAxis 
              dependentAxis
              orientation="left"
              standalone={false}
              tickFormat={(x) => (`${Math.ceil(x/.5)*.5} mph`)}
              style={styles.barStyleA}
              tickLabelComponent={
                <VictoryLabel 
                style={styles.title}
                />  
              } 
            />
          
          {/* Horizontal Line [GROUP AVG LAP TIME] */}  
          <VictoryLine
            data={[
              {x: 0.5, y: lapAvg},
              {x: 4.5, y: lapAvg}
            ]}
            labels={["","GROUP LAP AVG = " + mphToTime(lapAvg)]}
            standalone={false}
            labelComponent={<VictoryLabel  dx={-50}/>}
            style={styles.avgLine}
          />
            
          <VictoryLine
              data={this.state.lapSpeedData}
              x="lap"
              y="speed"
              interpolation="catmullRom"
              labels={(d) => mphToTime(d.y)}
              style={styles.speedLine}
              animate={{
                duration: 2000,
                onLoad: { duration: 2000 }
              }}
          />
          
          
            
        </VictoryChart>
      </svg>
    );
  }
  
  
}

