import React from 'react'
import UseHook from './components/useHook/useHook'
import useHover from './components/useHover/useHover'

const App = (): React.ReactElement => {
  const element = (hovered: boolean): React.ReactElement =>
    <div>
      여기에 올리면 {hovered && '나가주세요!!!!'}
    </div>;
  const [hoverable, hovered] = useHover(element);
  
  return (
    <div>
      <UseHook/>
      <>
        {hoverable}
        <>{hovered ? '올려졌다~~' : '내려갔다~~'}</>
      </>
    </div>
  )
}

export default App
