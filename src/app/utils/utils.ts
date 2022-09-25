export function returnRandomNumbers(number: number): Array<number> {
    const randomArray: Array<number> = [];
    for (let i = 0; i < number; ++i) {
        randomArray.push(Math.floor(Math.random() * 100))
    }
    return randomArray;
}

export function returnNonZeroRandomNumbers(number: number): Array<number> {
    const randomArray: Array<number> = [];
    for (let i = 0; i < number; ++i) {
        randomArray.push(Math.floor(Math.random() * 100) + 1)
    }
    return randomArray;
}


export function cleanData(input:Array<string>){
    let result: Array<number> = [];
    for(let i = 0; i < input.length; ++i){
      let convertedNumber = Number(input[i]);
      if(isNaN(convertedNumber)){
        alert('Invalid CSV. All values should be numbers.');
      }
      else{
        result.push(convertedNumber);
      }
    }
    return result;
  }