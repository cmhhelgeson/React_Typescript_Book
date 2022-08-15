type Item = {
  id: string
}

type DateItem = {
  dueDate?: string,
}

type ColumnItem = {
  tasks: Item[]
  id: string,
}


export const getColumnAndCardIndexes = <TItem extends ColumnItem>(
  arr: TItem[], 
  sourceColumnId: string,
  targetColumnId: string,
  sourceCardId: string,
  targetCardId: string,
) => {
  const sourceColumnIndex = findItemIndexById(arr, sourceColumnId);
  console.log()
  const targetColumnIndex = findItemIndexById(arr, targetColumnId);
  //We shouldn't need to do a check to see if the card is still in the list
  //Since we are only moving the due date associated with that card
  const sourceCardIndex = findItemIndexById(arr[sourceColumnIndex].tasks, sourceCardId);
  const targetCardIndex = findItemIndexById(arr[targetColumnIndex].tasks, targetCardId);
  return {sourceColumnIndex, targetColumnIndex, sourceCardIndex, targetCardIndex};
}

//TODO: Test this //Doesn't work, has to do with immer returning proxies, I'm sure there's a way
/* export const getCardFromColumn = (
  arr: any[],
  columnIndex: number, 
  cardIndex: number
) => {
  if (!arr[columnIndex].tasks) {
    return null;
  }
  console.log("Yo");
  console.log(arr[columnIndex].tasks[cardIndex]);
  return arr[columnIndex].tasks[cardIndex]; 
}  */

export const findItemIndexById = <TItem extends Item>(
  arr: TItem[],
  id: string
) => {
  return arr.findIndex((item: TItem) => item.id === id)
}

export const findItemById = <TItem extends Item>(
  arr: TItem[],
  id: string
) => {
  return arr.find((item: TItem) => item.id === id)
}

export const removeItemById = <TItem extends Item>(
  arr: TItem[],
  id: string
) => {
  const idx = arr.findIndex((item: TItem) => item.id === id);
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
}

export const removeItemAtIndex = <TItem extends Item>(
  arr: TItem[],
  index: number
) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export const insertItemAtIndex = <TItem extends Item>(
  arr: TItem[],
  index: number, 
  item: TItem
) => {
  if (index >= 0) {
    return [...arr.slice(0, index), item, ...arr.slice(index)]
  } else {
    return [...arr.slice(0, arr.length + index), item, ...arr.slice(index)];
  }
}

export const moveItem = <TItem extends Item>(
  arr: TItem[],
  from: number, 
  to: number
) => {
  const item = arr[from];
  return insertItemAtIndex(removeItemAtIndex(arr, from), to, item)
}

export const canSum = (target: number, arr: number[], memo: any = {}): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return true;
    }
    if (arr[i] > target) {
      continue;
    }
    memo[arr[i]] = target - arr[i];
    if (memo[target - arr[i]] == arr[i]) {
      console.log(memo);
      return true;
    }
  }
  return false;
}


export const bestSum = (target: number, arr: number[], memo: any = {}): number[] | null => {
  if (target === 0) { return []}
  if (target < 0) { return null}

  let shortCombination: number[] | null = null;

  //If the current target is 6 and the numbers are 2 & 3
  for (let i = 0; i < arr.length; i++) {
    let remainder = target - arr[i]; //4 && 3
    let remainderResult = bestSum(remainder, arr, memo); // will return [2, 2] && [3]
    if (remainderResult !== null) {
      let combination = [...remainderResult, arr[i]] // will get [2, 2, 2] && [3, 3] for the iterations
      //@ts-ignore
      if (shortCombination === null || combination.length < shortCombination.length) {
        shortCombination = combination // will set shortC to [2, 2, 2] in first loop then to [3, 3] in second loop
      }
    }
  }
  //After we iterate through the loops, we set the shortest combination as the value for our target key
  memo[target] = shortCombination;
  return shortCombination;

}


//Example [abcdef, ab, abc, cd, def, abcd] abcdef length = 6
//ab: index 0, abc: index 0, cd: index 2 def: 3 abcd: 0
export const canConstructWord = (target: string, arr: string[], memo: any = {}): boolean => {
  if (target === '') {return true}
  if (target in memo) {
    return memo[target];
  }

  for (let word of arr) {
    if (target.indexOf(word) === 0) {
      const newTarget = target.slice(word.length);
      memo[newTarget] = canConstructWord(newTarget, arr, memo);
      if (memo[newTarget] === true) {
        return true;
      }
    }
    
  }
  memo[target] = false;
  return false;
}

