import { useEffect, useState } from "react";
import { firestore } from "Firebase/firebaseConfig"; //"./firebaseConfig";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

const us_flag = require("assets/img/flags/US.png").default;
const de_flag = require("assets/img/flags/DE.png").default;
const au_flag = require("assets/img/flags/AU.png").default;
const gb_flag = require("assets/img/flags/GB.png").default;
const ro_flag = require("assets/img/flags/RO.png").default;
const br_flag = require("assets/img/flags/BR.png").default;

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};





const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  ///FIREBASE
const [powerdata, setpowerdata] = useState([]);
const [powerdata2, setpowerdata2] = useState([]);
const [powerdata3, setpowerdata3] = useState([]);
const [powerdata4, setpowerdata4] = useState([]);
const [powerdata5, setpowerdata5] = useState([]);

// Initial load, get data
useEffect(() => {
  getFirebaseData();


  
}, []);

const chartData = {
  labels:[],
  series:[[]]
};

const chartData2 = { labels:[],series:[[]]};
const chartData3 = { labels:[],series:[[]]};
const chartData4 = { labels:[],series:[[]]};
const chartData5 = { labels:[],series:[[]]};

 // const seriesData = [];

  var options2 = {
    high: 1000,
    low: 0,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  var options3 = {
    high: 60,
    low: 0,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  var options4 = {
    high: 400,
    low: 0,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  var options5 = {
    high: 10,
    low: 0,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  var options6 = {
    high: 10,
    low: 0,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

const getFirebaseData = async () => {
  const oneDayBefore = getOneDayBeforeDate();
  
  // Main statement
  const firebaseData = await firestore
  .collection("powerprice")
  .where("timestamp", ">=", oneDayBefore)
  .get();

  const firebaseData2 = await firestore
  .collection("waterLevel")
  .where("timestamp", ">=", oneDayBefore)
  .get();

  const firebaseData3 = await firestore
  .collection("waterInflux")
  .where("timestamp", ">=", oneDayBefore)
  .get();

  const firebaseData4 = await firestore
  .collection("money")
  .where("timestamp", ">=", oneDayBefore)
  .get();

  const firebaseData5 = await firestore
  .collection("environmentCost")
  .where("timestamp", ">=", oneDayBefore)
  .get();
  
  

  
  const d = firebaseData.docs.map((doc) => {
    // doc.data() returns {powerPrice, timestamp}
    return doc.data();
  });

  const d2 = firebaseData2.docs.map((doc) => {
    // doc.data() returns {powerPrice, timestamp}
    return doc.data();
  });

  const d3 = firebaseData3.docs.map((doc) => {
    // doc.data() returns {powerPrice, timestamp}
    return doc.data();
  });
  const d4 = firebaseData4.docs.map((doc) => {
    // doc.data() returns {powerPrice, timestamp}
    return doc.data();
  });

  const d5 = firebaseData5.docs.map((doc) => {
    // doc.data() returns {powerPrice, timestamp}
    return doc.data();
  });
    
  
  
//  Number("1000")
  
  d.forEach(chartD=>{
    chartData.labels.push(chartD.timestamp.toDate().getHours().toString());
    chartData.series.push(Math.floor(chartD.powerPrice));
  })

  d2.forEach(chartD=>{
    chartData2.labels.push(chartD.timestamp.toDate().getHours().toString());
    chartData2.series.push(Math.floor(chartD.waterLevel));
  })

  d3.forEach(chartD=>{
    chartData3.labels.push(chartD.timestamp.toDate().getHours().toString());
    chartData3.series.push(Math.floor(chartD.waterInflux));
  })

  d4.forEach(chartD=>{
    chartData4.labels.push(chartD.timestamp.toDate().getHours().toString());
    chartData4.series.push(Math.floor(chartD.money)/100000000);
  })

  d5.forEach(chartD=>{
    chartData5.labels.push(chartD.timestamp.toDate().getHours().toString());
    chartData5.series.push(Math.floor(chartD.environmentCost)/10000000);
  })
  
  //chartData.series.concat(seriesData);
  chartData.series = [chartData.series];
  chartData.series[0].shift();

  chartData2.series = [chartData2.series];
  chartData2.series[0].shift();

  chartData3.series = [chartData3.series];
  chartData3.series[0].shift();

  chartData4.series = [chartData4.series];
  chartData4.series[0].shift();

  chartData5.series = [chartData5.series];
  chartData5.series[0].shift();

  console.log(chartData);
  console.log(chartData2);
  console.log(chartData3);
  console.log(chartData4);
  console.log(chartData5);
  //update state
  setpowerdata(chartData);
  setpowerdata2(chartData2);
  setpowerdata3(chartData3);
  setpowerdata4(chartData4);
  setpowerdata5(chartData5);
  };
  
// Helper function to get 24 hrs before day
const getOneDayBeforeDate = () => {
return new Date(new Date().getTime() - 12 * 60 * 60 * 1000);
};

///


  return (
    
    <div>
      <GridContainer>
        <GridItem xs={12}>
        <Card chart className={classes.cardHover}>
            <CardHeader color="warning" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={powerdata }
                type="Line"
                options={options2}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Strøm pris</h4>
              <p className={classes.cardCategory}>
                Siste 24 timer
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
        <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={powerdata2}
                type="Line"
                options={options3}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Last ned Excel"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Vann Nivå</h4>
              <p className={classes.cardCategory}>
                Siste 24 timer
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
        <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={powerdata3}
                type="Line"
                options={options4}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Vann flyt</h4>
              <p className={classes.cardCategory}>
                Siste 24 timer
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
        <Card chart className={classes.cardHover}>
            <CardHeader color="success" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={powerdata4}
                type="Line"
                options={options5}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Inntekt</h4>
              <p className={classes.cardCategory}>
                Siste 24 timer
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
        <Card chart className={classes.cardHover}>
            <CardHeader color="danger" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={powerdata5}
                type="Line"
                options={options6}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Miljøkostnad</h4>
              <p className={classes.cardCategory}>
                Siste 24 timer
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
