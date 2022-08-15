import { AppContainer } from "./styles"
import { Column } from "./Column"
import React, { useState, memo } from "react"
import { AddNewItem } from "./AddNewItem"
import { useAppState } from "./state/AppStateContext"
import { addList, moveList, setDraggedItem } from "./state/actions"
import { CustomDragLayer } from "./CustomDragLayer"
import { canSum, bestSum, canConstructWord } from "./utils/arrayUtils"

import Calendar from "react-calendar"

export const App = () => {
  const { lists, dispatch } = useAppState();
  const [value, setValue] = useState(new Date());

  const onValueChange = (nextValue: Date) => {
    setValue(nextValue);
  }


  const shiftItemsLeft = (times: number = 1) => {
    dispatch(moveList(lists[0].id, lists[lists.length - 1].id));
  }

  const shiftItemsRight = (times: number = 1) => {
    dispatch(moveList(lists[lists.length - 1].id, lists[0].id));
  }

  const applyBoxShadow = () => {

  }


  console.log(canConstructWord("abcdef", ["ab", "abc", "cd", "def", "abcd"]));

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
      <button onClick={() => shiftItemsLeft(1)}>Left</button>
      <button onClick={() => shiftItemsRight(1)}>Right</button>
    </AppContainer>
  )
}
