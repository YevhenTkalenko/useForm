/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubmitHandler, useForm } from "react-hook-form";
import "./App.scss";
import { useEffect } from "react";

interface IForm {
  email: string;
  message: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    watch,
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
  });

  reset({
    email: '"test@test.com"',
    message: "test message",
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(getValues("email"));
    reset();
  };

  const errorInput = formState.errors.email;
  const errorTextArea = formState.errors.message;

  return (
    <>
      <h1>Vite + React</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter your email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errorInput && <div style={{ color: "red" }}>{errorInput.message}</div>}
        <div style={{ color: "red" }}></div>
        <textarea
          placeholder="Enter yout message"
          {...register("message", {
            required: "This field is required",
            minLength: {
              value: 2,
              message: "Message must be at least 2 characters",
            },
          })}
        ></textarea>
        {errorTextArea && (
          <div style={{ color: "red" }}>{errorTextArea?.message}</div>
        )}
        <button type="submit">Send your message</button>
      </form>
    </>
  );
}

export default App;
