export default function formatAmount (amount: number){
    const amountString = `${amount}`
    const newArr: string[] = []

    if (amountString.includes(".")){
        console.log("Ejecutando caso CON decimal")
        const amountArr = amountString.split(".");
        const wholeNumArr = amountArr[0].split("").reverse();

        for (let i = 0; i < wholeNumArr.length; i++){
            newArr.push(wholeNumArr[i]);
            if ((i + 1) % 3 === 0 && i < wholeNumArr.length - 1){
                newArr.push(",");
            };
        };
        // console.log("tiene decimal", amountArr[0], amountArr[1], newArr)
        const formatedNumber = newArr.reverse().join("") + "." + amountArr[1];
        console.log(formatedNumber)
        return formatedNumber;
    } else{
        console.log("Ejecutando caso SIN decimal")
        const wholeNumArr = amountString.split("").reverse();

        for (let i = 0; i < wholeNumArr.length; i++){
            newArr.push(wholeNumArr[i]);
            if ((i + 1) % 3 === 0 && i < wholeNumArr.length - 1){
                newArr.push(",");
            };
        };
        const formatedNumber = newArr.reverse().join("");
        console.log(formatedNumber)
        return formatedNumber;
    };
};