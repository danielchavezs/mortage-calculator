import { Results } from "@/app/types";

export default function SuccessResult ({ results }: { results: Results}){
    return (
        <div className="flex flex-col w-full sm:max-w- lg:w-96 min-h-full bg-slate-900 p-8 rounded-bl-5xl lg:rounded-r-2xl md:rounded-b-2xl md:rounded-t-none sm:rounded-none">
          <div>
            <h2 className="text-white text-xl font-bold mb-4"> Your results </h2>
            <p className="text-gray-400 text-xs mb-8">
              Your results are shown below based on the information you
              provided. To adjust results, edit the form and clic "calculate
              repayments" again.
            </p>

            <div className="bg-slate-920 border-t-lime border-b-0 border-x-0 border-2 p-6 rounded-md">
              <div className="mb-2">
                <h3 className="text-sm text-gray-500 font-semibold">
                  Your monthly repayments
                </h3>
                <p className="text-lime text-5xl sm:text-4xl font-bold mb-6 sm:mb-3 mt-3">
                {"$ "}{results.toDisplay}
                </p>
              </div>
              
              <hr className="border-gray-600"/>
              
              <div className="mt-6 sm:mt-3">
                <h3 className="text-sm text-gray-500 font-semibold">
                  Total you´ll repay over them
                </h3>
                <p className="text-white text-xl font-bold mb-2 mt-1">
                {"$ "}{results.totalPayment}
                </p>
              </div>
            </div>
          </div>
        </div>
    )
};