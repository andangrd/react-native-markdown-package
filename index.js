import React, { Component } from 'react';
import { View } from 'react-native';
import { merge, isEqual, isArray } from 'lodash';
import PropTypes from 'prop-types';
import SimpleMarkdown from 'simple-markdown';
import styles from './styles';

class Markdown extends Component {
  componentWillMount() {
    if (this.props.enableLightBox && !this.props.navigator) {
      throw new Error('props.navigator must be specified when enabling lightbox');
    }

    const opts = {
      enableLightBox: this.props.enableLightBox,
      navigator: this.props.navigator,
      imageParam: this.props.imageParam,
      onLink: this.props.onLink,
      bgImage: this.props.bgImage,
      onImageOpen: this.props.onImageOpen,
      onImageClose: this.props.onImageClose,
    };

    const mergedStyles = merge({}, styles, this.props.styles);
    var rules = require('./rules')(mergedStyles, opts);
    rules = merge({}, SimpleMarkdown.defaultRules, rules);

    const parser = SimpleMarkdown.parserFor(rules);
    this.parse = function(source) {
      const blockSource = source + '\n\n';
      return parser(blockSource, {inline: false});
    };
    this.renderer = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'));
  }

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps.children, this.props.children);
  }

  render() {
    const child = isArray(this.props.children) 
                ? this.props.children.join('') 
                : this.props.children;

    const tree = this.parse(child);

    return <View style={[styles.view, this.props.styles.view]}>{ this.renderer(tree) }</View>
  }
}

Markdown.propTypes = {
  enableLightBox: PropTypes.bool,
  onLink: PropTypes.func,
  onImageOpen: PropTypes.func,
  onImageClose: PropTypes.func,
  onLoad: PropTypes.func,
  styles: PropTypes.shape({
    view: View.propTypes.style,
  }),
};

Markdown.defaultProps = {
  styles: styles
}

export default Markdown;
