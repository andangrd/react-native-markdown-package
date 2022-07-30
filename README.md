[![npm downloads](https://img.shields.io/npm/dm/react-native-markdown-package)](https://www.npmjs.com/package/react-native-markdown-package) [![npm_downloads](https://img.shields.io/npm/dt/react-native-markdown-package)](https://www.npmjs.com/package/react-native-markdown-package)

# React Native Markdown Package
React Native Markdown Package is a library for implementing markdown syntax in React Native.

## Getting started

To install this library, you can easily run this command from your project folder.

    `npm i react-native-markdown-package --save`


Check this simple app for implementation example [Example app](https://github.com/andangrd/rn-markdown-example)

<img width="250" src="https://user-images.githubusercontent.com/26213148/66242033-d0d87480-e72a-11e9-9fda-231d2789513c.gif">

## How to use

What you need to do is `import` the `react-native-markdown-package` module and then use the
`<Markdown/>` tag.

How to use? 

Here we are, take a look at this simple implementation:

```javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Markdown from 'react-native-markdown-package';

const text = `
# This is Heading 1
## This is Heading 2
1. List1
2. List2
  This is a \`description\`  for List2 .\n
  * test
  * test
3. List3
4. List4.


You can also put some url as a link [like This](https://www.google.com) or write it as a plain text:
  https://www.google.com
  <mailme@gmail.com>

---

This text should be printed between horizontal rules

---

The following code is an example for codeblock:

    const a = function() {
      runSomeFunction()
    };

Below is some example to print blockquote

> Test block Quote
> Another  block Quote

this is _italic_ 
this is **strong**
Some *really* ~~basic~~ **Markdown**.


| # | Name   | Age 
|---|--------|-----|
| 1 | John   | 19  |
| 2 | Sally  | 18  |
| 3 | Stream | 20  |


this is an example for adding picture:

![Screen Shot 2019-10-05 at 3 19 33 AM](https://user-images.githubusercontent.com/26213148/66237659-d11f4280-e71f-11e9-91e3-7a3f08659d89.png)


`;

export default class App extends Component<{}> {
  render() {
    return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
      <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Markdown 
            styles={markdownStyle.collectiveMd} 
            onLink={(url) => Linking.openURL(url)}
          >
            { text } 
          </Markdown>
          <Markdown 
            styles={markdownStyle.singleLineMd}
          >
            this is a test single line md
          </Markdown>
      </View>
    </ScrollView>
    );
  }
}
const singleStyle = {
  text: {
    color: 'blue',
    textAlign: "right"
  },
  view: {
    alignSelf: 'stretch',
  }
};

const markdownStyle = {
  singleLineMd: {
    text: {
      color: 'blue',
      textAlign: "right"
    },
    view: {
      alignSelf: 'stretch',
    }
  },
  collectiveMd: {
    heading1: {
      color: 'red'
    },
    heading2: {
      color: 'green',
      textAlign: "right"
    },
    strong: {
      color: 'blue'
    },
    em: {
      color: 'cyan'
    },
    text: {
      color: 'black',
    },
    blockQuoteText: {
      color: 'grey'
    },
    blockQuoteSection: {
      flexDirection: 'row',
    },
    blockQuoteSectionBar: {
      width: 3,
      height: null,
      backgroundColor: '#DDDDDD',
      marginRight: 15,
    },
    codeBlock: {
      fontFamily: 'Courier',
      fontWeight: '500',
      backgroundColor: '#DDDDDD',
    },
    tableHeader: {
      backgroundColor: 'grey',
    },
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
    padding:20
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

```

## Properties

#### `styles`

Default style properties will be applied to the markdown. You could replace it with your preference by adding `styles` property like the example above.

#### `onLink`

This prop will accept a function. This is a callback function for any link inside markdown syntax, so you could costumize the handler for onClick event from the link.

`onLinkCallback` should be a function that returns a promise.


```

const onLinkCallback = (url) => {
  console.log('test test test');

  const isErrorResult = false;

  return new Promise((resolve, reject) => {
    isErrorResult ? reject() : resolve();
  });
};

...

<Markdown
  styles={markdownStyle.collectiveMd}
  onLink={onLinkCallback}>
  {text}
</Markdown>

...


```


*NOTE :* 
_Email link (mailto) could be tested on real device only, it won't be able to test on Simulator as discuss in this [StackOverflow](https://stackoverflow.com/questions/44769710/opneurl-react-native-linking-call-mailto)_

## Thanks To

thanks to all contributors who help me to make this libary better:

[![img](https://avatars1.githubusercontent.com/u/26213148?s=60&v=4)](https://github.com/andangrd/)
[![img](https://avatars0.githubusercontent.com/u/16436270?s=60&v=4)](https://github.com/deadcoder0904)
[![img](https://avatars1.githubusercontent.com/u/22953807?s=60&v=4)](https://github.com/andangr)
[![img](https://avatars0.githubusercontent.com/u/8979249?s=60&v=4)](https://github.com/ntcong91)

This project was actually forked from [lwansbrough](https://github.com/lwansbrough) , with some enhancements below :
 1. Styling method.
    
    Now you can easily add styling on each syntax, e.g. add different color either in `strong`, `header`, or another md syntax. All default styles in this package is also already moved to new file `styles.js`.
 2. Refactoring some codes to adopt ES6 style.
    
    Refactor index.js using ES6. :)
 3. Support `Sublist`.
    
    In the previous library, you couldn't add sublist. It was not supported. But now, this feature already added here. Please follow the instruction above... 
 4. Latest release: 

    * add Proptypes Support, (1.0.1)

    * Fix deprecated View.proptypes and update Readme (1.0.3)
    
    * Upgrade dependency, lodash, avoid vulnerabilities (1.1.0)

    * Fix performance issue, import only necessarry function from lodash (1.1.1)

    * Finalize Blockquote feature (1.2.0)

    * Update Docs (1.2.1)

    * Allow user to include plain text from variable using back tick (1.3.3)

    * New feature, codeblock (1.4.0)
    
    * New feature, on link handler (1.4.3)
    
    * Bug fix, Strike through issue (1.4.4)

    * Default Style for outer View, remove deprecated ComponentWillMount (1.5.0)
    
    * Allow user to replace default rules, update default font family for `codeBlock` on android [(v1.6.0)](https://github.com/andangrd/react-native-markdown-package/releases/tag/v1.6.0)

    * Update to use latest simple-markdown [(v1.7.0)](https://github.com/andangrd/react-native-markdown-package/releases/tag/v1.7.0)

    * Update to use latest simple-markdown [(v1.8.0)](https://github.com/andangrd/react-native-markdown-package/releases/tag/v1.8.0)
    
    * Remove deprecated `prop-types` from list of dependencies [(v1.8.2)](https://github.com/andangrd/react-native-markdown-package/releases/tag/v1.8.2)

