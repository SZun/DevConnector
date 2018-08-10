import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaGroupField from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      status: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    // Values for the social media inputs
    const socialMediaValues = [
      {
        placeholder: 'Twitter Profile URL',
        name: 'twitter',
        icon: 'fab fa-twitter',
        value: this.state.twitter,
        error: errors.twitter
      },
      {
        placeholder: 'Facebook Profile URL',
        name: 'facebook',
        icon: 'fab fa-facebook',
        value: this.state.facebook,
        error: errors.facebook
      },
      {
        placeholder: 'Linkedin Profile URL',
        name: 'linkedin',
        icon: 'fab fa-linkedin',
        value: this.state.linkedin,
        error: errors.linkedin
      },
      {
        placeholder: 'Youtube Profile URL',
        name: 'youtube',
        icon: 'fab fa-youtube',
        value: this.state.youtube,
        error: errors.youtube
      },
      {
        placeholder: 'Instagram Profile URL',
        name: 'instagram',
        icon: 'fab fa-instagram',
        value: this.state.instagram,
        error: errors.instagram
      }
    ];

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          {socialMediaValues.map(soc => (
            <InputGroup
              placeholder={soc.placeholder}
              name={soc.name}
              icon={soc.icon}
              value={soc.value}
              onChange={this.onChange}
              error={soc.error}
              key={soc.name}
            />
          ))}
        </div>
      );
    }

    // Select options fot status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learner', value: 'Student or Learner' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    // Values for the TextFieldGroup Component Values
    const textFieldGroupContent = [
      {
        placeholder: 'Company',
        name: 'company',
        value: this.state.company,
        error: errors.company,
        info: `Could be your own company or one you work for`
      },
      {
        placeholder: 'Website',
        name: 'website',
        value: this.state.website,
        error: errors.website,
        info: `Could be your own website or business site`
      },
      {
        placeholder: 'Location',
        name: 'location',
        value: this.state.location,
        error: errors.location,
        info: `City or city & state suggested (eg. Chicago, IL)`
      },
      {
        placeholder: 'Skills',
        name: 'skills',
        value: this.state.skills,
        error: errors.skills,
        info: `Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)`
      },
      {
        placeholder: 'Github Username',
        name: 'githubusername',
        value: this.state.githubusername,
        error: errors.githubusername,
        info: `If you want your latest repos and Github link, include your username`
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname etc (This CAN'T be changed later)."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                {textFieldGroupContent.map(inpt => (
                  <TextFieldGroup
                    placeholder={inpt.placeholder}
                    name={inpt.name}
                    type={inpt.type}
                    value={inpt.value}
                    onChange={this.onChange}
                    error={inpt.error}
                    info={inpt.info}
                    key={inpt.name}
                  />
                ))}
                <TextAreaGroupField
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                    className="btn btn-light"
                  >
                    Add Social Media Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                <div>
                  {socialInputs}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
