import { EmptyImage } from "../assets/images";

export default function EmptyResult(){
    return (
        <div className="flex flex-col w-96 min-h-full bg-slate-900 p-6 rounded-bl-3xl rounded-r-2xl">
            <div className= "m-4 flex justify-center">
                <EmptyImage/>
            </div>
            <div className="flex flex-col">
                <h2 className="text-white text-xl text-center font-bold mb-4"> Results Shown Here</h2>
                <p className="text-gray-400 text-center text-xs mb-6">
                    Complete the form and click "calculate repayments" to 
                    see what your monthlly rapayments would be.
                </p>
            </div>
        </div>
    )
};
