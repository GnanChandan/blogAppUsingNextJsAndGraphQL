import React from "react";
import moment from "moment";
const PostDetail = ({ post }) => {

  let getContentFragment = (index,text,obj,type)=>{
    let modifiedText = text;
    if (obj)
    {
        if (obj.bold)
        {
            modifiedText = (<b key={index}>{text}</b>);
        }
        if (obj.italic)
        {
            modifiedText = (<em key={index}>{text}</em>);
        }
        if(obj.underline)
        {
            modifiedText = (<u key={{index}}>{text}</u>);
        }
    }

        switch(type)
        {
            case 'heading-three':
              return <h3 key={index} className="font-semibold text-xl mb-3"> {modifiedText.map((content,i)=>{return <React.Fragment key={i}> {content} </React.Fragment>})}  </h3>
              case 'paragraph':
                return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
              case 'heading-four':
                return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
              case 'image':
                return (
                  <img
                    key={index}
                    alt={obj.title}
                    height={obj.height}
                    width={obj.width}
                    src={obj.src}
                  />
                )
              default:
                return modifiedText;
             
                
        }

        return modifiedText;
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="block lg:flex text-center items-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg-mb-0 w-full lg:w-auto mr-8 pt-4">
          <img
            alt={post.author.name}
            src={post.author.photo.url}
            height="30px"
            width="30px"
            className="align-middle rounded-md"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span> {moment(post.createdAt).format("MMM DD YYYY")} </span>
        </div>
      </div>

      <div>
        <h1 className="mb-8 font-bold text-3xl"> {post.title} </h1>
       
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) => {return  getContentFragment(itemIndex,item.text,item) })
          return getContentFragment(index,children,typeObj,typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
