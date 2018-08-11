import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state;

    const eduData = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    this.props.addEducation(eduData, this.props.history);
  }

  onCheck(e) {
    const { current, disabled } = this.state;
    this.setState({
      current: !current,
      disabled: !disabled
    });
  }

  render() {
    const { errors } = this.state;

    const textFieldGroupValues = [
      {
        placeholder: '* School',
        name: 'school',
        value: this.state.school,
        error: errors.school
      },
      {
        placeholder: '* Degree or Certification',
        name: 'degree',
        value: this.state.degree,
        error: errors.degree
      },
      {
        placeholder: '* Feild of Study',
        name: 'fieldofstudy',
        value: this.state.fieldofstudy,
        error: errors.fieldofstudy
      }
    ];

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                {textFieldGroupValues.map(inpt => (
                  <TextFieldGroup
                    placeholder={inpt.placeholder}
                    name={inpt.name}
                    value={inpt.value}
                    onChange={this.onChange}
                    error={inpt.error}
                    key={inpt.name}
                  />
                ))}
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
