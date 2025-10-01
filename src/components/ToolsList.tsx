import { Tool } from '../types/Tool';
import { Search } from 'lucide-react';

interface ToolsListProps {
  tools: Tool[];
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ToolsList({
  tools,
  selectedTool,
  onSelectTool,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  currentPage,
  totalPages,
  onPageChange
}: ToolsListProps) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Herramientas Digitales</h1>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar herramientas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tools.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No se encontraron herramientas
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className={`w-full p-4 text-left transition hover:bg-gray-50 ${
                  selectedTool?.id === tool.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{tool.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{tool.descripcion}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                  {tool.categoria}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
