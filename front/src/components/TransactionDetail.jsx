import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TransactionDetail() {

  const [addAccount,setAddAccount] = useState(false)

  const handleClick = async () => { 
    setAddAccount(false);
  };

  let transaction =
    {
      transactionId:1,
      senderFirstName: "Thomas",
      recipientFirstName: "Natalia",
      senderAccountNumber: "0486292109157572236939184",
      recipientAccountNumber: "4465308741290020931947222",
      amount : "100.33"
    }
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#F0F0F0] ">
        <div className="flex flex-row justify-between	 ">
         <h3 className=" text-center text-2xl leading-9 tracking-tight text-gray-900">
            <span className=" text-[#046CD9]">Transaction Detail</span>  
         </h3>
        
        </div>
       
 {/* {transactions && transactions.map((c,b)=> */}
   
        <div className="flex flex-row  mt-5 justify-between	">
            <div className="flex flex-col">
                <div className="flex flex-row items-end w-24">
                    <div className="w-32">
                        <img className="rounded-full " src="https://picsum.photos/200/300" alt="profileImage"></img>
                    </div>
                    <div className="w-32	">
                        <img className="rounded-full " src="https://picsum.photos/id/64/200/300" alt="profileImage"></img>
                    </div>
                </div>
                
                <div className="flex flex-col">
                {/* <div className="flex flex-row  items-end w-24"> */}
                    <div >
                    <span className="font-bold">
                       {transaction.senderFirstName} <span className="font-thin">paid</span> {transaction.recipientFirstName}
                    </span>
                    </div>

                    <div >
                    <span className="font-thin">
                        Payment: {transaction.senderAccountNumber} to {transaction.recipientAccountNumber}
                    </span>
                    </div>

                    
                    <div className="flex flex-row" >
                        <span className=" mr-3">0</span>   
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                        </svg>
                    </div>
                    <div className="mt-5">
                        <input type="text"
                        placeholder="Write a comment..."
                        className="rounded-lg" />
                    </div>
                {/* </div> */}
                </div>

            </div>
            <div className="">
                <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#F44538]">
                {transaction.amount}
               </h2>
            </div>
                  
        </div>
    
  {/* } */}
        
      </div>
    </>
  );
}
