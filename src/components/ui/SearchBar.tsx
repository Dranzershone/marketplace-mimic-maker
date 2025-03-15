
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  variant?: 'default' | 'minimal';
}

export function SearchBar({ className = '', placeholder = 'Search for anything...', variant = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`
        relative flex items-center w-full ${
          variant === 'default' 
            ? 'bg-white dark:bg-card rounded-full border border-border shadow-sm' 
            : 'bg-transparent'
        } ${className}`
      }
    >
      <div className="absolute left-3 text-muted-foreground">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`
          w-full py-2 bg-transparent outline-none text-foreground
          ${variant === 'default' ? 'pl-10 pr-4' : 'pl-8 pr-2'}
          placeholder:text-muted-foreground/70 focus:ring-0 border-none
        `}
        placeholder={placeholder}
        aria-label="Search"
      />
      {variant === 'default' && query.length > 0 && (
        <button
          type="submit"
          className="absolute right-3 rounded-full bg-primary text-white h-7 px-3 text-xs font-medium hover:bg-primary/90 transition-all"
        >
          Search
        </button>
      )}
    </form>
  );
}
