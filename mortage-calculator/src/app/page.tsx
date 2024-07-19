"use client";

import { useEffect, useState } from "react";
import { calculateMortage } from "./actions/calculation";
import { CalculatorIcon } from "./ui/assets/images";
import { Parameters, Results } from "./types";
import SuccessResult from "./ui/results/success";
import EmptyResult from "./ui/results/empty";
import { inputsClass, inputsErrorClass, inputsLogo, inputsLogoError, radioLabels, radioSelectedLabel } from "./ui/assets/classes";
import formatAmount, { deformatAmount } from "./actions/formatAmount";

export default function Home() {
  const [parameters, setParameters] = useState<Parameters>({
    amount: "",
    term: "",
    rate: "",
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
    amount: false,
    term: false,
    rate: false,
    mortageType: false,
    count: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    let value = event.target.value;

    value = value.replace(/,/g, ''); // Remueve las comas para mantener la consistencia.
    setParameters({ ...parameters, [property]: (value) });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value.replace(/,/g, ''); // Remueve las comas para mantener la consistencia
    const formattedValue = formatAmount(value);
    setParameters({ ...parameters, [property]: formattedValue });
  };
  
  const resetErrors = () => {
    setError({
      amount: false,
      term: false,
      rate: false,
      mortageType: false,
      count: 0,
    });
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
      amount: "",
      term: "",
      rate: "",
      mortageType: "",
    });
    
    resetErrors();
  };
  
  const validateForm = async () => {
    resetErrors();
    const requiredFields: (keyof Parameters)[] = ["amount", "term", "rate", "mortageType"];
    let fieldsCompleted = true;
    
    const newErrors = { amount: false, term: false, rate: false, mortageType: false, count: 0 };
    for (const key of requiredFields) {
      if (parameters[key] === "") {
        newErrors[key] = true;
        fieldsCompleted = false;
        newErrors.count++
      };
    };
    setError(newErrors)
    return fieldsCompleted;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();
    console.log(isValid)
    
    if (!isValid) {
      console.log("ERRORS REGISTERED:", error);
      alert("Please complete all fields before submiting.");
      return;
    };
    try {
      const amount = deformatAmount(parameters.amount);
      const term = Number(parameters.term);
      const rate = Number(parameters.rate);
      const mortageType = parameters.mortageType;

      const res = await calculateMortage(amount, term, rate, mortageType);
      setResults(res);
    } catch (err) {
      window.alert(error);
    }
  };
  
  // useEffect(() => {
  //   setParameters((prevParams) => ({
  //     ...prevParams,
  //     amount: formatAmount(prevParams.amount),
  //   }));
  // }, [parameters.amount]);


  return (
    <main className="bg-sky-100 flex min-h-screen flex-col items-center justify-between lg:p-32 md:p-12">

      <div className="bg-white flex lg:flex-row md:flex-col md:rounded-2xl sm:flex-col max-w-fit shadow-2xl lg:rounded-2xl">

        <div className="bg-white w-full lg:w-96 md:w-full sm:w-screen flex p-6 rounded-l-2xl md:rounded-t-2xl">
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

                    <div className={error.amount? inputsErrorClass: inputsClass}>
                      <div className= {error.amount? inputsLogoError: inputsLogo}>
                        {"$"}
                      </div>
                      <input
                        className="px-2 pb-1 mt-1 w-full font-bold"
                        id="amount"
                        type="text"
                        name="amount"
                        value={parameters.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <span className={error.amount? "text-xs text-red": "hidden"}>This field is required</span>
                  </div>

                  <div className="mb-4 mt-5 flex lg:flex-row md:flex-row sm:flex-col lg:space-x-4 md:space-x-12">
                  
                    <div className="sm:mb-4">
                      <label className="block text-xs text-gray-400 mb-2 font-semibold">
                        Mortage Term
                      </label>
                      <div className={error.term? inputsErrorClass: inputsClass}>
                        <input
                          className="px-2 pb-1 mt-1 w-full h-full font-bold"
                          id="term"
                          type="number"
                          name="term"
                          value={parameters.term}
                          // placeholder="Years."
                          onChange={handleChange}
                          // required
                        />
                        <div className= {error.term? inputsLogoError: inputsLogo}>
                          {"years"}
                        </div>
                      </div>
                      <span className={error.term? "text-xs text-red": "hidden"}>This field is required</span>
                    </div>

                    <div className="">
                      <label className="block text-xs text-gray-400 mb-2 font-semibold">
                        Interest Rate
                      </label>
                      
                      <div className= {error.rate? inputsErrorClass: inputsClass}>
                        <input
                          className="px-2 pb-1 mt-1 w-full h-full font-bold"
                          id="rate"
                          type="number"
                          name="rate"
                          value={parameters.rate}
                          // placeholder="Interest rate (%)."
                          onChange={handleChange}
                          // required
                        />
                        <div className={error.rate? inputsLogoError: inputsLogo}>
                          {"%"}
                        </div>
                      </div>
                      <span className={error.rate? "text-xs text-red": "hidden"}>This field is required</span>
                    </div>
                  </div>

                  <div className="my-8">
                    <label className="block text-xs text-gray-400 font-semibold">
                      Mortgage Type
                    </label>

 
                    <div className="flex flex-col items-start mt-2">
                      <label className={parameters.mortageType === "repayment" ? radioSelectedLabel: radioLabels}>
                        <input
                          type="radio"
                          className="form-radio"
                          name="mortageType"
                          value="repayment"
                          checked={parameters.mortageType === "repayment"}
                          onChange={handleChange}
                          id="repayment"
                        />
                        {/* <span className="w-4 h-4 mr-2 border-2 border-gray-300 rounded-full peer-checked:border-lime peer-checked:bg-lime-500"></span> */}
                        <span className="ml-2 text-sm font-bold">Repayment</span>
                      </label> 

                      <label className={parameters.mortageType === "interest-only" ? radioSelectedLabel: radioLabels}>
                        <input
                          type="radio"
                          className="form-radio"
                          name="mortageType"
                          value="interest-only"
                          checked={parameters.mortageType === "interest-only"}
                          onChange={handleChange}
                          id="interest-only"
                        />
                        <span className="ml-2 text-sm font-bold">Interest Only</span>
                      </label>
                    </div>
                    <span className={error.mortageType? "text-xs text-red": "hidden"}>This field is required</span>
                  </div>

                </div>

                <div className="">
                  <button
                    type="submit"
                    className="lg:w-60 md:w-64 mt-8 flex font-bold text-sm bg-lime py-2 pl-12 pr-6 sm:place-content-center sm:px-0 rounded-3xl hover:bg-ligthlime sm:w-full"
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
