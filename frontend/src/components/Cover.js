import React from "react";
import { Image } from "cloudinary-react";
import './Cover.css';
const Cover = ({conference}) =>{
    return(
        <div className="lkcover">
                <div >
                    <Image 
                            className="lkimg-content"
                            cloudName="grid1234"
                            publicId={conference.coverImage.imagePublicId}
                            
                        />

                    <div className="lktext-block">
                      <h1>{conference.title}</h1>
                    </div>
                </div >
                
        </div>
    );
};

export default Cover;