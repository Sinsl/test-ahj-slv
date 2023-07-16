import { arrPaySystem } from "./paySystem";

export default function defPaySystem(setValue) {
  const arrIdx = [];
  if (setValue.length === 1) {
    switch (setValue) {
      case "4":
        arrIdx.push(arrPaySystem.indexOf("visa"));
        break;
      case "2":
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        arrIdx.push(arrPaySystem.indexOf("mir"));
        break;
      case "3":
        arrIdx.push(arrPaySystem.indexOf("amex"));
        arrIdx.push(arrPaySystem.indexOf("jcb"));
        arrIdx.push(arrPaySystem.indexOf("diners"));
        break;

      case "5":
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        arrIdx.push(arrPaySystem.indexOf("diners"));
        break;
      case "6":
        arrIdx.push(arrPaySystem.indexOf("discover"));
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        break;
      default:
        arrIdx.push("Платежная система не определена");
        break;
    }
    return arrIdx;
  } else {
    if (setValue.substr(0, 1) === "4") {
      arrIdx.push(arrPaySystem.indexOf("visa"));
      return arrIdx;
    }
    const twoSymbols = setValue.substr(0, 2);
    switch (twoSymbols) {
      case "60":
        arrIdx.push(arrPaySystem.indexOf("discover"));
        break;
      case "22":
        arrIdx.push(arrPaySystem.indexOf("mir"));
        break;
      case "34":
        arrIdx.push(arrPaySystem.indexOf("amex"));
        break;
      case "35":
        arrIdx.push(arrPaySystem.indexOf("jcb"));
        break;
      case "53":
      case "27":
      case "58":
      case "67":
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        break;
      case "30":
      case "36":
      case "54":
      case "55":
        arrIdx.push(arrPaySystem.indexOf("diners"));
        break;
      default:
        arrIdx.push("Платежная система не определена");
        break;
    }
    return arrIdx;
  }
}
