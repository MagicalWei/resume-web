import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { AIGCVideoAgentPreview } from '../src/components/AIGCVideoAgentPreview';

try {
  const html = ReactDOMServer.renderToString(
    React.createElement(AIGCVideoAgentPreview, { isOpen: true, onClose: () => {} })
  );
  console.log("RENDER SUCCESS, length:", html.length);
} catch (err) {
  console.error("RENDER FAILED:", err);
}
