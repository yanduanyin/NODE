const forkComputer = () => {
  let sum = 0
  for (let i = 0; i < 100000; i++) {
    sum += i
  }
  return sum
}
process.on('message', msg => { // 通知开始计算
  const sum = forkComputer()
  process.send(sum) // 通知外面计算好了
})
