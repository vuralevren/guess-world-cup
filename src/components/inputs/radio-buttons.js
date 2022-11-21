/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const memoryOptions = [
  { name: "Gs", inStock: true },
  { name: "None", inStock: true },
  { name: "Fb", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RadioButtons() {
  const [mem, setMem] = useState(memoryOptions[2]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">First Goal</h2>
      </div>

      <RadioGroup value={mem} onChange={setMem} className="mt-2">
        <RadioGroup.Label className="sr-only">
          Choose a memory option
        </RadioGroup.Label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {memoryOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.inStock
                    ? "cursor-pointer focus:outline-none"
                    : "opacity-25 cursor-not-allowed",
                  active ? "ring-2 ring-offset-2 ring-pink-500" : "",
                  checked
                    ? "bg-pink-600 border-transparent text-white hover:bg-pink-700"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                )
              }
              disabled={!option.inStock}
            >
              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
