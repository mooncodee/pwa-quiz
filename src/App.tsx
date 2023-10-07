import { useEffect, useState } from "react";
import { Quiz } from "./components/quiz.component";
import { InputForm } from "./components/input-form.component";
import { isMessageError, readFile, loadFileData } from "./model/model";

function App() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [step]);

  const handleFileLoad = (file: File | undefined) => {
    if (!file) return;

    readFile(
      file,
      (file) => {
        try {
          loadFileData(file);
        } catch (error) {
          if (isMessageError(error)) {
            return setError(error.message);
          }
          console.error("Error in load file data");
        }
        setStep(1);
      },
      console.log
    );
  };

  if (step === 0)
    return (
      <>
        <p style={{ color: "red" }}>{error}</p>
        <br />
        <InputForm onFileLoad={handleFileLoad} />
      </>
    );

  return <Quiz onPrev={() => setStep(0)} />;
}

export default App;
