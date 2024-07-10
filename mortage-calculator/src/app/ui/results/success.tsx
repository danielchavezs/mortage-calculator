import { Results } from "@/app/types";

export default function SuccessResult ({ results }: { results: Results}){
    return (
        <div className="flex w-96 h-full bg-slate-900 p-8 rounded-bl-3xl rounded-r-2xl">
          <div>
            <h2 className="text-white text-xl font-bold mb-4"> Your results </h2>
            <p className="text-gray-400 text-sm mb-8">
              Your results are shown below based on the information you
              provided. To adjust results, edit the form and clic "calculate
              repayments" again.
            </p>

            <div className="bg-slate-920 border-t-lime border-b-0 border-x-0 border-2 p-4 rounded-md">
              <div className="mb-2">
                <h3 className="text-sm text-gray-300 font-semibold">
                  Your monthly repayments
                </h3>
                <p className="text-lime text-4xl font-bold mb-6 mt-3">
                {"$ "}{results.toDisplay}
                </p>
              </div>
              
              <hr className="border-gray-400"/>
              
              <div className="mt-2">
                <h3 className="text-sm text-gray-400 font-semibold">
                  Total you´ll repay over them
                </h3>
                <p className="text-white text-xl font-bold mb-2 mt-2">
                {"$ "}{results.totalPayment}
                </p>
              </div>
            </div>
          </div>
        </div>
    )
}