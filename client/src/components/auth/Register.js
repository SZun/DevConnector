import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const textFieldProps = [
      {
        name: 'name',
        type: 'text',
        value: this.state.name,
        error: errors.name,
        placeholder: 'Name'
      },
      {
        name: 'email',
        type: 'email',
        value: this.state.email,
        error: errors.email,
        placeholder: 'Email Address',
        info: `This site uses Gravatar so if you want a profile image, use
        a Gravatar email`
      },
      {
        name: 'password',
        type: 'password',
        value: this.state.password,
        error: errors.password,
        placeholder: 'Password'
      },
      {
        name: 'password2',
        type: 'password',
        value: this.state.password2,
        error: errors.password2,
        placeholder: 'Confirm Password'
      }
    ];

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                {textFieldProps.map(inpt => (
                  <TextFieldGroup
                    placeholder={inpt.placeholder}
                    name={inpt.name}
                    type={inpt.type}
                    value={inpt.value}
                    onChange={this.onChange}
                    error={inpt.error}
                    info={inpt.info}
                  />
                ))}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
