'use client'

import Image from "next/image";
import { useState } from "react";
import { calculateMortage } from "./actions/calculation";


export default function Home() {

  const [parameters, setParameters] = useState({
    amount: 0,
    term: 0,
    rate: 0,
    mortageType: "",
  })

  const handleChange = (event: any) => {
    const property = event.target.name
    const value = event.target.value
    setParameters({ ...parameters, [property]: value })
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
   
      const amount = parameters.amount;
      const term = parameters.term;
      const rate = parameters.rate;
      const mortageType = parameters.mortageType;
    
    calculateMortage(amount, term, rate, mortageType);
  };

  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-24">

    <div className="bg-cyan-200 w-96 rounded-2xl flex items-center shrink-0 p-6">
      <div className="main container">
        <div>
          <form action={handleSubmit} >
            <div className="flex row-auto space-x-28">
              <h2>Mortage Calculator</h2>
              <button>Clear All</button>
            </div>
            
            <div className="w-full">
              
              <div className="relative">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  // htmlFor="email"
                >
                  Mortage amount
                </label>
              <input 
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id = "amount"
                type = "number"
                name = "amount"
                placeholder= "Please, enter the mortage amount."
                required          
              />
              </div>

              <div className="relative">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  // htmlFor="email"
                >
                  Mortage term
                </label>
              <input 
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id = "term"
                type = "number"
                name = "mortage term"
                placeholder= "years."
                required          
              />
              </div>

              <div className="relative">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  // htmlFor="email"
                >
                  Interest Rate
                </label>
              <input 
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id = "rate"
                type="number"
                name = "interest rate"
                placeholder= "interest rate."
                required          
              />
              </div>

              <div>
                <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                >
                  Mortage Type
                </label>

                <div>
                  <input
                  type="radio"
                  id= "repayment"
                  name= "Interest Only"
                  />
                  <label> Repayment </label>
                </div>
                <div>
                  <input
                  type="radio"
                  id= "interest-only"
                  name= "Interest Only"
                  />
                  <label> Interest only </label>
                </div>

              </div>
            </div>
            
            <div className="pt-2 pb-2">
              <button type="submit" className="bg-emerald-600 p-1 rounded-md"> Calculate Repayments </button>
            </div>
            
          </form>
        </div>
        <div className="bg-black h-40">
          results
        </div>
      </div>
    </div>

    </main>
  );
}
