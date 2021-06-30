import React from 'react'
import './Profile.css';

function Profile({conference}) {
    return (
        <div className="lkprofile">
            
            <div>
                <h2>Keynote Speakers</h2>
            </div>
            <div className="lkprofile-keynote-grid">
                {conference.keynoteSpeakers.map(val =>(
                    <div className="lkprofile-keynote">
                       
                        <div className="lkprofile-keynote-inside">
                            <div className="lkprofile-keynote-inside-left" >
                                <img src={val.image.imageSecURL} alt=""  />
                            </div>
                            <div className="lkprofile-keynote-inside-right">
                                <h4>{val.name}</h4>
                                <p>{val.associatewith}</p>
                                <p>{val.coverletter}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div>
                <h2>Guest Speakers</h2>
            </div>
            <div className="lkprofile-guest-grid">
               
                {conference.guestSpeakers.map(val =>(
                <div className="lkprofile-guest">
                  
                    <div className="lkprofile-guest-insider">
                        <div className="lkprofile-guest-inside-left">
                            <img src={val.image.imageSecURL} alt=""  />
                        </div>
                        <div className="lkprofile-guest-inside-right">
                            <h4>{val.name}</h4>
                            <div className="lkprofile-guest-inside-right_inside">
                                <p>{val.associatewith}</p>
                                <p>{val.coverletter}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))} 
            </div>

        </div>
    )
}

export default Profile
