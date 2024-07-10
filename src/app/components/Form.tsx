import React, { useState } from "react";
import { DEFAULT_README } from "../constants";
import { FaSpinner } from "react-icons/fa";

interface Props {
  readme: string;
  setReadme: React.Dispatch<React.SetStateAction<string>>;
}

const Form = ({ readme, setReadme }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStacks, setTechStacks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      techStacks,
    };

    try {
      setLoading(true);
      const response = await fetch("/api/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setReadme(data.readme);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-8 ">
          <label className="antialiased font-bold w-20">Title</label>
          <input
            type="text"
            className="bg-gray-900 p-3 font-medium outline-none border-none w-3/4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <label className="antialiased font-bold w-30">Description</label>
          <textarea
            className=" bg-gray-900 p-3 font-medium outline-none border-none w-3/4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <label className="antialiased font-bold">Tech Stacks </label>
          <input
            type="text"
            className=" bg-gray-900 p-3 font-medium outline-none border-none w-3/4"
            value={techStacks}
            onChange={(e) => setTechStacks(e.target.value)}
            required
          />
        </div>

        <button
          className="bg-gradient-to-tr flex justify-center w-1/2 self-center my-6 from accent-amber-400 via-inherit to-black border-2 border-slate-100 px-4 py-2 "
          type="submit"
        >
          {loading ? (
            <FaSpinner className="animate-spin text-xl text-center" />
          ) : (
            "Generate README"
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
