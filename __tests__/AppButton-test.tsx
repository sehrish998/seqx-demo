
import 'react-native';
import React from 'react';
import {AppButton} from '../src/Components/AppButton';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<AppButton  text={"Hi"} testID={"btn-hi"} />);
});
