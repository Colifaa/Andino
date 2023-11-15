import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ImageLoad(props) {
  
  const inputRef = useRef();

  useEffect(()=> {
    var img = document.getElementById("image");
    img.src = "/noImage.jpg";
  },[])
 
  function setFiles(e) {
    var fReader = new FileReader();
    fReader.readAsDataURL(inputRef.current.files[0]);
    fReader.onloadend = function (event) {
      var img = document.getElementById("image");
      img.src = event.target.result;
    };
  }

  return (
    <div className=" h-40  ">
      <input
        type="file"
        onChange={() => setFiles()}
        ref={inputRef}
      ></input>
      <Image
        
        className="h-32 w-50"
        alt="Picture of the author"
        id="image"
      />
    </div>
  );
}
