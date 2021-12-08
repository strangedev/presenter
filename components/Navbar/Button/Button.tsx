import React, { ComponentType, FunctionComponent, ReactElement } from 'react';

interface ButtonContentProps {
  label: string;
}

type ButtonContent = ComponentType<ButtonContentProps>;

interface ButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  label: ButtonContentProps['label'];
  Component?: ButtonContent;
}

const DefaultButtonContent: FunctionComponent<ButtonContentProps> = function ({
  label,
}): ReactElement {
  return (
    <span>
      { label }
    </span>
  );
};

const Button: FunctionComponent<ButtonProps> = function ({
  onClick,
  isDisabled,
  Component,
  label,
}): ReactElement {
  const Content = Component ?? DefaultButtonContent;

  return (
    <button
      aria-label={ label }
      onClick={ onClick }
      disabled={ isDisabled ?? false }
      className="w-40 border-2 rounded border-black px-2"
    >
      <Content label={ label }/>
    </button>
  );
};

export {
  Button,
};