import { Tool } from '../types/Tool';
import { ExternalLink, Tag, Link as LinkIcon } from 'lucide-react';

interface ToolDetailProps {
  tool: Tool | null;
}

export function ToolDetail({ tool }: ToolDetailProps) {
  if (!tool) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <LinkIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Selecciona una herramienta
          </h2>
          <p className="text-gray-600 max-w-md">
            Haz clic en cualquier herramienta de la lista para ver sus detalles completos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-3xl mx-auto p-8 lg:p-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8">
            <h2 className="text-3xl font-bold text-white mb-2">{tool.nombre}</h2>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-100" />
              <span className="text-blue-100 font-medium">{tool.categoria}</span>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Descripción
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {tool.descripcion}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                URL
              </h3>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium break-all transition"
              >
                <LinkIcon className="w-4 h-4 flex-shrink-0" />
                <span className="underline">{tool.url}</span>
              </a>
            </div>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm hover:shadow-md"
            >
              Visitar sitio web
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Esta información se obtiene del archivo <code className="px-1 py-0.5 bg-blue-100 rounded">src/data/tools.json</code>.
            Puedes modificarlo para agregar o editar herramientas.
          </p>
        </div>
      </div>
    </div>
  );
}
