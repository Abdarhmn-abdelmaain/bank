import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import Tableenglish from './Tableenglish'
import True from './True'
export default function App() {
  const[account,setaccount]=useState(1000)
  const entervalue = useRef()

  const deposit =()=>{
    let enter =entervalue.current.value
    if(enter > 0){
      handleTransaction('deposit')
      setaccount(account + +enter)
    }else{alert('enter the deposit amount')}
  }
  const withdraw =()=>{
    let enter=entervalue.current.value
    if(enter > 0){
      if(enter <= account){
        handleTransaction('withdraw')
        setaccount(account - enter)
      }else{alert('you cannot withdraw more than your account balance')}
    }else{alert('enter the withdraw amount')}
  }

  
  useEffect(()=>{
    let storedAccount = JSON.parse(localStorage.getItem('account')) || 1000
    let storedTransaction = JSON.parse(localStorage.getItem('Transactions')) || []
    setaccount(storedAccount)
    settransaction(storedTransaction)
  },[])

  const[transaction,settransaction]=useState([])
  
  const handleTransaction =(logtype)=>{
    let logamount = +entervalue.current.value
    let afteraccount = logtype == 'deposit' ? account + logamount : account - logamount

    const newTransaction ={
      afteraccount,
      logamount,
      logtype,
      beforeaccount:account
    }
    settransaction([...transaction, newTransaction])
    localStorage.setItem('account', JSON.stringify(afteraccount))
  
  }

  useEffect(()=>{
    localStorage.setItem('Transactions', JSON.stringify(transaction))
  },[transaction])
  
  const remove = (index)=>{
    let removeindex = [...transaction]
    removeindex.splice(index , 1)
    settransaction(removeindex)
  }

  const removeall=()=>{
    settransaction([])
  }

const[balance,setbalance]=useState(1000)
const entervalue2=useRef()
const deposit2 = () => {
  let enter = entervalue2.current.value
  if(enter > 0){
    handle('ايداع')
    
    setbalance(balance + +enter)
  }else{alert('من فضلك ادخل المبلغ المراد ايداعه')}
}
const withdraw2 =()=>{
  let enter = entervalue2.current.value
  if(enter > 0){
    if(enter <= balance){
      handle('سحب')
      setbalance(balance - enter)
    }else{alert('لا يمكنك سحب اكثر من رصيد حسابك')}
  }else{alert("من فضلك ادخل مبلغ المراد سحبه")}
}

useEffect(()=>{
  let stordbalance = JSON.parse(localStorage.getItem('balan')) || 1000
  let stordhandle = JSON.parse(localStorage.getItem('handletrans')) || []
  setbalance(stordbalance)
  sethandletrans(stordhandle)
  
},[])
const [handletrans,sethandletrans]=useState([])

const handle = (logtype2)=>{
  let logvalue = +entervalue2.current.value
  let afterbalance = logtype2 == 'ايداع' ? balance + logvalue : balance - logvalue

  let obj = {
    afterbalance,
    logtype2,
    logvalue,
    beforebalance:balance
  }
  sethandletrans([...handletrans, obj])
  localStorage.setItem('balan', JSON.stringify(afterbalance))
}
useEffect(()=>{
  localStorage.setItem('handletrans', JSON.stringify(handletrans))
},[handletrans])

const handledelete = (index)=>{
  let deleteindex = [...handletrans]
  deleteindex.splice(index,1)
  sethandletrans(deleteindex)
}
const deleteall = ()=>{
  sethandletrans([])
}
  return (
    <div>
      {/* <True></True> */}
      <h1>Your current balance : {account}</h1>
      <div className='but'>
      <input type="number" ref={entervalue} placeholder=' enter the amount' />

      <button onClick={deposit} className='hrv btn btn-success'>Deposit</button>
      <button onClick={withdraw} className='hrv btn btn-danger'>Withdraw</button>
      </div>
      <table className='table-bordered col-12'>
        <thead>
          <tr>
            <th>Log id</th>
            <th>Before Account</th>
            <th>Log Type</th>
            <th>Log Value</th>
            <th>After Account</th>
            <th><button className=' col-12  btn btn-info' onClick={removeall}>Delete all</button></th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((el,index)=>{return(
            <tr key={index}> 
              <td>{index + 1}</td>
              <td>{el.beforeaccount}</td>
              <td>{el.logtype}</td>
              <td>{el.logamount}</td>
              <td>{el.afteraccount}</td>
              <td><button onClick={()=> remove(index)} className='col-12 btn btn-danger'>Delete</button></td>
            </tr>
          )})}
        </tbody>
      </table>

      <h1>رصيدك الحالي : {balance}</h1>
      <div className='but'>
      <input type="number" ref={entervalue2} placeholder='ادخل المبلغ' />
      <button onClick={deposit2} className='hrv btn btn-success'>ايداع</button>
      <button onClick={withdraw2} className='hrv btn btn-danger'>سحب</button>

      </div>
      <table className='table-bordered col-12'>
        <thead>
          <tr>
            <th>رقم العملية </th>
            <th>الرصيد قبل العملية</th>
            <th>نوع العملية</th>
            <th>قيمة العملية</th>
            <th>الرصيد بعد العملية</th>
            <th className='col-12 btn btn-info' onClick={deleteall }>حذف الكل</th>
          </tr>
        </thead>
        <tbody>
          {handletrans.map((el,index)=>{return(
            <tr key={index}>
              <td>{index +1}</td>
              <td>{el.beforebalance}</td>
              <td>{el.logtype2}</td>
              <td>{el.logvalue}</td>
              <td>{el.afterbalance}</td>
              <td><button className='col-12 btn btn-danger' onClick={()=> handledelete(index)}>حذف</button></td>
            </tr>
          )})}
        </tbody>
      </table>
      {/* <Tableenglish></Tableenglish> */}
    
    </div>
  )
}
