import React, { useState } from 'react';
import navbackground from './imgs/bg-header-desktop.svg';
import Data from './data.json';

const MyApp = () => {
  const [searches, setSearches] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setSearches((prevSearches) => [...prevSearches, inputValue]);
      setInputValue("");
    }
  };

  const clearSearches = () => {
    setSearches([]);
    setInputValue(""); 
  };

  const deleteHighlitedWord = (index) => {
    const newSearches = [...searches];
    newSearches.splice(index, 1);
    setSearches(newSearches);
  };

  const filterJobs = (job) => {
    if (searches.length === 0) return true;
    const keywords = [job.position, job.company, ...job.languages, ...job.tools];
    return searches.every((search) =>
      keywords.some((keyword) => keyword.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const filteredJobs = Data.filter(filterJobs);

  return (
    <div className="app-container">
      <div className="nav">
        <img className="nav-img" src={navbackground} alt="" />
        <div className="searchbar">
          <div className="searchbar-input-container">
            {searches.map((search, index) => (
              <div key={index} className="highlighted-word-container">
                <span className="highlighted-word">{search}</span>
                <button
                  className="delete-searched-word"
                  onClick={() => deleteHighlitedWord(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a word and press Enter"
              className="search-input"
            />
          </div>
          <button className="clear-btn" onClick={clearSearches}>Clear</button>
        </div>
      </div>
      {/* jobs container */}
      <div className="job-container">
        {filteredJobs.map((job) => (
          <div className="box" key={job.id}> 
            <div className="left">
              <img className="logo-img" src={job.logo} alt={job.company} />
            </div>
            <div className="right"> 
              <div className="title">
                <h1>{job.company}</h1>
                <div className="feaNew">
                  {job.new && <span className="new-job">NEW</span>}
                  {job.featured && <span className="featured">FEATURED</span>}
                </div>
              </div>
              <div className="position-lang"> 
                <h2>{job.position}</h2>
                <div className="languages">
                  {job.languages.map((language, index) => (
                    <span key={index} className="language">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApp;