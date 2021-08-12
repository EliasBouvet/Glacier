import React, {useEffect, useState} from "react";
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
  straightLinesChart
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
  const [waterLevel, setWaterLevel] = useState(0)
  const [powerPrice, setPowerPrice] = useState(0)
  const [waterInflux, setWaterInflux] = useState(0)
  const [moneyEarned, setMoneyEarned] = useState(0)
  const [environmentCost, setEnvironmentCost] = useState(0)
  const [dangerMessage, setDangerMessage] = useState(null)
  const [dangerColor, setDangerColor] = useState("disabled")
  const classes = useStyles();
  const headers = {
    "GroupId": "Gruppe 16",
    "GroupKey": "iIw0LHgoTE6K/blLE5fv3g=="
  }

  function getGeneratorState() {
    fetch("https://innafjord.azurewebsites.net/api/GroupState", {headers: headers})
    .then((res) => {
      return res.json()
   })
   .then((data) =>{
     const formatMoneyEarned = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(data.money)
     setMoneyEarned(formatMoneyEarned)
     const formatEnvmCost = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(data.environmentCost)
     setEnvironmentCost(formatEnvmCost)
     let waterLevelRounded = Math.round(data.waterLevel)
     if (data.waterLevel > 40) {
      setDangerMessage("Alt for mye vann!")
      setDangerColor("error")
     }
     if (data.waterLevel < 30) {
       setDangerMessage("Alt for lite vann!")
       setDangerColor("error")
     }
     setWaterLevel(waterLevelRounded)
   })
  }

  function getPowerPrice() {
    fetch("https://innafjord.azurewebsites.net/api/PowerPrice")
      .then((res) => {
         return res.text()
      })
      .then((data) =>{
        setPowerPrice(data)
      })
  }

  function getWaterInflux() {
    fetch("https://innafjord.azurewebsites.net/api/WaterInflux")
    .then((res) => {
       return res.text()
    })
    .then((data) =>{
      let waterInfluxRounded = Math.round(data)
      setWaterInflux(waterInfluxRounded)
    })
  }

  function updateData() {
    getPowerPrice()
    getWaterInflux()
    getGeneratorState()
  }

  useEffect(() => {
    updateData()
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} lg={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>water_drop</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Vannbestand</p>
              <h3 className={classes.cardTitle}>
                {waterLevel} <small>m</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning color={dangerColor}/> {/* expected one of ["action","disabled","error","inherit","primary","secondary"] */}
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  {dangerMessage ? dangerMessage : "Vannivå OK"}
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6} lg={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <p className={classes.cardCategory}>Værprognose</p>
              <h3 className={classes.cardTitle}>
                Forventet nedbør i Bodø neste 7 dager: 15 mm
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Værmelding skal hentes fra yr
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>paid</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Strømpris</p>
              <h3 className={classes.cardTitle}>{powerPrice} kr/MWh</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Pris for strøm akkuratt nå
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>savings</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Penger tjent</p>
              <h3 className={classes.cardTitle}>{moneyEarned} kr</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>arrow_right_alt</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Vanngjennomstrømming</p>
              <h3 className={classes.cardTitle}>{waterInflux} m<sup>3</sup>/s</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="danger">
                <Icon>report_problem</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Miljøkostnad</p>
              <h3 className={classes.cardTitle}>{environmentCost} kr</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Language />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Strøm produsert de sist 24 timene
              </h4>
            </CardHeader>
            <CardBody>
            <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={straightLinesChart.data}
                type="Line"
                options={straightLinesChart.options}
                listener={straightLinesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Straight Lines Chart</h4>
              <p className={classes.cardCategory}>Line Chart with Points</p>
            </CardBody>
          </Card>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
