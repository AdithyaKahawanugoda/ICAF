import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import "./HomeGallery.css";

const HomeGallery = () => {
  const [galleryImg, setGalleryImg] = useState([]);

  useEffect(() => {
    const getGalleryImg = async () => {
      try {
        await axios
          .get("http://localhost:6500/grid/api/guest/getGalleryImages")
          .then((res) => {
            setGalleryImg(res.data.gallery);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getGalleryImg();
  }, []);
  return (
    <div className="galleryComp">
      
      <h1>Gallery</h1>
      <div className="galleryContainer">
        {galleryImg
        .filter((wrk) => wrk.status === "approvedbyadmin")
        .map((galleryImgs, index) => (
          <div className="galleryImg" key={index}>
            <Image
              className="custom-cusprof-pp-img-gallery"
              cloudName="grid1234"
              publicId={galleryImgs.galleryImage.imagePublicId}
            />
          </div>
        ))}
      </div>
  
    </div>
  );
};

export default HomeGallery;
