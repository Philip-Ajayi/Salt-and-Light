import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

// Quill modules and formats
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'clean'],
    ['link', 'image'],
  ],
};

const formats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
  'image', 'link',
];

const Note = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  const handleSaveAsDocx = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: parseHtmlToDocx(editorContent),
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'document.docx');
    });
  };

  const parseHtmlToDocx = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const children = [];

    Array.from(tempDiv.childNodes).forEach(node => {
      if (node.nodeName === 'P' || node.nodeName === 'DIV') {
        const paragraphChildren = Array.from(node.childNodes).map(child => {
          if (child.nodeName === 'B' || child.nodeName === 'STRONG') {
            return new TextRun({ text: child.textContent, bold: true });
          }
          if (child.nodeName === 'I' || child.nodeName === 'EM') {
            return new TextRun({ text: child.textContent, italics: true });
          }
          if (child.nodeName === 'U') {
            return new TextRun({ text: child.textContent, underline: true });
          }
          if (child.nodeName === 'A') {
            return new TextRun({
              text: child.textContent,
              bold: true, // Optional: make links bold
              hyperlink: child.href,
            });
          }
          // Handle text nodes
          return new TextRun({ text: child.textContent });
        });
        children.push(new Paragraph({ children: paragraphChildren }));
      }
      // Handle headers
      else if (node.nodeName === 'H1') {
        const headerChildren = Array.from(node.childNodes).map(child => new TextRun({ text: child.textContent, bold: true }));
        children.push(new Paragraph({ children: headerChildren, heading: HeadingLevel.HEADING_1 }));
      } else if (node.nodeName === 'H2') {
        const headerChildren = Array.from(node.childNodes).map(child => new TextRun({ text: child.textContent, bold: true }));
        children.push(new Paragraph({ children: headerChildren, heading: HeadingLevel.HEADING_2 }));
      }
      // Handle lists
      else if (node.nodeName === 'OL') {
        Array.from(node.children).forEach(item => {
          const listItemChildren = Array.from(item.childNodes).map(child => new TextRun({ text: child.textContent }));
          children.push(new Paragraph({ children: listItemChildren, bullet: { level: 0 } }));
        });
      } else if (node.nodeName === 'UL') {
        Array.from(node.children).forEach(item => {
          const listItemChildren = Array.from(item.childNodes).map(child => new TextRun({ text: child.textContent }));
          children.push(new Paragraph({ children: listItemChildren, bullet: { level: 0 } }));
        });
      }
    });

    return children;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Notebook</h2>
      <ReactQuill
        value={editorContent}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        className="border border-gray-300 rounded-lg mb-4 w-full"
      />
      <div className="flex space-x-2">
        <button
          onClick={handleSaveAsDocx}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
          Save as DOCX
        </button>
      </div>
    </div>
  );
};

export default Note;
