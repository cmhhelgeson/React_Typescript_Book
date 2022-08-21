//Callback of an Effect. I.E a function that returns either void
//or a destructor
import { EffectCallback, useEffect} from "react";


//Explicitly define a type that contains a function that returns void
type VoidEffect = (...args: unknown[]) => void

const useEffectOnce = (effect: EffectCallback) => {
    //effect is a function that will return either
    //void or a destructor
    useEffect(effect, []);
}

export const useMount = (fn: VoidEffect) => {
    //We pass useEffectOnce a function that returns void
    //Ensuring we use an effect with no cleanup
    useEffectOnce(() => {fn()})
}


