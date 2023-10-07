import { useStore } from "@nanostores/react";
import { quizData$ } from "../model/model";
import { useState } from "react";

type TQuizProps = {
  onPrev: VoidFunction;
};

export const Quiz = ({ onPrev }: TQuizProps) => {
  const data = useStore(quizData$);
  const [step, setStep] = useState<number>(0);
  const [counter, setCounter] = useState(0);

  const quest = data[step];

  if (step === data.length) {
    return (
      <>
        <button onClick={onPrev}>&lt;- Back</button>
        <h1>
          State: {step}/{data.length}
        </h1>
        Count: {counter}
      </>
    );
  }

  return (
    <>
      <button onClick={onPrev}>&lt;- Back</button>
      <h1>
        State: {step + 1}/{data.length}
      </h1>
      Count: {counter}
      <div>
        <h3>{quest.title}</h3>
        <div>
          {quest.options.map((option) => (
            <button
              key={option}
              onClick={() => {
                if (option === quest.answer) {
                  setCounter(counter + 1);
                }
                setStep(step + 1);
              }}
            >
              {option}
            </button>
          ))}
        </div>
        Answer: {quest.answer}
      </div>
    </>
  );
};
