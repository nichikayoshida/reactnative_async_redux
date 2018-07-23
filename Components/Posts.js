import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text } from 'react-native';

export default class Posts extends Component {
  renderItem = ({ item }) => (
    <Text>
      {item}
    </Text>
  );

  render() {
    const { posts } = this.props;
    return (
      <FlatList
        data={posts.map(post => post.title)}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
