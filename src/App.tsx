import React from 'react'
import UseHook from './components/useHook/useHook'
import useHover from './components/useHover/useHover'
import useLocalStorage from './components/useLocalStorage/useLocalStorage'
import useDebounce from './components/useDebounce/useDebounce'


const App = (): React.ReactElement => {
  const element = (hovered: boolean): React.ReactElement =>
    <div>
      여기에 올리면 {hovered && '나가주세요!!!!'}
    </div>;

  const [hoverable, hovered] = useHover(element);
  const [name, setName] = useLocalStorage('name', 'sseon');

  const [state, setState] = React.useState('정지 상태');
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  useDebounce(
    () => {
      setState('정지 상태');
      setDebouncedValue(val);
    },
    1000,
    [val]
  );
  
  return (
    <div>
      <div>
        <span>UseHook</span>
        <UseHook/>
      </div>
      <div>
       
        {hoverable}
        {hovered ? '올려졌다~~' : '내려갔다~~'}
      </div>
      <div>
        <span>useLocalStorage</span>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e): Function => setName(e.target.value)}
        />
      </div>

      <div>
        <span>useDebounce</span>
        <input
          type="text"
          value={val}
          placeholder="Debounce 테스트하기"
          onChange={({ currentTarget }) => {
            setState('입력중입니다.');
            setVal(currentTarget.value);
          }}
        />
        <div>{state}</div>
        <div>Debounced value: {debouncedValue}</div>
      </div>
    </div>
  )
}

export default App
