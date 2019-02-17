# react-hook-sample

## Contents

- [x] [useState](#1.-useState)
- [x] [useEffect](#2.-useEffect)
- [x] [useContext](#3.-useContext)
- [x] [useReducer](#4.-useReducer)
- [x] [useCallback](#5.-useCallback)
- [x] [useMemo](#6.-useMemo)
- [x] [useRef](#7.-useRef)
- [x] [useImperativeHandle](#8.-useImperativeHandle)
- [x] [useLayoutEffect](#9.-useLayoutEffect)
- [x] [useDebugValue](#10.-useDebugValue)


## Basic Hooks

### **1. useState**

```js
const [state, setState] = useState(initialState);
```

첫번째 인자로 **초기값** 을 넣어준다. `useState` 는 우리가 많이 사용하던 `state` 초기화 작업과 동일하다고 생각하면 쉽다. 생성시 우리는 배열을 받아 올 수 있다.

**모든 Hook은 2개의 인자를 배열로 받아온다.(드물게 아닌 것도 있다.)**

배열의 첫번째는 우리가 넘겨주었던 초기화 값이 들어오고 이후에는 변경된 값이 넘어오게 된다. 두번째는 값를 변경하는 함수다.

**re-render가 될 경우 useState에 의해 반환된 첫 번째 값은 항상 업데이트를 적용한 후 가장 최근 상태가 된다.**

<br/>

#### 1.1 Functional updates

역시나 우리는 인자로 함수를 보낼수 있다. 그러나 기존에 우리가 사용하던 `setState` 메소드와는 달라서 자동으로 병합을 시켜주지 않는다. 

**즉 우리가 만들때 마다 필요에 따라 병합을 해줘야한다.**

```js
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues}; // 간단하게 spread를 사용해서 새로 생성
});
```

<br/>

#### 1.2 Lazy initial state

`initial state` 에 역시 함수를 사용할 수 있다. 리액트 사이트에서 표현으로는 **값 비싼 계산** 이라면 함수를 사용해서 표현하라고 한다.

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

<br/>

#### 1.3 Bailing out of a state update

같은 값을 다시 업데이트를 하더라도 리액트에서는 자식을 `re-render` 하거나 `effect` 를 발생시키지 않는다.([Object.is](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is)를 사용해서 비교했다고 함_읽으면 유용함) 

<br/>

### **2. useEffect()**

```js
useEffect(() => {
  // Update the document title using the browser API
  document.title = `You clicked ${count} times`;
});
```

기본적으로 모든 렌더링이 완료된 후에 실행이 된다. 

어떤 `value` 가 바뀌었을때 실행되도록 할 수 있다.(내가 바라보고 싶은 인자를 넣을 수 있다.)

<br/>

#### 2.1 Cleaning up an effect

화면을 떠나기 전에 정리를 할때 사용할 수 있다.(`dispose()`와 같은 느낌임)

아래의 예시를 보게 되면 `return`으로 만든 함수가 정리를 하는 함수이다.

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```

메모리 부족을 방지하하기 위해 컴포넌트가 UI로 부터 제거되기 전에 실행한다.

> 만약에 구독을 취소하기전에 다른 effect가 실행이 되어 구독을 한다면? 이러한 일이 발생하는 것을 막고 싶다면?

<br/>

#### 2.2 Timing of effects

`componentDidMount` 나 `componentDidUpdate` 과는 다르게 `layout`과 `paint` 가 끝나고 나서 `useEffect`가 실행이된다. 이렇게 되니 만든 **공통의 부작용에 있어서 적합하다** 라고 하는데, 화면에서 업데이트되는 것이 멈추는 현상이 일어나지 않으니까 그런 것이다.

예를 들어, **사용자가 볼 수있는 DOM 변이는 시각적인 불일치를 인식하지 못하도록 다음 페인트 전에 동기적으로 실행해야 한다.**

`useLayoutEffect` 는 `useEffect` 동일한 기능이지만 실행되는 시점이 다른 `Hook` 이다. 쉽게 말함면 실행되는 시점이 다르다는 것인데 `useEffect` 는 아래에 진한 글씨와 같이 완전히 화면이 그려졌다 라는 것을 보장할 수 있지만 `useLayoutEffect`는 시점이 Dom의 변화는 있지만 `repaint`, `reflow`가 되지 않은 시점이라고 생각하면 될 것 같다.

**`useEffect`는 브라우저가 paint할때 까지 연기를 하지만 새로운 렌더링전에 시작될 것이 보증한다.**

<br/>

#### 2.3 Conditionally firing an effect

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

`useEffect` 에는 2번째 인자가 존재한다. 여기에 들어가는 배열은 **내가 바라볼 것** 으로 여기서는 `props.source` 의 변경이 일어났을 경우에만 작동하게 된다.

**만약에 인자에 아무것도 없다면 마운트에서 실행되고 마운트 해제에서는 정리한다.**

<br/>

### **3. useContext()**

```js
    const context = useContext(Context);
```

`react@16.3`부터 지원을 한 `Context` 를 사용할 수 있도록 지원하는 것이다. `context object` 를 받아서 현재 `context` 값을 반환한다. 

`provider`가 업데이트되면 Hooks이 실행되어 최신의 값으로 당연히 동기화가 된다.

<br/>

## Additional Hooks

### **4. useReducer**

우리가 리덕스에서 많이 보던 `Reducer` 와 비슷하다고 생각하면 된다. 그렇다고 한다.

```js
    const initialState = {count: 0};
    
    // 우리가 Redux에서 만들던 Reducer 부분
    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        default:
          throw new Error();
      }
    }
    
    function Counter({initialCount}) {
      // 초기화 값과 Reducer를 넣어준다.
      const [state, dispatch] = useReducer(reducer, initialState);

      return (
        <>
          Count: {state.count}
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
      );
    }
```

<br/>

#### 4.1 Specifying the initial state

2번째 인자로 초기화 `state` 를 넘겨준다.(간단하게 초기화하는 방법)

```js
    const [state, dispatch] = useReducer(
        reducer,
        {count: initialCount}
      );
```

<br/>

#### 4.2 Lazy initialization

만약 느슨하게 초기 `state` 를 만들고 싶다면 3번째 인자로 `init function` 을 넘기자

그러면 `init(initialArg)` 이런식으로 호출이 될 것이다.

```js
    function init(initialCount) {
      return {count: initialCount};
    }
    
    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        case 'reset':
          return init(action.payload);
        default:
          throw new Error();
      }
    }
    
    function Counter({initialCount}) {
      const [state, dispatch] = useReducer(reducer, initialCount, init);
      return (
        <>
          Count: {state.count}
          <button
            onClick={() => dispatch({type: 'reset', payload: initialCount})}>
    
            Reset
          </button>
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
      );
    }
```

<br/>

#### 4.3 Bailing out of a dispatch

`useState` 와 동일하게 같은 값을 넘기게 되면 내부적으로 비교를 해서 자식 렌더링과 `effect`를 실행하는 것을 막는다.

<br/>

### **5. useCallback**

```js
    const memoizedCallback = useCallback(
      () => {
        doSomething(a, b);
      },
      [a, b],
    );
```

> Returns a memoized callback.

인라인 콜백과 입력 배열을 전달합니다. `useCallback` 은 입력 중 하나가 변경된 경우에만 변경되는 콜백의 `memoized` 버전을 반환합니다

즉 `a` 또는 `b` 가 변경이 되었다면 함수 결과를 반환한다. 

- 동일한 표현

```js
    useCallback(fn, inputs) //is equivalent to 
    useMemo(() => fn, inputs).
```

<br/>

### **6. useMemo**

```js
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

> Returns a memoized value.

**렌더링되는 동안** 에 `useMemo`에 전달된 함수가 실행이 된다.
 
즉, 사용하는데 있어서 조심해야한다. 렌더링동안 하지않는 것을 하지 않아야한다. `side effect`를 위해 `useEffect`를 사용해야하는 것이다.

`useEffect` 와 동일하게 배열이 넘어가지 않을 경우 매순간 첫번째 매개변수를 타게 된다.

성능 최적화를 위해서 `useMemo`를 사용할 수 있을 것으로 생각이 된다.

<br/>

### **7. useRef**

```js
    function TextInputWithFocusButton() {
      const inputEl = useRef(null);
      const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
      };

      return (
        <>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
        </>);
    }
```

<br/>

### **8. useImperativeHandle**

```js
    useImperativeHandle(ref, createHandle, [inputs])
```

`useImperativeHandle` 은 `ref` 를 사용할 때 부모 구성 요소에 노출되는 인스턴스 값을 사용자 정의합니다.

```js
    function FancyInput(props, ref) {
      const inputRef = useRef();

      useImperativeHandle(ref, () => ({
        focus: () => {
          inputRef.current.focus();
        }
      }));

      return <input ref={inputRef} ... />;
    }
    FancyInput = forwardRef(FancyInput);
```

<br/>

### **9. useLayoutEffect**

서명은 `useEffect`와 동일하지만 **모든 DOM 변이 후에 동기적으로 시작** 됩니다. 

`useLayoutEffect` 내부에서 예약된 업데이트는 브라우저가 페인트할 수 있기 전에 동기적으로 플러시됩니다.

이것을 사용하여 **DOM에서 레이아웃을 읽고 동기적으로 다시 렌더링**합니다.

시각적인 업데이트를 막지 않도록 `useEffect`를 사용하기를 권장함

<br/>

### **10. useDebugValue**

`useDebugValue`는 `React DevTools`에서 사용자 정의 후크 레이블을 표시하는 데 사용할 수 있습니다.

```js
    function useFriendStatus(friendID) {
      const [isOnline, setIsOnline] = useState(null);
    
      // ...
    
      // Show a label in DevTools next to this Hook
      // e.g. "FriendStatus: Online"
      useDebugValue(isOnline ? 'Online' : 'Offline');
    
      return isOnline;
    }
```

#### 10.1 Defer formatting debug values

```js
    useDebugValue(date, date => date.toDateString());
```