import React from "react";
import "./Newscss.css";

 const Newsitem =(props)=> {
  
  let { title, description, imageurl, newsurl, author, date, source } =
    props;
  return (
    <>
 <div className="card container">
   <span className="position-absolute top-0  sourcetag translate-middle badge rounded-pill bg-danger"> {" "} {source}{" "} </span>
   <img src={!imageurl ? "news_img.jpg" : imageurl} className="card-img-top newsimgitem" alt="..." />
   <div className="card-body">
     <h5 className="card-title">{title}.... </h5>
     <p className="card-text">{description}...</p>
     <p className="card-text"><small className="text-muted"> {" "}  By {!author ?"Unknown" : author} on{" "} {new Date(date).toGMTString()}{" "} </small> </p>
     <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark" > Read More </a>
   </div>
 </div>
    </>
    );
}

export default Newsitem;
