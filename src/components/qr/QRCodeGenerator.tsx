import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  includeMargin?: boolean;
  downloadEnabled?: boolean;
}

export function QRCodeGenerator({
  value,
  size = 256,
  includeMargin = true,
  downloadEnabled = true
}: QRCodeGeneratorProps) {
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const svg = document.querySelector('.qr-code svg') as SVGElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qr-code.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="qr-code bg-white p-4 rounded-lg">
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          includeMargin={includeMargin}
        />
      </div>
      {downloadEnabled && (
        <button
          onClick={handleDownload}
          className="btn-secondary"
        >
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </button>
      )}
    </div>
  );
}