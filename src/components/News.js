import React, { useEffect ,useState } from "react";
import "./Newscss.css";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(false)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

  const updatenews = async ()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    //loading ho tab tak chakra gumane ke liye
    let data = await fetch(url); // yaha hum data ka intejar kar rahe he
    props.setProgress(30)
    let parsedData = await data.json(); //yaha hum data ko json amin convert hone ka intejar kar rahe ahi
    props.setProgress(70)
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    console.log(parsedData);
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `${props.category} - News Monkey`
    updatenews();
    }, [])

const  fetchMoreData = async ()=> {

  setpage(page+1)
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d69d3aec52374185b20d35b2ee5c60ea&page=${page}&pageSize=${props.pageSize}`;
  let data = await fetch(url); // yaha hum data ka intejar kar rahe he
  let parsedData = await data.json(); //yaha hum data ko json amin convert hone ka intejar kar rahe ahi
  console.log(parsedData);
  setarticles(articles.concat(parsedData.articles))
  settotalResults( parsedData.totalResults)

}

    return (
      <>
        <h1 className="Mytitle heading">NewsMonkey - Top {props.category} Headline</h1>
        {loading && <Spinner />}{" "}
        {/* If Loading true then only show Spinner*/}

<InfiniteScroll
    dataLength ={articles.length} 
    next = {fetchMoreData} 
    hasMore ={articles.length !== totalResults} 
    loader ={<Spinner/>} >

<div className="container">
   <div className="row">
     {articles.map((element) => {
         return (
           <div className="col-md-4 my-3" key={element.url}>
             {/* Total space of column in grid in bootstrap is 12 and it takes 4 column(md-4) of it */}
             <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={ element.description ? element.description.slice(0, 88) : "" } imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
           </div>
           )
       })}
       </div> 
     </div>
</InfiniteScroll>
        
      </>
    );}

export default News;

 

//   constructor(props) {
//     // If we write this constructor in newsitem then how many times we call item it is show that time in console
//     super(props);
//     //  console.log("I am constructor from Newscom "); //First this show in console
//     this.state = {
//       articles: this.articles, // this line should update by  -- articles:[], -- if we want to remove array of articles of news
//       loading: false, // loading ke time Chakra Dikhane ke liye
//       page: 1,
//       totalResults: 0
//     };
//     document.title = `${props.category} - News Monkey`
//   }

//   async updatenews() {
//     props.setProgress(10)
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
//     this.setState({ loading: true }); //loading ho tab tak chakra gumane ke liye
//     let data = await fetch(url); // yaha hum data ka intejar kar rahe he
//     props.setProgress(30)
//     let parsedData = await data.json(); //yaha hum data ko json amin convert hone ka intejar kar rahe ahi
//     props.setProgress(70)
//     console.log(parsedData);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });
//     props.setProgress(100)
//   }

//   async componentDidMount() {
//     //this is useful for taking data from API
//     // console.log("cdm"); //Third this show in console bcz first render methid run and then componentDidMount method runs 
//     this.updatenews();
//   }

// fetchMoreData = async()=>{
//   this.setState({ page: this.state.page +1})
//   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d69d3aec52374185b20d35b2ee5c60ea&page=${this.state.page}&pageSize=${props.pageSize}`;
//   // this.setState({ loading: true }); //loading ho tab tak chakra gumane ke liye
//   let data = await fetch(url); // yaha hum data ka intejar kar rahe he
//   let parsedData = await data.json(); //yaha hum data ko json amin convert hone ka intejar kar rahe ahi
//   console.log(parsedData);
//   this.setState({
//     articles: this.state.articles.concat(parsedData.articles),
//     totalResults: parsedData.totalResults,
//     loading: false,
//   });
// }

//   render() {
//     //   console.log("render"); //second this show in console
//     return (
//       <>
//         <h1 className="Mytitle">NewsMonkey - Top {props.category} Headline</h1>
//         {this.state.loading && <Spinner />}{" "}
//         {/* If Loading true then only show Spinner*/}

// <InfiniteScroll
//     dataLength ={this.state.articles.length} 
//     next = {this.fetchMoreData} 
//     hasMore ={this.state.articles.length !== this.state.totalResults} 
//     loader ={<Spinner/>} >

// <div className="container">
//    <div className="row">
//      {this.state.articles.map((element) => {
//          return (
//            <div className="col-md-4 my-3" key={element.url}>
//              {/* Total space of column in grid in bootstrap is 12 and it takes 4 column(md-4) of it */}
//              <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={ element.description ? element.description.slice(0, 88) : "" } imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//            </div>
//            )
//        })}
//        </div> 
//      </div>
// </InfiniteScroll>
        
//       </>
//     );}}

// export default News;
