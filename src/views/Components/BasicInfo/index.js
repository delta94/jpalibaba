import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { FInput } from "components/Form/FInput";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import {
  required,
  getFormStateField,
  fieldStateSuffix,
  fieldValidatorSuffix,
  FieldValidateStatus,
  convertStateFieldToValidatorField,
} from "helpers";

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
  actionButton: {
    float: "right",
  },
};

class UserBasicInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      ["companyName" + fieldStateSuffix]: FieldValidateStatus.Success,
      ["companyName" + fieldValidatorSuffix]: [required],
      representativeName: "",
      ["representativeName" + fieldStateSuffix]: FieldValidateStatus.Success,
      ["representativeName" + fieldValidatorSuffix]: [required],
      enterpriseNumber: "",
      ["enterpriseNumber" + fieldStateSuffix]: FieldValidateStatus.Success,
      ["enterpriseNumber" + fieldValidatorSuffix]: [required],
      contactPerson: "",
      ["contactPerson" + fieldStateSuffix]: FieldValidateStatus.Success,
      ["contactPerson" + fieldValidatorSuffix]: [required],
      contactEmail: "",
      ["contactEmail" + fieldStateSuffix]: FieldValidateStatus.Success,
      ["contactEmail" + fieldValidatorSuffix]: [required],
      contactTel: "",
      ["contactTel" + fieldStateSuffix]: FieldValidateStatus.Success,
      ["contactTel" + fieldValidatorSuffix]: [required],
      aboutMe: "",
      ["aboutMe" + fieldStateSuffix]: FieldValidateStatus.Undefined,
    };
  }

  componentDidMount() {
    const data = {
      companyName: "A",
      representativeName: "B",
      enterpriseNumber: "C",
      contactPerson: "D",
      contactEmail: "E",
      contactTel: "F",
      aboutMe: "Hello World",
    };

    for (let key in data) {
      console.log(key);
      this.setState({ [key]: data[key] });
    }
  }

  fileChange = (value, stateName) => {
    this.setState({ [stateName]: value.target.files[0] });
  };

  change = (value, stateName) => {
    const validatorField = stateName + fieldValidatorSuffix;
    const validators = this.state[validatorField];
    if (validators) {
      const validateValue = validators.reduce((result, fn) => {
        if (typeof fn === "function") {
          return result && fn(value);
        }
        return result && fn[0](this.state[fn[1]])(value);
      }, true);
      if (validateValue) {
        this.setState({
          [stateName + fieldStateSuffix]: FieldValidateStatus.Success,
        });
      } else {
        this.setState({
          [stateName + fieldStateSuffix]: FieldValidateStatus.Fail,
        });
      }
    } else {
      this.setState({
        companyStreet2FState: FieldValidateStatus.Success,
      });
    }
    this.setState({ [stateName]: value });
  };

  isValidated = () => {
    let flag = true;

    const validatingStateFields = getFormStateField(this.state);
    for (const index in validatingStateFields) {
      const obj = validatingStateFields[index];
      const value = Object.values(obj)[0];
      const key = Object.keys(obj)[0];
      const validatorField = convertStateFieldToValidatorField(key);
      const validators = this.state[validatorField];
      if (value !== FieldValidateStatus.Success && validators) {
        this.setState({ [key]: FieldValidateStatus.Fail });
        flag = false;
      }
    }
    return flag;
  };

  update = () => {
    if (this.isValidated()) {
      this.props.onUpdate("a", this.state);
    }
  };

  render() {
    const { classes, title } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12}>
          <h3>{title}</h3>
        </GridItem>
        <GridItem xs={12}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              acceptedTerms: false, // added for our checkbox
              jobType: "", // added for our select
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              acceptedTerms: Yup.boolean()
                .required("Required")
                .oneOf([true], "You must accept the terms and conditions."),
              jobType: Yup.string()
                .oneOf(
                  ["designer", "development", "product", "other"],
                  "Invalid Job Type"
                )
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <FInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Jane"
              />
              <FInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
              />
              <FInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            // success={
            //   this.state.companyNameFState === FieldValidateStatus.Success
            // }
            error={this.state.companyNameFState === FieldValidateStatus.Fail}
            labelText={
              <span>
                Company Name <small>(required)</small>
              </span>
            }
            id="companyName"
            formControlProps={{
              fullWidth: true,
              disabled: true,
            }}
            inputProps={{
              onChange: (event) =>
                this.change(event.target.value, "companyName"),
              value: this.state.companyName,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            // success={
            //   this.state.representativeNameFState ===
            //   FieldValidateStatus.Success
            // }
            error={
              this.state.representativeNameFState === FieldValidateStatus.Fail
            }
            labelText={
              <span>
                Name of Representative Name <small>(required)</small>
              </span>
            }
            id="representativeName"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) =>
                this.change(event.target.value, "representativeName"),
              value: this.state.representativeName,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            // success={
            //   this.state.enterpriseNumberFState === FieldValidateStatus.Success
            // }
            error={
              this.state.enterpriseNumberFState === FieldValidateStatus.Fail
            }
            labelText={
              <span>
                Enterprise Number <small>(required)</small>
              </span>
            }
            id="enterpriseNumber"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) =>
                this.change(event.target.value, "enterpriseNumber"),
              value: this.state.enterpriseNumber,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            // success={
            //   this.state.contactPersonFState === FieldValidateStatus.Success
            // }
            error={this.state.contactPersonFState === FieldValidateStatus.Fail}
            labelText={
              <span>
                Contact Person<small>(required)</small>
              </span>
            }
            id="contactPerson"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) =>
                this.change(event.target.value, "contactPerson"),
              value: this.state.contactPerson,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            // success={
            //   this.state.contactEmailFState === FieldValidateStatus.Success
            // }
            error={this.state.contactEmailFState === FieldValidateStatus.Fail}
            labelText={
              <span>
                Contact Email<small>(required)</small>
              </span>
            }
            id="contactEmail"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) =>
                this.change(event.target.value, "contactEmail"),
              value: this.state.contactEmail,
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CustomInput
            // success={
            //   this.state.contactTelFState === FieldValidateStatus.Success
            // }
            error={this.state.contactTelFState === FieldValidateStatus.Fail}
            labelText={
              <span>
                Contact Tel<small>(required)</small>
              </span>
            }
            id="contactTel"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) =>
                this.change(event.target.value, "contactTel"),
              value: this.state.contactTel,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="About me."
            id="about-me"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: this.state.aboutMe,
              multiline: true,
              rows: 5,
              onChange: (event) => this.change(event.target.value, "aboutMe"),
            }}
          />
        </GridItem>
        <GridItem xs={12} md={12}>
          <Button
            color="rose"
            className={classes.actionButton}
            onClick={this.update}
          >
            Update
          </Button>
        </GridItem>
      </GridContainer>
    );
  }
}

UserBasicInfo.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(UserBasicInfo);
