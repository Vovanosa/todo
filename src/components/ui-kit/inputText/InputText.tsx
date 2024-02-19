import { FunctionComponent } from 'react';
import styles from './InputText.module.scss';

interface InputTextProps {
  autoFocus: boolean;
  inputText: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputText: FunctionComponent<InputTextProps> = (props) => {
  const { autoFocus, inputText, id, value, onChange, onKeyDown } = props;

  return (
    <input
      autoFocus={autoFocus}
      style={styles}
      type='text'
      id={id}
      placeholder={inputText}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></input>
  );
};

export default InputText;
