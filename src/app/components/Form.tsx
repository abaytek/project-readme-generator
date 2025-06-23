import { useState } from "react";
import { FormData } from "../page";

const Form = ({
  onSubmit,
  isGenerating,
  onStop,
}: {
  onSubmit: (data: FormData) => void;
  isGenerating: boolean;
  onStop: () => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    techStacks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
          placeholder="My Awesome Project"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
          placeholder="A brief description of your project..."
        />
      </div>

      <div>
        <label
          htmlFor="techStacks"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Technologies Used
        </label>
        <input
          type="text"
          id="techStacks"
          name="techStacks"
          value={formData.techStacks}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
          placeholder="React, TypeScript, Next.js, TailwindCSS"
        />
        <p className="mt-1 text-xs text-gray-400">
          Separate technologies with commas
        </p>
      </div>

      <div className="pt-2">
        {isGenerating ? (
          <button
            type="button"
            onClick={onStop}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Stop Generating
          </button>
        ) : (
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-amber-500/20"
          >
            Generate README
          </button>
        )}
      </div>
    </form>
  );
};


export default Form