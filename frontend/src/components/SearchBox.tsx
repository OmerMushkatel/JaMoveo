import { useState, useEffect, useRef } from "react";

interface SearchBoxProps {
  placeholder?: string;
  suggestions?: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({
  placeholder,
  suggestions = [],
  value,
  onChange,
}: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setActiveIndex(-1);
  }, [inputValue, suggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const suggestion = filteredSuggestions[activeIndex];
      if (onChange) {
        const syntheticEvent = {
          target: { value: suggestion },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      } else {
        setInputValue(suggestion);
      }
      setShowSuggestions(false);
      setActiveIndex(-1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <div className="relative max-w-md">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
          stroke="black"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8.11113 15.2223C12.0385 15.2223 15.2223 12.0385 15.2223 8.11113C15.2223 4.18376 12.0385 1 8.11113 1C4.18376 1 1 4.18376 1 8.11113C1 12.0385 4.18376 15.2223 8.11113 15.2223Z" />
          <path d="M17 17L13.1777 13.1777" />
        </svg>

        <input
          className="bg-bg-secondary border-border w-full rounded-lg border px-10 py-4"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            } else {
              setInputValue(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
        />

        {showSuggestions && (
          <ul
            id="autocomplete-list"
            className="border-border absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border bg-white shadow-lg"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                id={`suggestion-${index}`}
                className={`cursor-pointer px-4 py-2 ${
                  index === activeIndex ? "bg-blue-500 text-white" : ""
                }`}
                onMouseDown={() => {
                  if (onChange) {
                    const syntheticEvent = {
                      target: { value: suggestion },
                    } as React.ChangeEvent<HTMLInputElement>;
                    onChange(syntheticEvent);
                  } else {
                    setInputValue(suggestion);
                  }
                  setShowSuggestions(false);
                  setActiveIndex(-1);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
