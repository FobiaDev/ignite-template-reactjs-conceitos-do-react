import { useState, useRef } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const newTaskInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask() {
    newTaskInput.current?.value &&
      setTasks((prev) => {
        const newTask = {
          id: Math.floor(Math.random() * (999 - 1 + 1)) + 1,
          title: newTaskInput.current?.value as string,
          isComplete: false,
        };
        return [...prev, newTask];
      });
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks((prev) => {
      const source = prev.filter((task) => task.id !== id);
      const target = prev.filter((task) => task.id === id)[0];

      if (target.isComplete) {
        return [
          Object.assign(target, { isComplete: !target.isComplete }),
          ...source,
        ];
      } else {
        return [
          ...source,
          Object.assign(target, { isComplete: !target.isComplete }),
        ];
      }
    });
  }

  function handleRemoveTask(id: number) {
    setTasks((prev) => [...prev.filter((task) => task.id !== id)]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            ref={newTaskInput}
            type="text"
            placeholder="Adicionar novo todo"
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
