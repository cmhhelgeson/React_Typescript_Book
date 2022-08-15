import React, {useState, useEffect} from "react"
import { AppState } from "./appStateReducer"
import { load } from "../api"
import { doesNotReject } from "assert"


//Props that are injected into component
type InjectedProps = {
    initialState: AppState
}

//Extraneous props formed by omitting injected props from base props
type BesidesInjectedProps<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>


//Create a function that takes in a component that takes both nonInjectedProps and injectedProps
//It can be assume that BesidesInjectedProps might represent the children of the context provider
export function withInitialState<TProps>(WrappedComponent: React.ComponentType<BesidesInjectedProps<TProps> & InjectedProps>) {

    //Return a component that converts all nonInjectedProps into collapsable props value
    return (props: BesidesInjectedProps<TProps>) => {
        //Set an initialState to be used if data is lacking
        const [initialState, setInitialState] = useState<AppState>({
            lists: [], 
            draggedItem: null
        })

        //Three Loading States
        //Pending: isLoading is true. Render a loader
        //Failure: isLoading false, Error stored, handle error
        //Success: isLoading false, Error null, render normally
        const [isLoading, setIsLoading] = useState(true);
        const [isError, setError] = useState<Error | undefined>();
        useEffect(() => {
            const fetchInitialState = async() => {
                try {
                    const data = await load()
                    setInitialState(data);
                } catch (e) {
                    if (e instanceof Error) {
                        setError(e);
                    }
                }
                setIsLoading(false);
            }
            fetchInitialState();
        }, [])

        if (isLoading) {
            return <div>Loading</div>
        }
        if (isError) {
            return <div>{isError.message}</div>
        }
        //Return component with extraneous props and initialState
        return (<WrappedComponent {...props} initialState={initialState} />);
    }
} 
