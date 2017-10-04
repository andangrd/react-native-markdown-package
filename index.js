import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
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

    const mergedStyles = _.merge({}, styles, this.props.styles);
    var rules = require('./rules')(mergedStyles, opts);
    rules = _.merge({}, SimpleMarkdown.defaultRules, rules);

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
    return !_.isEqual(nextProps.children, this.props.children);
  }

  render() {
    const child = _.isArray(this.props.children) 
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
