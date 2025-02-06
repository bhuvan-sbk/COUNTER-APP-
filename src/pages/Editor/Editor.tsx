import React, { useState, useEffect, useRef, forwardRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

// ✅ Correctly type the forwarded ref for ReactQuill
const QuillEditor = forwardRef<ReactQuill, ReactQuillProps>((props, ref) => (
  <ReactQuill ref={ref} {...props} />
));

const Editor: React.FC = () => {
  const [value, setValue] = useState('');
  const quillRef = useRef<ReactQuill | null>(null); // ✅ Correctly typed ref

  // Load saved content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setValue(savedContent);
    }
  }, []);

  // Save content to localStorage with debounce to prevent excessive writes
  const saveContent = (content: string) => {
    setValue(content);
    setTimeout(() => {
      localStorage.setItem('editorContent', content);
    }, 500); // Debounce delay
  };

  return (
    <div className="editor-container">
      <h2>Rich Text Editor</h2>
      <QuillEditor
        theme="snow"
        value={value}
        onChange={saveContent}
        modules={modules}
        formats={formats}
        ref={quillRef} // ✅ Correctly typed ref
      />
      <div className="preview">
        <h3>Live Preview</h3>
        <div className="preview-content" dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
};

// ✅ Move toolbar configuration outside the component
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['clean'],
  ],
};

// ✅ Define allowed formats separately
const formats = [
  'header', 'bold', 'italic', 'underline',
  'list', 'bullet', 'blockquote', 'code-block'
];

export default Editor;
