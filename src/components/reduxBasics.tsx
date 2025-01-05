import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from "../state/counter/counterSlice";
const reduxBasics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>Increase counter</button>
      <button onClick={() => dispatch(decrement())}>Decrease counter</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>Add 10</button>
      <button onClick={() => dispatch(incrementAsync(5))}>
        Add 5 in 1 sec
      </button>
    </div>
  );
};

export default reduxBasics;
