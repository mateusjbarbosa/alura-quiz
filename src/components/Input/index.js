import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 25px;
`;

function Input({
  name, placeholder, value, onChange,
}) {
  return (
    <div>
      <InputBase name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Input;
