export function getStyles() {

    return {
      
      barStyleA: {
        data: { 
          fill: "tomato", 
          stroke: "black", 
          strokeWidth: .5
        },
        labels: { 
          fill: "#F6E77D",
          fontSize: 8
        }
        
      },
      
      stackBarStyleA:{
        data: { 
          colorScale: "tomato", 
          stroke: "black", 
          strokeWidth: .5
        }
        
      },
      
      chartFill: {
        data: { 
          fill: "lemon", 
          stroke: "black", 
          strokeWidth: .5
        }
      },
      
      parent: {
        background: "#ccdee8",
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        margin: 20,
        fontFamily: "'Fira Sans', sans-serif",
        width: "100%",
        height: "auto"
      },
      title: {
        fill: "#939393",
      },
      labelNumber: {
        textAnchor: "middle",
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px"
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: "black", strokeWidth: 1},
        ticks: {
          size: (tick) => {
            const tickSize =
              tick.getFullYear() % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 16
        }
      },

      
    };
  }