'use client'

import Image from "next/image";
import { useState } from "react";
import { calculateMortage } from "./actions/calculation";

interface Parameters {
  amount: number;
  term: number;
  rate: number;
  mortageType: string;
};

interface Results {
  months: number;
  moNominal: number;
  moInterestOnly: number;
  toDisplay: number;
  totalPayment: number;
};

export default function Home() {

  const [parameters, setParameters] = useState<Parameters>({
    amount: 0,
    term: 0,
    rate: 0,
    mortageType: "",
  })

  const [results, setResults] = useState<Results>({
    months: 0,
    moNominal: 0,
    moInterestOnly: 0,
    toDisplay: 0,
    totalPayment: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name
    const value = event.target.value
    setParameters({ ...parameters, [property]: value })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
      const amount = parameters.amount;
      const term = parameters.term;
      const rate = parameters.rate;
      const mortageType = parameters.mortageType;
    
    const res = await calculateMortage(amount, term, rate, mortageType);
    setResults(res)
  };

  const resetAll = () =>{
    setResults({
      months: 0,
      moNominal: 0,
      moInterestOnly: 0,
      toDisplay: 0,
      totalPayment: 0,
    });

    setParameters({
      amount: 0,
      term: 0,
      rate: 0,
      mortageType: "",
    });
  };
  console.log(parameters);
  console.log(results)
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-cyan-200 w-96 rounded-2xl flex items-center shrink-0 p-6">
        <div className="main container">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold"> Mortage Calculator </h2>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  type="button"
                  onClick={resetAll}
                >
                  {" "}
                  Clear All
                </button>
              </div>

              <div className="mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mortage amount
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black placeholder-gray-500"
                    id="amount"
                    type="number"
                    name="amount"
                    placeholder="Enter the mortage amount."
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mortage term
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black placeholder-gray-500"
                    id="term"
                    type="number"
                    name="term"
                    placeholder="Years."
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Interest Rate
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black placeholder-gray-500"
                    id="rate"
                    type="number"
                    name="rate"
                    placeholder="Interest rate (%)."
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mortage Type
                  </label>

                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="mortageType"
                        value="repayment"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Repayment</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="mortageType"
                        value="interest-only"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Interest Only</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 pb-2">
                <button 
                type="submit" 
                className="bg-emerald-600 p-1 rounded-md">
                  {" "}Calculate Repayments{" "}
                </button>
              </div>

            </form>
          </div>

          <div className="bg-gray-600 p-4 rounded-md mt-6">
            <div>
              <h2 className="text-lg font-bold"> Your Results </h2>
              <p>
                Your results are shown below based on the information you
                provided. To adjust results, edit the form and clic "calculate
                repayments" again.
              </p>
              <div className="mt-4">
                <div className="mb-2">
                  <h3 className="text-md font-semibold">Your monthly repayments</h3>
                  {results.toDisplay}
                </div>

                <div>
                  <h3 className="text-md font-semibold">Total you´ll repay over them</h3>
                  {results.totalPayment}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
