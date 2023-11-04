export function getRandomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length)
    return array[random]
}
export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }