import { useEffect, useState } from "react"

export const useCountdown = (step = 1, cb = null) => {
  const [time, setTime] = useState(-1);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(()=>{
    if(time > 0 && !intervalId){
      setIntervalId(setInterval(() =>{
        setTime(time - (step * 1000));
      }, step * 1000))
    }

    if(time < 0 && intervalId){
      intervalId && clearInterval(intervalId);
      cb && cb()
    }

    return () => {
      if(intervalId){
        clearInterval(intervalId)
        setInterval(null)
      }
    }
  }, [time, intervalId, step, cb])


  return {
    timer: time / 1000,
    start: (from) => setTime(from * 1000),
    stop: () => {
      if(intervalId){
        clearInterval(intervalId)
    }},
    restart: (from) => {
      setIntervalId(null);
      setTime(from)
    }
  }
}
