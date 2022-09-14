
export const formatPropsForSQL = (toInclude: string[]) => {
    let retString: string = "";
    let i = 0;
    while (i < toInclude.length - 1) {
        retString += `${toInclude[i]}, `
        i++;
    }
    retString += `${toInclude[i]}`
    return retString;
}