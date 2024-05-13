import './Avatar.scss'
import userImg from '../../assets/user.png'

function Avatar({src=userImg}){
    return(
        <div className="Avatar">
            <img src={src} alt="user avatar"/>
        </div>
    )
}

export default Avatar;