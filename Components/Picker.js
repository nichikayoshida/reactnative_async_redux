import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'react-native';

const CustomPicker = ({ value, onChange, options }) => (
  <Picker
    style={{
      height: 200,
      width: 200,
    }}
    selectedValue={value}
    onValueChange={itemValue => onChange(itemValue)}
  >
    {options.map(option => <Picker.Item key={option} label={option} value={option} />)}
  </Picker>
);

CustomPicker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomPicker;
