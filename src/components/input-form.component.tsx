import { useRef } from "react";

type TInputFormProps = {
  onFileLoad: (value: File | undefined) => void;
};

export const InputForm = ({ onFileLoad }: TInputFormProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <h1>Load Quest</h1>
      <br />
      <input
        type="file"
        ref={ref}
        onChange={() => {
          onFileLoad(ref.current?.files?.[0]);
        }}
      />
    </>
  );
};
