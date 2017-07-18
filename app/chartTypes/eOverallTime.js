import React from 'react';

import { VictoryStack, VictoryChart, VictoryTheme, VictoryAxis, VictoryBar, VictoryGroup, VictoryLabel } from 'victory';
import { cleanData } from './chartData/frontEndData.js';
import { LeaderBoard } from './chartData/overallSplitTimes.js';
//import { getMax, percentifyData } from './helpers/helperFunctions';
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
    console.log(barData);
    
    this.setState({ barData:barData });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.runners === this.props.runners) {
      return;
    }

    let frontEndData = cleanData(nextProps.runners);

    const barData = LeaderBoard(frontEndData);
    console.log(barData);
    
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
          
              <VictoryGroup 
              offset={30} 
              style={{ data: { width: 10 } }}>
              
                <VictoryStack 
                colorScale={"red"} 
                horizontal={true}
                style={styles.stackBarStyleA}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                    
                }}>
  
                  {this.state.barData.map((data, index) => {
                    return <VictoryBar  
                      key={index} 
                      data={data} 
                      events={[{
                        target: "data",
                        eventHandlers: {
                          onClick: () => {
                            return [
                              {
                                target: "data",
                                mutation: (props) => {
                                  const fill = props.style && props.style.fill;
                                  return fill === "black" ? null : { style: { fill: "black" } };
                                }
                              }, {
                                target: "labels",
                                mutation: (props) => {
                                  return props.text ? null : { text: "clicked" };
                                }
                              }
                            ];
                          }
                        }
                      }]}
                      />;
                   
                  })}
                  
                </VictoryStack>
                
              </VictoryGroup>
              
              <VictoryAxis
              
                dependentAxis
                tickValues={this.state.barData[0].map((d) =>{
                  return d.x;
                })}
                style={{ tickLabels: { fill: "tomato" } }}
              />
              
              <VictoryAxis
                label={"Total Time (mins)"}
                axisLabelComponent={
                  <VictoryLabel 
                    style={styles.title}
                    dy={20}/>}
                tickFormat={(x) => (`${Math.ceil((x/60)/.5)*.5}`)}
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

