import React, { useEffect, useState, useMemo, useCallback, useLayoutEffect } from 'react'
import { UseHookProps } from '../../declerations/useHook';

const useHook = (props: UseHookProps): React.ReactElement => {
  const [count, setCount] = useState(0)
  // 일반적으로 사용하게 되면 ReRender시에 무족건 작동합니다.
  const normalSort = props.list.sort((a: number, b: number): number => a - b)

  // useCallback과 useMemo와 비슷한 듯 비슷하지 않음
  // useCallback과 useMemo의 순서를 굳이 따지자면 소스를 적는 순서이다.
  useCallback(
    console.log('useHook useCallback'),
    [count]
  )

  // Memoized
  // useCallback과 useMemo와 비슷하게 흘러감 & 최적화에 사용이 될 듯함
  const sort = useMemo(
    (): number[]=> {
      console.log('useHook useMemo')
      return props.list.sort((a: number, b: number): number => a - b)
    },
    [count] // 다음과 같이 list의 변화가 일어날 때만 렌더하고 변화가 없으면 기억된 내용을 이용
  )

  // Redering은 되었고 paint, flow가 되지 않은 상태
  useLayoutEffect(
    (): void => {
      console.log('useHook useLayoutEffect');
    },
    [count]
  )

  // paint, flow가 된 상태
  useEffect((): void => {
    console.log('useHook useEffect'),
    [count]
  })

  return (
    <div>
      <h1>useMemo Sort</h1>
      {sort.map((item: number, i: number): React.ReactElement => (
        <li key={i}>{item}</li>
      ))}

      <h1>Normal Sort</h1>
      {normalSort.map((item: number, i: number): React.ReactElement => (
        <li key={i}>{item}</li>
      ))}

      <button onClick={(): void => setCount(count + 1)}>Re Render</button>
    </div>
  )
}

useHook.defaultProps = {
  list: [2, 434, 34, 24, 643, 123],
};

export default useHook
