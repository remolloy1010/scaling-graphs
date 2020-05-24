import React from 'react';
import LeftArrow from '@material-ui/icons/ArrowBackIos'
import RightArrow from '@material-ui/icons/ArrowForwardIos'
import { Typography, Divider } from '@material-ui/core';

const barHeight = 100;
const scaleMarkWidth = 5;
const sliderMarkWidth = 10;

const styles = {
  barContainer: {
    position: 'relative' as 'relative'
  },
  barTotal: {
    display: 'flex' // all blocks go next to each other instead of stacking vertically
  },
  safe: {
    backgroundColor: "green",
    border: "2px solid black",
    height: barHeight,
    width: "100%"

  },
  risk: {
    backgroundColor: "red",
    border: "2px solid black",
    height: barHeight,
    width: "50%"
  },
  scale: {
    backgroundColor: "black",
    height: 2,
    width: "auto",
    marginTop: 60,
    position: 'relative' as 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  scaleMark: {
    position: 'absolute' as 'absolute',
    height: 20,
    width: scaleMarkWidth,
    backgroundColor: 'black'
  },
  sliderLine: {
    backgroundColor: "black",
    height: 5,
    width: "100%",
    position: 'absolute' as 'absolute',
    top: '50%',
    left: 0,
    display: 'flex',
    alignItems: 'center',
  },
  sliderMarks: {
    position: 'absolute' as 'absolute',
    height: barHeight + 60,
    width: sliderMarkWidth,
    backgroundColor: "black"
  },
  backgroundBlock: {
    
    // backgroundColor: "grey"
  },
  leftArrowStyle: {
    marginLeft: 0,
    height: 30,
    width: 30
  },
  rightArrowStyle: {
    position: 'absolute' as 'absolute',
    right: -7,
    height: 30,
    width: 30
  },
  title: {
    height: 40,
    width: 40,
  }
}

function ScalingGraph({
    data
}: any) {
  // logic will go here

  // Scale dimensions
  const start = data.start;
  const point1 = data.point_1;
  const point2 = data.point_2;
  const end = data.end;
  const minPoint = Math.min(point1, point2);
  const maxPoint = Math.max(point1, point2);

  // Changing dimensions
  const slider1 = data.dimension_1; 
  const slider2 = data.dimension_2; 
  const minSlider = Math.min(slider1, slider2);
  const maxSlider = Math.max(slider1, slider2);


  // const slidersArray = [slider1, slider2];
  // const minSlider = Math.min(slidersArray: number)

  // Equations
  const totalWidth = end - start; // 100%
  const riskWidth = point2 - point1; // riskWidth/totalWidth * 100 = XX%
  const safe1Width = point1 - start; // safe1Width/totalWidth * 100 = XX%
  const safe2Width = end - point2; // safe2Width/totalWidth * 100 = XX%
  const slider1Width = slider1 - start;
  const slider2Width = slider2 - start;

  // Styling
  const textHeight = 132;

  function barPercentages(numerator: number, offset: number = 0) {
    return `calc(${numerator/totalWidth * 100 + "%"} + ${offset}px)` // calc(X% + offsetpx)
  }

  function sliderColors(slider: number) {
    return (slider < minPoint || slider > maxPoint) ? "green" : "red";

  }

  function textColors() {
    return (calculateRisk() === "0%") ? "green" : "red";
  }

  function calculateRisk() {
    if (minSlider <= maxPoint && minSlider >= minPoint && maxSlider >= maxPoint) {
      return (((maxPoint - minSlider) / riskWidth) * 100).toFixed(1) + "%"
    }
    else if (minSlider < minPoint && maxSlider > minPoint && maxSlider <= maxPoint) {
      return (((maxSlider - minPoint) / riskWidth) * 100).toFixed(1) + "%"
    }
    else if (minSlider > minPoint &&  maxSlider < maxPoint && maxSlider >= minPoint) {
      return (((maxSlider - minSlider) / riskWidth) * 100).toFixed(1) + "%"
    }
    else if (minSlider <= minPoint && maxSlider >= maxPoint) {
      return 100 + "%"
    }
    else if (minSlider <= minPoint && maxSlider <= maxPoint && maxSlider >= minPoint) {
      return (((maxSlider - minPoint) / riskWidth) * 100).toFixed(1) + "%"
    }
    return "0%"
  }
  
  return (    
    

    <div >
      
      <Typography variant="h3" align="center" gutterBottom style={{marginBottom: 100, marginTop: 100}}>
        {data.title}
      </Typography>
      <div style={styles.barContainer} >
     
        <div style={styles.barTotal} >
          <div style={{...styles.safe, width: barPercentages(safe1Width)}} >
            <Typography variant="body2" align="center" gutterBottom style={{marginTop: textHeight, color: "green", fontWeight: "bold"}}>
              Adequate Interference
            </Typography>
          </div>
          <div style={{...styles.risk, width: barPercentages(riskWidth)}} >
            <Typography variant="body2" align="center" gutterBottom style={{marginTop: textHeight, color: "red", fontWeight: "bold"}}>
              Risk Zone
            </Typography>
          </div>
          <div style={{...styles.safe, width: barPercentages(safe2Width)}} >
            <Typography variant="body2" align="center" gutterBottom style={{marginTop: textHeight, color: "green", fontWeight: "bold"}}>
              Adequate Clearance
            </Typography>
          </div>
          
        </div>
        <div style={styles.sliderLine} >
          {/* <div style={{...styles.sliderMarks, left: '30%'}} /> */}
          <LeftArrow style={styles.leftArrowStyle}/>
          <RightArrow style={styles.rightArrowStyle}/>
          <div style={{...styles.sliderMarks,  left: barPercentages(slider1Width, (-0.5 * sliderMarkWidth))}} >
            <Typography variant="h6" gutterBottom style={{marginTop: -35, width: 100, marginLeft: -24, color: sliderColors(slider1), fontWeight: "bold"}}>
              {slider1} mm
            </Typography>
          </div>
          <div style={{...styles.sliderMarks, left: barPercentages(slider2Width, (-0.5 * sliderMarkWidth))}} >
            <Typography variant="h6" gutterBottom style={{marginTop: -35, width: 100, marginLeft: -24, color: sliderColors(slider2), fontWeight: "bold"}}>
              {slider2} mm
            </Typography>
          </div>
          </div>
      </div>

      <div style={styles.scale} >
        <div style={{...styles.scaleMark, left: barPercentages(0, (-0.5 * scaleMarkWidth))}}  >
          <Typography variant="body2" gutterBottom style={{marginTop: 25, width: 70, marginLeft: -10}}>
            {start} mm
          </Typography>
        </div>
        <div style={{...styles.scaleMark, left: barPercentages(safe1Width, (-0.5 * scaleMarkWidth))}} >
          <Typography variant="body2" gutterBottom style={{marginTop: 25, width: 70, marginLeft: -10}}>
            {point1} mm
          </Typography>
        </div>
        <div style={{...styles.scaleMark, right: barPercentages(safe2Width, (-0.5 * scaleMarkWidth))}} >
          <Typography variant="body2" gutterBottom style={{marginTop: 25, width: 70, marginLeft: -10}}>
            {point2} mm
          </Typography>
        </div>
        <div style={{...styles.scaleMark, left: barPercentages(totalWidth, (-0.5 * scaleMarkWidth))}} >
          <Typography variant="body2" gutterBottom style={{marginTop: 25, width: 70, marginLeft: -25}}>
            {end} mm
          </Typography>
          
        </div>
      </div>
    
      
      <Typography variant="h4" align="center" gutterBottom style={{marginTop: 100, marginLeft: -10, color: textColors()}}>
        Your design space will cover {calculateRisk()} of the Misconnection Risk Zone
      </Typography>
      <Divider />
    
    </ div>
    
  
    
  );
}

export default ScalingGraph;
