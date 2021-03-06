// @material-ui/core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { historyDataTable } from "variables/general.js";

export default function HistoryPurchasePage() {
  const roundButtons = [{ color: "info" }].map((prop, key) => {
    return <Button color="rose">Update</Button>;
  });
  const data = historyDataTable.dataRows.map((prop, key) => {
    return {
      id: key,
      billNumber: prop[0],
      importer: prop[1],
      maker: prop[2],
      amount: prop[3],
      price: prop[4],
      date: prop[5],
      status: prop[6],
      action: prop[7] && roundButtons,
    };
  });

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          {/* <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Order History</h4>
          </CardHeader> */}
          <CardBody>
            <ReactTable
              data={data.map((item) => ({ ...item, roundButtons }))}
              filterable
              columns={[
                {
                  Header: "Bill Number",
                  accessor: "billNumber",
                },
                {
                  Header: "Importer",
                  accessor: "importer",
                },
                {
                  Header: "Maker",
                  accessor: "maker",
                },
                {
                  Header: "Amount",
                  accessor: "amount",
                },
                {
                  Header: "Price",
                  accessor: "price",
                },
                {
                  Header: "Date",
                  accessor: "date",
                },
                {
                  Header: "Status",
                  accessor: "status",
                },
                {
                  Header: "Action",
                  accessor: "action",
                },
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
