"use client";

import { useState } from "react";
import { calculateMortage } from "./actions/calculation";
import { CalculatorIcon } from "./ui/assets/images";
import { Parameters, Results } from "./types";
import SuccessResult from "./ui/results/success";
import EmptyResult from "./ui/results/empty";

export default function Home() {
  const [parameters, setParameters] = useState<Parameters>({
    amount: 0,
    term: 0,
    rate: 0,
    mortageType: "",
  });

  const [results, setResults] = useState<Results>({
    months: 0,
    moNominal: 0,
    moInterestOnly: 0,
    toDisplay: "",
    totalPayment: "",
    solved: false,
  });

  const [error, setError] = useState({
    amount: "",
    term: "",
    rate: "",
    mortageType: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    setParameters({ ...parameters, [property]: value });
  };

  const resetAll = () => {
    setResults({
      months: 0,
      moNominal: 0,
      moInterestOnly: 0,
      toDisplay: "",
      totalPayment: "",
      solved: false,
    });

    setParameters({
      amount: 0,
      term: 0,
      rate: 0,
      mortageType: "",
    });
  };

  const validateForm = () => {
    // const requiredFields = Object.keys(parameters) as (keyof Parameters)[];
    const requiredFields: (keyof Parameters)[] = [
      "amount",
      "term",
      "rate",
      "mortageType",
    ];
    for (const key of requiredFields) {
      if (parameters[key] === "" || parameters[key] === 0) {
        setError((prevError) => ({
          ...prevError,
          [key]: `You must enter a ${key}.`,
        }));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please complete all fields before submiting.");
      return;
    }
    try {
      const amount = parameters.amount;
      const term = parameters.term;
      const rate = parameters.rate;
      const mortageType = parameters.mortageType;

      const res = await calculateMortage(amount, term, rate, mortageType);
      setResults(res);
    } catch (err) {
      window.alert(error);
    }
  };

  return (
    <main className="bg-cyan-50 flex min-h-screen flex-col items-center justify-between lg:p-32 md:p-12">

      <div className="flex lg:flex-row md:flex-col sm:flex-col max-w-fit shadow-2xl lg:rounded-2xl">

        <div className="bg-white w-full lg:w-96 md:w-full sm:w-screen flex p-6 rounded-l-2xl md:rounded-t-2xl ">
          <div className="w-full">

              <form onSubmit={handleSubmit}>
                <div className="flex justify-between mb-8">
                  <h2 className="text-lg font-extrabold text-slate-900"> Mortgage Calculator </h2>
                  <button
                    className="text-gray-400 font-semibold underline text-xs"
                    type="button"
                    onClick={resetAll}
                  >
                    {" "}
                    Clear All
                  </button>
                </div>

                <div>
                  <div className="mb-6">
                    <label className="block text-xs text-gray-400 mb-2 font-semibold">
                      Mortgage Amount
                    </label>

                    <div className="flex flex-row rounded border-2 border-gray-200 hover:cursor-pointer hover:border-lime">
                      <div className="bg-cyan-50 text-gray-400 text-sm font-semibold w-8 text-center p-1">
                        {"$"}
                      </div>
                      <input
                        className="px-2 pb-1 mt-1 w-full"
                        id="amount"
                        type="number"
                        name="amount"
                        value={parameters.amount}
                        // placeholder="Enter the mortage amount."
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4 mt-5 flex lg:flex-row md:flex-row sm:flex-col lg:space-x-4 md:space-x-12">
                  
                    <div className="sm:mb-4">
                      <label className="block text-xs text-gray-400 mb-2 font-semibold">
                        Mortage Term
                      </label>
                      <div className="flex flex-row rounded border-2 border-gray-200">
                        <input
                          className="px-2 pb-1 mt-1 w-full h-full"
                          id="term"
                          type="number"
                          name="term"
                          value={parameters.term}
                          // placeholder="Years."
                          onChange={handleChange}
                          required
                        />
                        <div className="bg-cyan-50 text-gray-400 text-sm font-semibold w-14 text-center p-1">
                          {"years"}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <label className="block text-xs text-gray-400 mb-2 font-semibold">
                        Interest Rate
                      </label>
                      
                      <div className="flex flex-row rounded border-2 border-gray-200">
                        <input
                          className="px-2 pb-1 mt-1 w-full h-full"
                          id="rate"
                          type="number"
                          name="rate"
                          value={parameters.rate}
                          // placeholder="Interest rate (%)."
                          onChange={handleChange}
                          required
                        />
                        <div className="bg-cyan-50 text-gray-400 text-sm font-semibold w-8 text-center p-1">
                          {"%"}
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="my-8">
                    <label className="block text-xs text-gray-400 font-semibold">
                      Mortgage Type
                    </label>

 
                    <div className="flex flex-col items-start mt-2">
                      <label className="inline-flex items-cente border-2 min-w-full p-2 pl-3 rounded border-gray-200 hover:border-lime hover:cursor-pointer">
                        <input
                          type="radio"
                          className="form-radio"
                          name="mortageType"
                          value="repayment"
                          checked={parameters.mortageType === "repayment"}
                          onChange={handleChange}
                        />
                        <span className="ml-2 text-sm font-bold">Repayment</span>
                      </label>

                      <label className="mt-2 inline-flex items-cente border-2 min-w-full p-2 pl-3 rounded border-gray-200 hover:border-lime hover:cursor-pointer">
                        <input
                          type="radio"
                          className="form-radio"
                          name="mortageType"
                          value="interest-only"
                          checked={parameters.mortageType === "interest-only"}
                          onChange={handleChange}
                        />
                        <span className="ml-2 text-sm font-bold">Interest Only</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="lg:w-72 md:w-72 mt-8 flex font-bold text-sm bg-lime py-2 pl-12 pr-6 sm:place-content-center sm:px-0 rounded-3xl hover:bg-ligthlime sm:w-full"
                  >
                    <CalculatorIcon/>
                    {" "}
                    Calculate Repayments{" "}
                  </button>
                </div>
              </form>
            
          </div>
        </div>

        <div>
          {results.solved ? (
          <SuccessResult results={results} />
          ) : (
            <EmptyResult />
          )}
        </div>

      </div>
    </main>
  );
};
