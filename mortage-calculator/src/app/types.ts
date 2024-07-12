export interface Parameters {
    amount: number;
    term: number;
    rate: number;
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