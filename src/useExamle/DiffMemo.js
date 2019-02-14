import React, { useEffect, useState, useMemo } from 'react'

const DiffMemo = ({ list }) => {
  const [count, setCount] = useState(0)

  // Memoized
  const sort = useMemo(
    () => {
      console.log('useMemo')
      return list.sort((a, b) => a - b)
    },
    [list] // 다음과 같이 list의 변화가 일어날 때만 렌더하고 변화가 없으면 기억된 내용을 이용
  )

  // 일반적으로 사용하게 되면 ReRender시에 무족건 작동합니다.
  const normalSort = list.sort((a, b) => a - b)

  useEffect(() => {
    console.log('re-render')
  })

  return (
    <div>
      <h1>useMemo Sort</h1>
      {sort.map((item, i) => (
        <li key={i}>{item}</li>
      ))}

      <h1>Normal Sort</h1>
      {normalSort.map((item, i) => (
        <li key={i}>{item}</li>
      ))}

      <button onClick={() => setCount(count + 1)}>Re Render</button>
    </div>
  )
}

export default DiffMemo
