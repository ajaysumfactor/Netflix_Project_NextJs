import {useRouter} from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css'
Modal.setAppElement('#__next');

 
const Video = () =>{
    const router=useRouter();
    console.log({router});
    return(
    <div className={styles.container}>
    <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal} >


<iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=1&rel=1`}
        //   frameBorder="0"
        ></iframe>
        <div>must visible</div>
          </Modal>
    </div>
    );
};

export default Video;

// https://developers.google.com/youtube/iframe_api_reference