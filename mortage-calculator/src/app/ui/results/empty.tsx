import { EmptyImage } from "../assets/images";

export default function EmptyResult(){
    return (
        <div className="flex flex-col w-full sm:max-w- lg:w-96 min-h-full bg-slate-900 p-8 lg:rounded-r-2xl md:rounded-b-2xl md:rounded-t-none sm:rounded-none rounded-bl-5xl"> 
            <div className= "mb-4 mt-14 flex justify-center">
                <EmptyImage/>
            </div>
            <div className="flex flex-col">
                <h2 className="text-white text-xl text-center font-bold mb-4"> Results Shown Here</h2>
                <p className="text-gray-400 text-center text-xs mb-6">
                    Complete the form and click "calculate repayments" to 
                    see what your monthly rapayments would be.
                </p>
            </div>
        </div>
    )
};
