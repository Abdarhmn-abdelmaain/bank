import React, { useEffect, useRef, useState } from 'react'

export default function tableenglish() {
    const[balance2,setbalance2]=useState(100)
    const entervalue2 = useRef()
    const deposit=()=>{
        let enter=entervalue2.current.value
        if(enter > 0){
            handlelogs('deposit')
            setbalance2(balance2 + +enter)
        }else{alert('pales enter the deposit value')}
    }
    const withdraw=()=>{
        let enter=entervalue2.current.value
        if(enter > 0){
            if(enter <= balance2){
                handlelogs('withdraw')
                setbalance2(balance2 - enter)

            }else{alert('you cannot withdraw more than your account balance')}
        }else{alert('plase enter the withdraw value')}
    }

    useEffect(()=>{
        setbalance2(JSON.parse(localStorage.getItem('bal'))) || 1000
        let stord = JSON.parse(localStorage.getItem('log')) || []
        setlogs8(stord)

    },[])
    const [ logs8,setlogs8]=useState([])

    const handlelogs=(logtype2)=>{
        let logvalue2 = +entervalue2.current.value
        let afterbalance2 = logtype2 == 'deposit' ? balance2 +logvalue2 : balance2 - logvalue2

        let obj2 = {
            afterbalance2,
            logtype2,
            logvalue2,
            beforebalance2:balance2
        }
        setlogs8([...logs8, obj2])
        localStorage.setItem('bal', JSON.stringify(afterbalance2))
        localStorage.setItem('log', JSON.stringify(logs8))
    }
    // useState(()=>{
    // },[logs8])
    const delete1 = (index)=>{
        let r = [...logs8]
        r.splice(index,1)
        setlogs8(r)
    }
    const deleteall2=()=>{
        setlogs8([])
    }

    const[account2,setaccount2]=useState(100)
    const entervalu = useRef()

    const deposit3 = ()=>{
        let enter2 = entervalu.current.value
        if(enter2 > 0){
            handleaccount("ايداع")
            setaccount2(account2 + +enter2)
        }else{alert("ادخل قيمة الايداع")}
    }

    const withdraw2 = () =>{
        let enter2 = entervalu.current.value
        if(enter2 > 0 ){
            if(enter2 <= account2){
                handleaccount("سحب")
                setaccount2(account2 - enter2)
            }else{alert("لايمكنك سحب اكثر من رصيد حسابك")}
        }else{alert('ادخل قيمة السحب')}
    }

    const[transaction3,settransaction3]=useState([])
    
    const handleaccount = (logtype3)=>{
        let logvalue3 = +entervalu.current.value
        let afterbalance3 = logtype3 == 'ايداع'? account2 + logvalue3:account2 - logvalue3
        
        let add = {
            afterbalance3,
            logtype3,
            logvalue3,
            beforebalance3:account2
        }
        settransaction3([...transaction3, add])
        localStorage.setItem('account3', JSON.stringify(afterbalance3))
        localStorage.setItem('transaction3', JSON.stringify(transaction3))
    }

    useEffect(()=>{
        let stord2 = JSON.parse(localStorage.getItem('account3')) || []
        let stord = JSON.parse(localStorage.getItem('transaction3')) || 1000

        setaccount2(stord2)
        settransaction3(stord)
    },[])

    const remove = (index)=>{
        let remo = [...transaction3]
        remo.splice(index , 1)
        settransaction3(remo)
    }
    const removeall = ()=>{
        settransaction3([])
    }
  return (
    <div>
        <h1>balance is {balance2}</h1>
        <input type="number"ref={entervalue2} placeholder='plase the value' />
        <button onClick={deposit} className='btn btn-success'>deposit</button>
        <button onClick={withdraw} className='btn btn-danger'>withdraw</button>

        <table>
            <thead>
                <tr>
                    <th>log id</th>
                    <th>beforebalance</th>
                    <th>log type</th>
                    <th>log value</th>
                    <th>log afterbalance</th>
                    <th><button onClick={deleteall2}>deleteall</button></th>
                </tr>
            </thead>
            <tbody>
                {logs8.map((el,index)=>{return(
                    <tr key={index}>
                        <td>{index +1}</td>
                        <td>{el.beforebalance2}</td>
                        <td>{el.logtype2}</td>
                        <td>{el.logvalue2}</td>
                        <td>{el.afterbalance2}</td>
                        <td><button onClick={()=> delete1(index)}>DElete</button></td>
                    </tr>
                )})}
            </tbody>
        </table>

        <h1>رصيدك الحالي : {account2}</h1>
        <input type="number" ref={entervalu}  />
        <button onClick={deposit3} className='btn btn-success'>ايداع</button>
        <button onClick={withdraw2} className='btn btn-danger'>سحب</button>
        <table>
            <thead>
                <tr>
                    <th>رقم العملية</th>
                    <th>الرصيد بعد العملية</th>
                    <th>نوع العملية</th>
                    <th>قيمة العملية</th>
                    <th>الرصيد بعد العملية</th>
                    <td><button onClick={removeall} className='btn btn-success'>مسح الكل </button></td>

                </tr>
            </thead>
            <tbody>
             
                {transaction3.map((el,index)=>{return(
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{el.beforebalance3}</td>
                        <td>{el.logtype3}</td>
                        <td>{el.logvalue3}</td>
                        <td>{el.afterbalance3}</td>
                        <td><button onClick={()=> remove(index)} className='btn btn-danger'>مسح</button></td>
                    </tr>

                )
                })}
            </tbody>
        </table>
    </div>
  )
}
