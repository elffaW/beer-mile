export function getStyles() {
  
  const background = "#232325";       //Charcoal
  const gridColor = "#363636";        //Lighter Charcoal
  const barFillColor = "#AEA4BF";     //Grayish violet
  const tickLabelColor = "#f6e77d";   //Soft yellow
  const titleColor = "#b89685";       //Slightly desaturated orange
  const lineColor = "85ff9e";         //Very light lime green

    return {
      
      background: {
        fill: background
      },
      
      barStyleA: {
        data: { 
          fill: barFillColor, 
          stroke: "black", 
          strokeWidth: .5
        },
        
        labels: { 
          fill: titleColor,
          fontSize: 6
        },
        
        tickLabels: {
          fill: tickLabelColor,
          fontSize: 6
        }, 
        
        grid: {
          stroke: gridColor
        }
        
      },
      
      avgLine: {
        data: { 
          stroke: barFillColor, strokeWidth: 2 
        },
        
        labels: { 
          fill: titleColor,
          verticalAnchor: "center",
          textAnchor: "left",
          fontSize: 6
        }
  
      },
      
      speedLine: {
        data: { 
          stroke: lineColor, 
          strokeWidth: 3, 
          strokeLinecap: "round" 
        }, 
        
        labels: { 
          fill: tickLabelColor,
          angle: 315
        }
  
      },
      
      title: {
        fill: titleColor
      },

    };
  }