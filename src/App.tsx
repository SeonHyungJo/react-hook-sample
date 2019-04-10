import React from 'react'
import UseHook from './components/useHook/useHook'
import useHover from './components/useHover/useHover'
import useLocalStorage from './components/useLocalStorage/useLocalStorage'

const App = (): React.ReactElement => {
  const element = (hovered: boolean): React.ReactElement =>
    <div>
      여기에 올리면 {hovered && '나가주세요!!!!'}
    </div>;

  const [hoverable, hovered] = useHover(element);
  const [name, setName] = useLocalStorage('name', 'sseon');
  
  return (
    <div>
      <div>
        <span>UseHook</span>
        <UseHook/>
      </div>
      <div>
        <span>useHover</span>
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
    </div>
  )
}

export default App
