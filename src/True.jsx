import React, { useEffect, useRef, useState } from 'react'

export default function True() {
    const [balance,setbalance]=useState(100)

    const entervalue = useRef()

    const deposit =()=>{
        let enter =entervalue.current.value
        if(enter > 0){
            handle('deposit')
            setbalance(balance + +enter)
        }else{alert("enter the deposit value")}
    }


    const withdraw =()=>{
        let enter = entervalue.current.value
        if(enter > 0){
            if(enter <= balance){
                handle('withdraw')
                setbalance(balance - enter)
            }else{alert("no withdraw")}
        }else{alert('enter the withdraw value')}
    }

    useEffect(()=>{
        let stor = JSON.parse(localStorage.getItem('balnce12')) || 1000
        let stor2 = JSON.parse(localStorage.getItem('logs12')) || []
        setbalance(stor)
        setlogs(stor2)
    },[])

    const[logs,setlogs]=useState([])

     const handle = (logtype)=>{
        let logvalue = +entervalue.current.value
        let afterbalance = logtype == 'deposit' ? balance + logvalue : balance - logvalue
        let obj ={
            afterbalance,
            logtype,
            logvalue,
            beforebalance:balance
        }
        setlogs([...logs , obj])
        localStorage.setItem('balnce12', JSON.stringify(afterbalance))
        localStorage.setItem('logs12', JSON.stringify(logs))
     }
     
  return (
    <div>
        <h1>balance is :{balance}</h1>
        <input type="text" ref={entervalue} />
        <button className='btn btn-success' onClick={deposit}>deposit</button>
        <button className='btn btn-info' onClick={withdraw}>withdraw</button>

        <table>
            <thead>
                <tr>
                    <th>log id</th>
                    <th>beforebalance</th>
                    <th>log type</th>
                    <th>log value</th>
                    <th>afterbalance</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((el,index)=>{return(
                    <tr>
                        <td>{index + 1}</td>
                        <td>{el.beforebalance}</td>
                        <td>{el.logtype}</td>
                        <td>{el.logvalue}</td>
                        <td>{el.afterbalance}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    </div>
  )
}
