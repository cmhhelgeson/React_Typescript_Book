import { createContext, useContext, Dispatch, FC, useEffect } from "react"
import {
  appStateReducer,
  AppState,
  List,
  Task
} from "./appStateReducer"
import { Action } from "./actions"
import { useImmerReducer } from "use-immer"
import {DragItem} from "./draggables"
import { save } from "../api"
import {withInitialState} from "./withInitialState"

type AppStateContextProps = {
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
  draggedItem: DragItem | null, 
}


//creates the appStateContext as an empty unitialized object
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold", dueDate: "Jun 30"}]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c1", text: "Learn Typescript"}]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c2", text: "Begin to use static typing"}]
    }
  ]
}

type AppStateProviderProps = {
  children: React.ReactNode,
  initialState: AppState
}


export const AppStateProvider = 
  withInitialState<AppStateProviderProps>(({children, initialState}) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(() => {
      save(state)
    }, [state]);

    const { lists, draggedItem } = state
    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || []
    }


    return (
      <AppStateContext.Provider
        value={{ lists, getTasksByListId, dispatch, draggedItem }}
      >
        {children}
      </AppStateContext.Provider>
    )

  }
);

/* export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData)

  const { lists, draggedItem } = state
  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }


  return (
    <AppStateContext.Provider
      value={{ lists, getTasksByListId, dispatch, draggedItem }}
    >
      {children}
    </AppStateContext.Provider>
  )
} */

export const useAppState = () => {
  return useContext(AppStateContext)
}
