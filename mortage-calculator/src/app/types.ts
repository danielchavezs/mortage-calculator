export interface Parameters {
    amount: string;
    term: string;
    rate: string;
    mortageType: string;
  }
  
export interface Results {
    months: number;
    moNominal: number;
    moInterestOnly: number;
    toDisplay: string;
    totalPayment: string;
    solved: boolean;
  }