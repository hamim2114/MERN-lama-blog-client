import './single.css'
import SideBar from '../sidebar/SideBar';
import SinglePost from '../SinglePost.jsx/SinglePost';

const Single = () => {
    return (
        <div className='single'>
            <SinglePost/>
            <SideBar/>
        </div>
    );
};

export default Single;