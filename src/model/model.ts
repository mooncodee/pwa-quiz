import { atom } from "nanostores";

type TQuestion = {
  id: string;
  title: string;
  options: Array<string>;
  answer: string;
};

type TError = {
  message: string;
};

export const isMessageError = (error: unknown): error is TError => {
  return !!error && typeof error === "object" && "message" in error;
};

export const quizData$ = atom<Array<TQuestion>>([]);

export const readFile = (
  file: File,
  onLoad: (value: string | null | ArrayBuffer) => void,
  onError: (error: DOMException | null) => void
) => {
  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function () {
    onLoad(reader.result);
  };

  reader.onerror = function () {
    onError(reader.error);
  };
};

export const loadFileData = (data: string | ArrayBuffer | null) => {
  if (typeof data !== "string") return;
  try {
    const fileData = JSON.parse(data);
    if ("data" in fileData) {
      return quizData$.set(fileData.data);
    }
    throw new Error();
  } catch {
    throw new Error("Error in parse data or in data format");
  }
};
