'use client';

import React, { useState, useEffect } from 'react';

const TerminalPage = () => {
  const [code, setCode] = useState('');
  const [index, setIndex] = useState(0);
  const loremIpsum = `
  // This is a Hackertyper effect.
  // No real code here, just a fun simulation!

  function simulateHacking() {
    // Generate random code snippets
    const codeSnippets = [
      "Initializing security protocols...",
      "Scanning network for vulnerabilities...",
      "Attempting brute force attack...",
      "Bypassing firewall...",
      "Injecting malicious code...",
      "Accessing restricted data...",
      "Decrypting secure files...",
      "Disabling security measures...",
      "Escalating privileges...",
      "Covering tracks..."
    ];

    // Return a random code snippet
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  }

  // Main function to generate the hacking code
  async function generateHackingCode(lines = 20) {
    let hackingCode = "";
    for (let i = 0; i < lines; i++) {
      hackingCode += simulateHacking() + "\\n";
      // Simulate delay to make it look like real hacking
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return hackingCode;
  }

  // Generate and display the hacking code
  generateHackingCode().then(hackingCode => {
    console.log(hackingCode);
  });
  `;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCode(prevCode => prevCode + loremIpsum[index]);
      setIndex(prevIndex => prevIndex + 1);
    }, 5);

    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <pre className="text-green-500 font-mono text-sm w-full p-4">{code}</pre>
    </div>
  );
};

export default TerminalPage;
