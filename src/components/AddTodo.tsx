import React, { ChangeEvent, FormEvent } from "react";

type AddTodoProps = {
  task: string;
  priority :string;
  handleChangeText: (e: ChangeEvent) => void;
  handleChangePriority: (e: ChangeEvent) => void;
  handleSubmit: (e: FormEvent) => void;
};

export const AddTodo = ({ task , priority, handleChangeText , handleChangePriority , handleSubmit }: AddTodoProps) => {
  return (
    <form
      className="w-12/12 flex flex-col justify-center items-center mb-4"
      onSubmit={handleSubmit}
    >
      <div className="w-8/12 m-2 ">
      <label>Task</label>
      <input
        className=" w-12/12 flex rounded shadow p-2 text-gray-700 "
        type="text"
        name="task"
        placeholder="Add todo..."
        value={task}
        onChange={handleChangeText}
      />
      </div>
      <div className="w-8/12 m-2 " >
      <label>Priority</label>
       <input
        className=" w-12/12 flex rounded shadow p-2 text-gray-700 "
        type="text"
        name="priority"
        placeholder="priority 1-5..."
        value={priority}
        onChange={handleChangePriority}
      />
      </div>
   
  
      <button
        className={`
            flex justify-center items-center  text-lg font-bold rounded-3xl mt-5 m-1 p-3
            ${task === "" ? "bg-gray-400" : "bg-green-500"}
        `}
        aria-label="A submit button"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
};
