'use strict';

require('babel-polyfill');
require('core-js/fn/object/assign');

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

// Add support for all files in the test directory
const testsContext = require.context('../src/components', true, /(spec\.js$)|(Helper\.js$)/);
testsContext.keys().forEach(testsContext);
