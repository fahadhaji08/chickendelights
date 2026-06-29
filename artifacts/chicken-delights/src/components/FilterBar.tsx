interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  const filters = [
    { id: 'all',        label: 'All Items' },
    { id: 'seekh',      label: '🔥 Seekh Kabab' },
    { id: 'kababs',     label: '🍢 Kababs & Patties' },
    { id: 'mutton',     label: '🥩 Mutton' },
    { id: 'fried',      label: '🍗 Fried & Snacks' },
    { id: 'samosa',     label: '🥟 Chicken Samosa' },
    { id: 'additional', label: '🍟 More Snacks' },
  ];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.id}
          className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
          onClick={() => setActiveFilter(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
