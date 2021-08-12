import React, { useEffect, useState } from "react";
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
import AdjustIcon from '@material-ui/icons/Adjust';

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
import { card } from "assets/jss/material-dashboard-pro-react";

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

  const [waterLevel,setWaterLevel] = useState(0)
  const [price,setPrice] = useState(0)
  const [waterInflux,setWaterInflux] = useState(0)
  const [dangerWarning, setDangerMessage] = useState(null)
  const [dangerColor, setDangerColor] = useState("disabled")

  const classes = useStyles();

  const headers = {
    "GroupId": "Gruppe 16",
    "GroupKey": "iIw0LHgoTE6K/blLE5fv3g=="
  }

  const [turbines,setTurbines] = useState([])
  useEffect(() => {
    fetch("https://innafjord.azurewebsites.net/api/Turbines",{headers: headers})
    .then((res) => {
      return res.json()
    })
    .then((data) => {

      setTurbines(data.map((value) => {
        return [value.capacityUsage]
      }))
    })
  },[])



  let Data = [
    [
      "Turbin-Nr",
      "Status",
      "Produksjon",
    ],
  ]
  
  let statusTotal = 0


  for(let i = 0; i < turbines.length; i++){
    Data.push([
      (i+1).toString(),
       `${(turbines[i]*100).toFixed(2)}%`,
      `${(turbines[i]*19.25).toFixed(2)} kWh/s`,
    ])

    statusTotal += parseFloat(turbines[i])
  }

  if(turbines.length > 0){

    Data.push([
      "Total",
      `${((statusTotal/turbines.length)*100).toFixed(2)}%`,
      `${(statusTotal*19.25).toFixed(2)} kWh/s`,
    ])
  }

  function getWaterInflux(){
    fetch("https://innafjord.azurewebsites.net/api/WaterInflux", {headers: headers})
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      setWaterInflux(data.toFixed(2))
    })
  }

  function getPrice(){
    fetch("https://innafjord.azurewebsites.net/api/PowerPrice", {headers: headers})
    .then((res) => {
      return res.json()
    })
    .then((data) =>{
      setPrice(data.toFixed(2))
    })
  }


  function getWaterLevel(){
    fetch("https://innafjord.azurewebsites.net/api/GroupState", {headers: headers})
    .then((res) => {
      return res.json()
    })
    .then((data) =>{
      let waterData = Math.round(data.waterLevel)
      if (waterLevel > 40){
        setDangerMessage("Alt for mye vann")
        setDangerColor("error")
      }
      else if  (waterLevel > 35){
        setDangerMessage("Høyt vannivå")
        setDangerColor("disabled")
      }
      else if (waterLevel > 30){
        setDangerMessage("Alt er bra")
        setDangerColor("disabled")
      }
      else if (waterLevel > 25){
        setDangerMessage("Lavt vannivå")
        setDangerColor("disabled")
      } else {
        setDangerMessage("Alt for lite vann")
        setDangerColor("error")
      }

      setWaterLevel(waterData)
    })
  }



  useEffect(() =>{
    getWaterLevel()
    getPrice()
    getWaterInflux()
  })
  

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
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
                  <Warning color = {dangerColor}/>
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  {dangerWarning}                </a>

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>paid</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Strømpris</p>
              <h3 className={classes.cardTitle}>{price} kr/MWh</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="info">
                <Icon>arrow_right_alt</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Vanngjennomstrømming</p>
              <h3 className={classes.cardTitle}>{waterInflux} m<sup>3</sup>/s</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>

    <Card>
      <CardHeader>
      <CardIcon color="info" icon>
                <AdjustIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Turbinstatus
              </h4>
      </CardHeader>
    <CardBody>
      <GridContainer color = "red">
      <GridItem xs={12} sm={12} md={12}>
        <Table
                    tableData={Data}
                  />
        </GridItem>
      </GridContainer>
      </CardBody>             
      </Card>

      
    </div>
  );
}
