interface Props {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;     // add this
  quantity: string;
  onQuantityChange: (value: string) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
  gender,
  onGenderChange,
  quantity,
  onQuantityChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Gender Filter */}
      <select
        value={gender}
        onChange={(e) => onGenderChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unisex">Unisex</option>
      </select>

      {/* Quantity Filter */}
      <select
        value={quantity}
        onChange={(e) => onQuantityChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Quantities</option>
        <option value="1-10">1-10</option>
        <option value="11-50">11-50</option>
        <option value="50+">50+</option>
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort by Price</option>
        <option value="asc">Low → High</option>
        <option value="desc">High → Low</option>
      </select>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded flex-1"
      />
    </div>
  );
}
