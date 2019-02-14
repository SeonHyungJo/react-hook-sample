# react-hook-sample

## Basic Hooks

### **useState(initialState)**

초기값을 처음에 선언해서 넣어준다.

우리가 많이 사용하던 state 초기화 작업과 동일하다.

모든 Hook은 2개의 인자를 배열로 받아온다. 

```js
    const [state, setState] = useState(initialState);
```

state는 현재 값이 들어있는 변수 setState는 변수를 변경하는 함수이다.

**리렌더링이 될 경우 useState에 의해 반환 된 첫 번째 값은 항상 업데이트를 적용한 후 가장 최근 상태가 된다.**

#### Functional updates

역시나 동일하게 인자로 함수를 넣을 수 있다.  순수함수 답다.

기존에 우리가 사용하던 setState 메소드와는 달라서 자동으로 병합을 시켜주지 않는다. 

즉 우리가 병합을 해줘야한다.

```js
    setState(prevState => {
      // Object.assign would also work
      return {...prevState, ...updatedValues};
    });
```

#### Lazy initial state

initial state에 역시 함수를 사용할수 있다. 리액트의 표현으로는 값 비싼 게산이라면 함수를 사용해서 표현하라고 한다.

#### Bailing out of a state update

같은 값을 다시 업데이트를 하더라도 리액트에서 자식을 리렌더링하거나 effect를 발생시키지 않는다.(Object.is를 사용해서 비교했다고 함)

### **useEffect()**

렌더링이 완전히 화면에 완료가 된 후에 실행이 된다.

기본적으로 모든 렌더링이 완료된 후에 실행이 된다. 

어떤 value가 바뀌었을때 실행되도록 할 수 있다.(인자를 주면됨.)

#### Cleaning up an effect

화면을 떠나기 전에 정리를 할때 사용할 수 있다.

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

> 만약에  구독을 취소하기전에 다른 effect가 실행이 되어 구독을 한다면? 이러한 일이 발생하는 것을 막고 싶다면?

#### Timing of effects

componentDidMount 나 componentDidUpdate 과는 다르게 layout과 paint가 끝나고 나서 userEffect가 실행이된다. 이렇게 되니까 만든 공통의 부작용에 있어서 적합하다는 것이다. 화면에서 업데이트되는 것이 막히지 않으니까.

예를 들어, 사용자가 볼 수있는 DOM 변이는 시각적인 불일치를 인식하지 못하도록 다음 페인트 전에 동기적으로 실행해야합니다

useLayoutEffect ⇒ useEffect롸 동일한 기능이지만 실행되는 시점이 다른 훅을 제공한다.

useEffect는 브라우저가 paint할때 까지 연기를 하지만 새로운 렌더링전에 시작될 것이 보증한다.

#### Conditionally firing an effect

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

useEffect에는 2번째 인자가 존재한다.  여기에 들어가는 배열은 내가 바라볼 것들이다. 여기서는 [props.source의 변경이 일어났을 경우에만 재생성을 하는 것이다.

만약에 인자에 아무것도 없다면 마운트에서 실행되고 마운트 해제에서는 정리한다.

### **useContext()**

```js
    const context = useContext(Context);
```

context object를 받아서 현재 context 값을 반환한다. 

provider가 업데이트되면 훅이 실행되어최신의 값으로 변경한다.

## Additional Hooks

### **useReducer**

우리가 리덕스에서 많이 보던 Reducer와 비슷하다고 생각하면 된다. 그렇다고 한다.

```js
    const initialState = {count: 0};
    
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

#### Specifying the initial state

2번째 인자로 초기화 state를 넘겨준다.(간단하게 초기화하는 방법)

```js
    const [state, dispatch] = useReducer(
        reducer,
        {count: initialCount}
      );
```

#### Lazy initialization

만약 느슨하게 초기 state를 만들고 싶다면 3번째 인자로 init function을 넘기자

그러면 init(initialArg) 이런식으로 호출이 될 것이다.

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

#### Bailing out of a dispatch

useState와 동일하게 같은 값을 넘기게 되면 비교를 해서 자식으로 렌더링과 effect를 실행하는 것을 막는다.


### **useCallback**

```js
    const memoizedCallback = useCallback(
      () => {
        doSomething(a, b);
      },
      [a, b],
    );
```

> Returns a memoized callback.

인라인 콜백과 입력 배열을 전달합니다. useCallback은 입력 중 하나가 변경된 경우에만 변경되는 콜백의 memoized 버전을 반환합니다

즉 a 또는 b가 변경이 되었다면 함수 결과를 반환한다. 

동일한 표현

```js
    useCallback(fn, inputs) //is equivalent to 
    useMemo(() => fn, inputs).
```

### **useMemo**

```js
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

> Returns a memoized value.

렌더링시 useMemo에 전달된 함수가 실행이 된다.

즉, 사용하는데 있어서 조심해야한다.  렌더링동안 하지않는 것을 하지 않아야한다. sideeffect는 useEffect를 사용해야하는 것이다.

useEffect와 동일하게 배열이 넘어가지 않을 경우 매순간 첫번째 매개변수를 타게 된다.

성능 최적화를 위해서 useMemo를 사용할 수 있을 것으로 생각이 된다.

### useRef

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

### useImperativeHandle

```js
    useImperativeHandle(ref, createHandle, [inputs])
```

useImperativeHandle은 ref를 사용할 때 부모 구성 요소에 노출되는 인스턴스 값을 사용자 정의합니다.

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

### **useLayoutEffect**

서명은 useEffect와 동일하지만 모든 DOM 변이 후에 동 기적으로 시작됩니다. 

이것을 사용하여 DOM에서 레이아웃을 읽고 동 기적으로 다시 렌더링합니다.

### **useDebugValue**

useDebugValue는 React DevTools에서 사용자 정의 후크 레이블을 표시하는 데 사용할 수 있습니다.

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

#### Defer formatting debug values

```js
    useDebugValue(date, date => date.toDateString());
```