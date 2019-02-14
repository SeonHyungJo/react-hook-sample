# react-hook-sample

## Basic Hooks

### useState(initialState)

초기값을 처음에 선언해서 넣어준다.

우리가 많이 사용하던 state 초기화 작업과 동일하다.

모든 Hook은 2개의 인자를 배열로 받아온다. 

    const [state, setState] = useState(initialState);

state는 현재 값이 들어있는 변수 setState는 변수를 변경하는 함수이다.

**리렌더링이 될 경우 useState에 의해 반환 된 첫 번째 값은 항상 업데이트를 적용한 후 가장 최근 상태가 된다.**

#### Functional updates

역시나 동일하게 인자로 함수를 넣을 수 있다.  순수함수 답다.

기존에 우리가 사용하던 setState 메소드와는 달라서 자동으로 병합을 시켜주지 않는다. 

즉 우리가 병합을 해줘야한다.

    setState(prevState => {
      // Object.assign would also work
      return {...prevState, ...updatedValues};
    });

#### Lazy initial state

initial state에 역시 함수를 사용할수 있다. 리액트의 표현으로는 값 비싼 게산이라면 함수를 사용해서 표현하라고 한다.

#### Bailing out of a state update

같은 값을 다시 업데이트를 하더라도 리액트에서 자식을 리렌더링하거나 effect를 발생시키지 않는다.(Object.is를 사용해서 비교했다고 함)