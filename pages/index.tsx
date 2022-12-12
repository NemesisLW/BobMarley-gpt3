import { useState } from "react";
import Head from "next/head";


const Home = () => {
  const [userInput, setUserInput] = useState("");

  //API Call
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied....", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangeText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | Arghya</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Bob Marley</h1>
          </div>
          <div className="header-subtitle">
            <h2>"So much trouble in the world. All you got to do: give a little. "</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Anything you want Bob Marley to write a song about..."
            className="prompt-box"
            value={userInput}
            onChange={onUserChangeText}
          />

          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
          {/* Output */}
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/Arghyad18"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>build by Arghya</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
