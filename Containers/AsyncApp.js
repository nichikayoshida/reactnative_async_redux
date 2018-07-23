import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions';
import CustomPicker from '../Components/Picker';
import Posts from '../Components/Posts';

class AsyncApp extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    lastUpdated: 0,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, selectedSubreddit } = this.props;
    if (selectedSubreddit !== prevProps.selectedSubreddit) {
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    const { dispatch } = this.props;
    dispatch(selectSubreddit(nextSubreddit));
    dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const {
      selectedSubreddit, posts, isFetching, lastUpdated,
    } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <CustomPicker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <View style={{ backgroundColor: 'blue' }}>
          {lastUpdated === true && (
            <Text>
              Last updated at
              {new Date(lastUpdated).toLocaleTimeString()}
              .
              {' '}
            </Text>
          )}
          {isFetching !== true && <Button onPress={this.handleRefreshClick} title="Refresh" />}
        </View>
        {isFetching === true && posts.length === 0 && (
        <Text>
Loading...
        </Text>
        )}
        {isFetching !== true && posts.length === 0 && (
        <Text>
Empty.
        </Text>
        )}
        {posts.length > 0 && (
          <View style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(AsyncApp);
