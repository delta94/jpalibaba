import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import { historyDataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

export default function HistoryPurchasePage() {
  const [data, setData] = React.useState(
    historyDataTable.dataRows.map((prop, key) => {
      console.log(prop);
      return {
        id: key,
        billNumber: prop[0],
        importer: prop[1],
        maker: prop[2],
        amount: prop[3],
        price: prop[4],
        date: prop[5]
      };
    })
  );
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Order History</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={data}
              filterable
              columns={[
                {
                  Header: "Bill Number",
                  accessor: "billNumber"
                },
                {
                  Header: "Importer/Distributor",
                  accessor: "importer"
                },
                {
                  Header: "Maker",
                  accessor: "maker"
                },
                {
                  Header: "Amount",
                  accessor: "amount"
                },
                {
                  Header: "Price",
                  accessor: "price"
                },
                {
                  Header: "Date",
                  accessor: "date"
                }
              ]}
              defaultPageSize={10}
              //   showPaginationTop
              //   showPaginationBottom={false}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
