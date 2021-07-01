import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "antd";
import "./HomeCoverImage.css";

const HomeCoverImage = () => {

    const [homeNotices, setHomeNotices] = useState([]);

    useEffect(() => {
      const getGalleryImg = async () => {
        try {
          await axios
            .get("http://localhost:6500/grid/api/guest/getNotices")
            .then((res) => {
                setHomeNotices(res.data.allNotices);
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
        <div className="custome-img-slider-content">
          <Carousel autoplay={true}>
            {homeNotices
            .filter((wrk) => wrk.status === "approvedbyadmin")
            .map((item, index) => {
              return (
                <div key={index} className="container-fluid" >
                  <div>
                <div className="filler">

                </div>
                    <h3 className="custome-slider-content">{item.title}</h3>
                    <p className="custome-slider-content" style={{fontSize:"1rem"}}>{item.description}</p>
                    <div className="btnHolder">
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      );
  
};

export default HomeCoverImage;
