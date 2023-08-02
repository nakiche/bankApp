import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Form() {

const [transactions, setTransactions] = useState([
  {
    transactionId:1,
    senderFirstName: "Thomas",
    recipientFirstName: "Natalia",
    senderAccountNumber: "0486292109157572236939184",
    recipientAccountNumber: "4465308741290020931947222",
    amount : "100.33"
  },
  {
    transactionId:2,
    senderFirstName: "Thomas",
    recipientFirstName: "Ismail",
    senderAccountNumber: "0486292109157572236939184",
    recipientAccountNumber: "4465308741290020931947923",
    amount : "33.50"
  },
  {
    transactionId:3,
    senderFirstName: "Thomas",
    recipientFirstName: "Natalia",
    senderAccountNumber: "0486292109157572236939184",
    recipientAccountNumber: "4465308741290020931947222",
    amount : "22.00"
  },
]);
  const [addAccount,setAddAccount] = useState(false)

  const handleClick = async () => { 
    setAddAccount(false);
  };

  let transactionId = 1;
  
  return (
    <>
      
      <div className="flex flex-row justify-start ml-8 ">
            <div className="mr-3"> 
            <select id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultValue>Date</option>
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="month">month</option>
            </select>
            </div>
            <div>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultValue>Amount:</option>
                <option value="0-1000">$0-$1000</option>
                <option value="1001-5000">$1001-$5000</option>
                <option value="5001-more">$5001 or more</option>
            
            </select>
            </div>
        </div>

        <div className="flex flex-row justify-start ml-8 ">
            <span className="mt-5">Personal</span> 
        </div>

 { transactions && 
    transactions.map((c,b)=>
    
        <div className="flex flex-row gap-1 mt-5 justify-around pb-2"  key={b}>
            
            <div className="flex flex-row  items-end  ">
                <div className="w-16">
                    <img className="rounded-full " src="https://picsum.photos/200/300" alt="profileImage"></img>
                </div>
                <div className="w-8	">
                    <img className="rounded-full " src="https://picsum.photos/id/64/200/300" alt="profileImage"></img>
                </div>
            </div>
            
            <div className="">
             {/* <div className="flex flex-row  items-end w-24"> */}
             <Link to={`/transaction/${transactionId}`}>
                <div >
                <span className="font-bold">
                   {c.senderFirstName} <span className="font-thin">paid</span> {c.recipientFirstName}
                </span>
                </div>

                <div >
                <span className="font-thin">
                    Payment: {c.senderAccountNumber} to {c.recipientAccountNumber}
                </span>
                </div>
                </Link>  
                <div className="flex flex-row" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                
                <span className=" mr-3">0</span>    
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>

  
                <span>0</span> 

                </div>
             {/* </div> */}
            </div>
            
            <div className="">
                <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#F44538]">
                {c.amount}
               </h2>
            </div>
           
       
        </div>
      
 )   
}
     
   
    </>
  );
}
