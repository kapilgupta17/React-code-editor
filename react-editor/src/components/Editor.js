import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default function Editor(){
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');

    const languages = ['javascript','markup', 'css'];
    
    const handleLanguageChange = (e) =>{
        setLanguage(e.target.value);
    }
    const handlecodeChange = (e) =>{
        setCode(e.target.value);
    }
    

    const handleKeyDown = (e) => {
        let value = code,
          selStartPos = e.currentTarget.selectionStart;
    
        
        if (e.key === 'Tab') {
          value =
            value.substring(0, selStartPos) +
            '    ' +
            value.substring(selStartPos, value.length);
          e.currentTarget.selectionStart = selStartPos + 3;
          e.currentTarget.selectionEnd = selStartPos + 4;
          e.preventDefault();
    
          setCode(value);
        }
      };

      useEffect(()=>{
        Prism.highlightAll();
      },[code, language])

   

    return(
        <>
        <div className="deciders">
        <label>Language: </label>
        <select value={language} onChange={handleLanguageChange}>
          {languages.map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
        </div>
        <div className="editor">
            <textarea className='input' onChange={handlecodeChange} value={code} onKeyDown={handleKeyDown}/>
            <pre className='output'>
                <code className={`language-${language}`} theme='dark'>{code}</code>
            </pre>
        </div>
        </>
       
    
    )
}