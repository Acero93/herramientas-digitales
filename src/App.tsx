import { useState, useMemo } from 'react';
import { Tool } from './types/Tool';
import { ToolsList } from './components/ToolsList';
import { ToolDetail } from './components/ToolDetail';
import toolsData from './data/tools.json';

const ITEMS_PER_PAGE = 6;

function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tools: Tool[] = toolsData;

  const categories = useMemo(() => {
    const uniqueCategories = new Set(tools.map(tool => tool.categoria));
    return Array.from(uniqueCategories).sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || tool.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTools, currentPage]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-100">
      <div className="lg:w-1/3 lg:max-w-md flex flex-col h-1/2 lg:h-full">
        <ToolsList
          tools={paginatedTools}
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="flex-1 h-1/2 lg:h-full">
        <ToolDetail tool={selectedTool} />
      </div>
    </div>
  );
}

export default App;
