import React from "react";
import HomeConfData from "../components/HomeConfData";
import HomeCoverImage from "../components/HomeCoverImage";
import HomeGallery from "../components/HomeGallery";
import TimeLine from "../components/TimeLine";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeCover">
        <HomeCoverImage />
      </div>

      <div className="ConfData">
        <HomeConfData />
      </div>

      <div className="timeline">
        <TimeLine />
      </div>

      <div className="galleryContainor">
        <div className="gallery">
          <HomeGallery />
        </div>
      </div>
    </div>
  );
};

export default Home;
