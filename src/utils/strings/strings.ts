// const splitLimitOccurance = (text: string, by:string, occurance?: number): string[] => {
//   let start: number = 0
//   let result: string[] = []
//   let found: number = 0
//   for (var i = 0; i < text.length; i++)
//   {
//     if (found )
//     result.push(text.substring(start, i))
//     start = i+1
//   }
// }

export const trim = (text: string): string => {
  return text.replace(/^\s+|\s+$/gm, "");
};
