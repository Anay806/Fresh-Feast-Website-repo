import React from "react";

const getPages = ( current, total) => {
  const pages = [];
  if ( total <= 1){
    for( let i =1; i<= total; i++){
      pages.push(i)
    }
  } else{
    if ( current <= 3){
      pages.push(1, 2, 3,'...', total)
    } else if ( current >= total -2){
      pages.push(1,'...', total -2, total -1, total)
    } else {
      pages.push(1,'...', current -1, current, current+1, '...', total)
    }
  }
  return pages;
}

const Pegination = ({ page, pageHandler, dynamicPage }) => {
  return (
    <div>
      <div className="mb-20 space-x-4 flex justify-center items-center ">
        <button
          disabled={page === 1}
          onClick={() => pageHandler(page - 1)}
          className={`${
            page === 1 ? "bg-red-500" : "bg-red-500"
          } text-white px-3 rounded-md cursor-pointer`}
        >
          Prev
        </button>
        
          {
            getPages(page, dynamicPage)?.map((item, index) => {
              return <span 
              key={index} 
              onClick={() => typeof item === 'number' && pageHandler(item)}
              className={`cursor-pointer ${item === page ? 'font-bold text-red-600' : " text-black"}`}
              >
                {item}

              

              </span>
            })
          }
        
        <button
          disabled={page === dynamicPage}
          onClick={() => pageHandler(page + 1)}
          className={`${
            page === dynamicPage ? "bg-red-500" : "bg-red-500"
          } text-white px-3 rounded-md cursor-pointer`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pegination;
