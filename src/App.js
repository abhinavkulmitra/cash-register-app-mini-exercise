import "./styles.css";
import { useRef, useState } from "react";

function CashRegister({ bill, cash, cashAmountRef }) {
  if (bill > cash) {
    return (
      <div>
        You need to pay {bill - cash} amount more !{" "}
        <button onClick={() => cashAmountRef.current.focus()}>OK</button>{" "}
      </div>
    );
  } else if (bill === cash) {
    return <h2>Nothing to return :)</h2>;
  } else {
    const dataOfAmount = [
      {
        currencyAmount: 2000,
        noOfNotes: 0
      },
      {
        currencyAmount: 500,
        noOfNotes: 0
      },
      {
        currencyAmount: 200,
        noOfNotes: 0
      },
      {
        currencyAmount: 100,
        noOfNotes: 0
      },
      {
        currencyAmount: 50,
        noOfNotes: 0
      },
      {
        currencyAmount: 20,
        noOfNotes: 0
      },
      {
        currencyAmount: 10,
        noOfNotes: 0
      },
      {
        currencyAmount: 5,
        noOfNotes: 0
      },
      {
        currencyAmount: 1,
        noOfNotes: 0
      }
    ];

    let toBeReturnedCash = cash - bill;

    for (let i = 0; i < dataOfAmount.length; i++) {
      if (toBeReturnedCash >= dataOfAmount[i].currencyAmount) {
        dataOfAmount[i].noOfNotes = Math.floor(
          toBeReturnedCash / dataOfAmount[i].currencyAmount
        );

        toBeReturnedCash = toBeReturnedCash % dataOfAmount[i].currencyAmount;
      }
    }

    return dataOfAmount.map((cur) =>
      cur.noOfNotes !== 0 ? (
        <p>
          No. of notes of {cur.currencyAmount}₹ : {cur.noOfNotes}
        </p>
      ) : (
        ""
      )
    );
  }
}

export default function App() {
  const billAmountRef = useRef(0);
  const cashAmountRef = useRef(0);
  const [billAmountState, setBillAmountState] = useState();
  const [cashState, setCashState] = useState();
  const [attribute, setAttribute] = useState("disabled");

  return (
    <div className="App">
      <h1>Cash register</h1>
      <form
        onSubmit={(e) => {
          setBillAmountState(billAmountRef.current.value);
          setCashState(cashAmountRef.current.value);
          e.preventDefault();
        }}
      >
        <div>
          <label>Bill Amount</label>
          <input
            type="number"
            placeholder="Bill amount"
            required
            ref={billAmountRef}
            onChange={() =>
              setAttribute(billAmountRef.current.value !== "" ? "" : "disabled")
            }
          />
        </div>
        <div>
          <label>Cash</label>
          <input
            placeholder="Cash amount"
            required
            ref={cashAmountRef}
            disabled={attribute}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <CashRegister
        bill={Number(billAmountState)}
        cash={Number(cashState)}
        cashAmountRef={cashAmountRef}
      />
    </div>
  );
}
