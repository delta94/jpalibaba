import Cached from "@material-ui/icons/Cached";
import Button from "components/CustomButtons/Button.js";
import { forwardTo } from "helpers";
import { hideModal, ModalType } from "provider/actions/modal";
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { appUrl } from "routing";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

class SharingModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    document.documentElement.style.overflow = "scroll";
    document.body.scroll = "yes";
  }

  renderTitle() {
    const { type } = this.props;
    switch (type) {
      case ModalType.Success:
      case ModalType.SignupSuccess: {
        return <div>Success</div>;
      }
      case ModalType.Confirm:
      case ModalType.CreateItem: {
        return <div>Confirm</div>;
      }
      case ModalType.Loading: {
        return <div>Loading</div>;
      }
      default:
        return <div>Error</div>;
    }
  }

  closeClick = () => {
    const { type, action, hideModal } = this.props;

    if (type !== ModalType.Confirm && action) {
      action();
    }
    hideModal();
  };

  renderActions = () => {
    const { type, action, hideModal } = this.props;
    switch (type) {
      case ModalType.Confirm: {
        return (
          <>
            <Button color="rose" onClick={action}>
              Confirm
            </Button>
            <Button color="" onClick={this.closeClick}>
              Cancel
            </Button>
          </>
        );
      }
      case ModalType.CreateItem: {
        return (
          <>
            <Button
              color="rose"
              onClick={() => {
                action();
                hideModal();
              }}
            >
              Yes
            </Button>
            <Button
              color=""
              onClick={() => {
                forwardTo(`/admin${appUrl.createProductPage}`);
                hideModal();
              }}
            >
              No
            </Button>
          </>
        );
      }

      default:
        return (
          <>
            <Button color="rose" onClick={this.closeClick}>
              Close
            </Button>
          </>
        );
    }
  };

  renderContent = () => {
    const { type, text } = this.props;
    switch (type) {
      case ModalType.SignupSuccess: {
        return (
          <>
            <p>
              Your registration is almost done. We have sent an email with a
              confirmation link to your email address. In order to proceed the
              sign-up process, please click the confirmation link.
            </p>
            <p>
              If you do not receive a confirmation email, please check your spam
              folder or make sure if you entered correct email address.{" "}
            </p>
            <p>
              After your registration, please wait Admin to verify your
              information and accept your registration.
            </p>
          </>
        );
      }
      case ModalType.Loading: {
        return (
          <>
            <Cached className="loading" color="action"></Cached>
          </>
        );
      }
      default:
        return <>{text}</>;
    }
  };

  render() {
    return ReactDOM.createPortal(
      <div className="overlay">
        <div className="modal-container">
          <div className="modal-header">{this.renderTitle()}</div>
          <div className="modal-content">{this.renderContent()}</div>
          <div className="modal-action">{this.renderActions()}</div>
        </div>
      </div>,
      this.el
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.modal.isOpen,
  text: state.modal.text,
  type: state.modal.type,
  action: state.modal.action,
});

export default connect(
  mapStateToProps,
  { hideModal }
)(SharingModal);
