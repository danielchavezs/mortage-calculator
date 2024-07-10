import Image from "next/image";

export function CalculatorIcon (){
    return (
        <Image
        src="./icon-calculator.svg"
        alt="calculator-icon" 
        width={24} 
        height={24} 
        className="mr-2"
        />
    )
}

export function EmptyImage (){
    return(
        <Image
        src="/illustration-empty.svg"
        // src="/mortage-calculator/public/illustration-empty.svg"
        // src="./illustration-empty.svg"
        // src="../assets/illustration-empty.svg"
        alt="empty-result-alternative-text"
        width={192}
        height={192}
        layout="intrinsic"
        className="z-50"
        />
    )
}