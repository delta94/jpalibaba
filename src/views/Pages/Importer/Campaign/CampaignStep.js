import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import { FInput } from "components/Form/FInput";
import withStyles from "@material-ui/core/styles/withStyles";
import { FDatePicker } from "components/Form/FDatePicker";
import moment from "moment";
import { FSelect } from "components/Form/FSelect";
import { agencyOptions } from "constant";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  inputAdornment: {
    position: "relative",
  },
};

class CampaignStep extends React.Component {
  constructor(props) {
    super(props);
    this.formik = React.createRef();
  }
  sendState() {
    return this.formik.values;
  }

  isValidated = async () => {
    this.formik.submitForm();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    if (this.formik.isValid) {
      return true;
    }
    return false;
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Campaign Information</h4>
        </GridItem>
        <GridItem xs={12} sm={8}>
          <Formik
            innerRef={(formik) => (this.formik = formik)}
            initialValues={{
              minimumOrderlot: "",
              minimumImport: "",
              startDate: "",
              endDate: "",
              pricePolicy: [],
            }}
            validationSchema={Yup.object({
              minimumOrderlot: Yup.number().required("Required"),
              minimumImport: Yup.number().required("Required"),
              startDate: Yup.string().required(),
              endDate: Yup.string().required(),
              pricePolicy: Yup.array().of(
                Yup.object().shape({
                  retailerId: Yup.string().required(),
                  price: Yup.string().required(),
                })
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                // updateAgencyInfo(convertAllToString(values));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <FInput
                    label="Minimum individual order lot"
                    name="minimumOrderlot"
                    type="text"
                    placeholder=""
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <FInput
                    label="Minimum order to import"
                    name="minimumImport"
                    type="text"
                    placeholder=""
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <FDatePicker
                    label="Start Date"
                    name="startDate"
                    isValidDate={(date) => {
                      if (this.formik.values && this.formik.values.endDate)
                        return (
                          date.isSameOrAfter(moment(), "day") &&
                          date.isSameOrBefore(this.formik.values.endDate, "day")
                        );
                      return date.isSameOrAfter(moment(), "day");
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <FDatePicker
                    label="End Date"
                    name="endDate"
                    isValidDate={(date) => {
                      if (this.formik.values && this.formik.values.startDate)
                        return (
                          date.isSameOrAfter(moment(), "day") &&
                          date.isSameOrAfter(
                            this.formik.values.startDate,
                            "day"
                          )
                        );
                      return date.isSameOrAfter(moment(), "day");
                    }}
                  />
                </GridItem>
              </GridContainer>
              <FieldArray
                name="pricePolicy"
                render={(arrayHelpers) => (
                  <div>
                    {this.formik.values &&
                      this.formik.values.pricePolicy.map((friend, index) => (
                        <GridContainer key={index}>
                          <GridItem xs={12} sm={5} md={5}>
                            <FSelect
                              options={agencyOptions}
                              label="Retailer"
                              name={`pricePolicy.${index}.retailerId`}
                              type="text"
                              placeholder=""
                            />
                          </GridItem>
                          <GridItem xs={8} sm={4} md={4}>
                            <FInput
                              label="Price"
                              name={`pricePolicy.${index}.price`}
                              type="text"
                              placeholder=""
                            />
                          </GridItem>

                          <GridItem xs={4} sm={3} md={3}>
                            <Button
                              color="rose"
                              onClick={() => {
                                console.log(index);
                                arrayHelpers.remove(index);
                              }}
                              type="button"
                            >
                              Remove
                            </Button>
                          </GridItem>
                        </GridContainer>
                      ))}

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button
                          color="primary"
                          onClick={() =>
                            arrayHelpers.push({
                              retailerId: "",
                              price: "",
                            })
                          }
                          type="button"
                        >
                          Add new Price Policy
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </div>
                )}
              />
            </Form>
          </Formik>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(CampaignStep);
