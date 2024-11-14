import React from 'react';
import { Copy } from 'lucide-react';
import { Toast } from '../notifications/Toast';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [showToast, setShowToast] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setShowToast(true);
  };

  return (
    <div className="relative">
      <div className="absolute right-2 top-2">
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-400 hover:text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-gray-100`}>
          {code}
        </code>
      </pre>
      {showToast && (
        <Toast
          type="success"
          message="Code copied to clipboard"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}