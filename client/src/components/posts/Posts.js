import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Spinner from '../common/Spinner';
import PostForm from './PostForm';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);