import React from "react";

function News() {
  const handleSubmit = async (e) => {
    alert("File Uploaded");
  };

  const retrieveFile = () => {
    alert("File selected");
  };

  return (
    <div className="App text-center">
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <input type="file" name="data" onChange={retrieveFile} />
          <button type="submit" className="btn btn-primary">
            Upload file
          </button>
        </form>
      </div>
    </div>
  );
}

export default News;
