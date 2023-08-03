export interface ScoreItem {
  holders: string[],
  weight: number
}

export const calculateScore = (scoreItem: ScoreItem[], userAddress: string): number => {
  const initialScore = 0;
  const score = scoreItem.reduce((accumulator, currentValue) => {
    const currentIndividualScore = calculateIndividualScore(userAddress, currentValue.holders, currentValue.weight);
    return accumulator + currentIndividualScore;
  }, initialScore)
  return score;
}

export const calculateIndividualScore = (address: string, holderList: string[], weight: number): number => {
  if(!holderList.includes(address)) return 0
  const count = holderList.filter(x => x == address).length;
  return count*weight;
}