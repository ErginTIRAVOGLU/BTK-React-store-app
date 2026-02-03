import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByValue } from "./counterSlice";

export default function Counter() {
    const count = useSelector((state: any) => state.counter.value);
    const dispatch = useDispatch();


    return (
        <>
            <Typography>{count}</Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
                <Button onClick={() => dispatch(incrementByValue(5))}>Increment By Value</Button>
            </ButtonGroup>
        </>
    )
}