import React from 'react';
import styled from 'styled-components';

interface IButtonProps extends React.Props<any> {
  color?: any;
  disabled?: any;
  htmlFor?: string;
  label?: string;
  onClick?: any;
}

const Button = styled.button<IButtonProps>`
  align-items: center;
  background-color: ${(props) => (props.disabled ? 'grey' : props.color ? props.color : '#5eb95e')};
  border-radius: 4px;
  color: white;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  color: white;
  font-size: 100%;
  line-height: normal;
  padding: 0.5em 1em;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  zoom: 1;
`;

function _Button({ children, color, disabled, htmlFor, label, onClick }: IButtonProps) {
  return (
    <Button
      color={color}
      disabled={disabled}
      htmlFor={htmlFor}
      onClick={!disabled ? onClick : null}
    >
      {label || children}
    </Button>
  );
}

export default _Button;
