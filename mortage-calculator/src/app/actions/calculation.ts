export async function calculateMortage (amount: number, term: number, rate: number, mortageType: string){
    if (!amount || !term || !rate || !mortageType){
        throw new Error ("Please complete all the fields before submitting.")
    };

    const months = term * 12;
    const nmInterest = rate / 12 / 100;
    const emInterest = (Math.pow(1 + (rate / months), months)) - 1;
    const anInterest = emInterest * 12;

    const moNominal = (amount * nmInterest * Math.pow(1 + nmInterest, months)) / ((Math.pow(1 + nmInterest, months)) - 1);
    const moInterestOnly = nmInterest * amount;
    
    let totalPayment = 0;
    let toDisplay = 0;

    if (mortageType === "repayment"){
        toDisplay = moNominal;
        totalPayment = moNominal * months;
    } else if (mortageType === "OI"){
        toDisplay = moInterestOnly;
        totalPayment = (moInterestOnly * months) + amount;
    } else { throw new Error ("Please select a valid mortage type.")};

    return {
        months,
        moNominal,
        moInterestOnly,
        toDisplay,
        totalPayment,
    }
};