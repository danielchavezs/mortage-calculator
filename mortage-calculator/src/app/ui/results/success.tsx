import { Results } from "@/app/types";

export default function SuccessResult ({ results }: { results: Results}){
    return (
        <div className="flex w-80 bg-slate-900 p-4 rounded-bl-lg m-1">
          <div>
            <h2 className="text-white text-xl font-bold mb-2"> Your Results </h2>
            <p className="text-gray-300 text-sm mb-6">
              Your results are shown below based on the information you
              provided. To adjust results, edit the form and clic "calculate
              repayments" again.
            </p>
            <div className="border-solid border-white">
              <div className="mb-2">
                <h3 className="text-md text-gray-300 font-semibold">
                  Your monthly repayments
                </h3>
                <p className="text-gray-300">
                {results.toDisplay}
                </p>
              </div>

              <div>
                <h3 className="text-md text-gray-300 font-semibold">
                  Total you´ll repay over them
                </h3>
                <p className="text-gray-300">
                {results.totalPayment}
                </p>
              </div>
            </div>
          </div>
        </div>
    )
}