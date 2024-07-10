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
    toDisplay: 0,
    totalPayment: 0,
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
      toDisplay: 0,
      totalPayment: 0,
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
    <main className="bg-cyan-100 flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-wrap min-w-fit bg-orange-600 border-solid border-2 border-green-700 rounded-xl">

        <div className="bg-white w-96 h-96 rounded-2xl flex items-center shrink-0 p-6">
          <div className="main container">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between mb-4">
                  <h2 className="text-l font-bold"> Mortage Calculator </h2>
                  <button
                    className="text-gray-500 underline text-xs"
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
                      value={parameters.amount}
                      placeholder="Enter the mortage amount."
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4 flex">
                    <div className="mr-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Mortage term
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black placeholder-gray-500"
                        id="term"
                        type="number"
                        name="term"
                        value={parameters.term}
                        placeholder="Years."
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="ml-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Interest Rate
                      </label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black placeholder-gray-500"
                        id="rate"
                        type="number"
                        name="rate"
                        value={parameters.rate}
                        placeholder="Interest rate (%)."
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mt-4 block text-sm font-medium text-gray-700">
                      Mortage Type
                    </label>

 
                    <div className="flex flex-col items-start mt-2">
                      <label className="inline-flex items-center border-black">
                        <input
                          type="radio"
                          className="form-radio"
                          name="mortageType"
                          value="repayment"
                          checked={parameters.mortageType === "repayment"}
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
                          checked={parameters.mortageType === "interest-only"}
                          onChange={handleChange}
                        />
                        <span className="ml-2">Interest Only</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="flex text-slate-900 text-sm pt-3 pb-3 bg-lime p-1 pl-6 pr-6 rounded-3xl"
                  >
                    <CalculatorIcon/>
                    {" "}
                    Calculate Repayments{" "}
                  </button>
                </div>
              </form>
            </div>
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
}
