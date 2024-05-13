import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import backgroundImg from '../../assets/pexels-naro-k-20753710.jpg'
import {AiOutlineHeart} from 'react-icons/ai'

function Post() {
    return (
        <div className='Post'>
            <div className="heading">
                 <Avatar/>
                 <h4>Yogesh Patade</h4>
            </div>
            <div className="content">
                <img src={backgroundImg} alt="" />
            </div>
            <div className="footer">
                <div className="like">
                 <AiOutlineHeart className='icon'/>
                 <h4>4 likes</h4>
                </div>
                <p className="caption">This is nature pic Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, tempora.</p>
                <h6 className="time-ago">2 hrs ago </h6>                 
            </div>
        </div>
    )
}

export default Post
