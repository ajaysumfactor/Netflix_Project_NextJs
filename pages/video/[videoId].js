import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css'
import clsx from "classnames";
import { getYouTubeVideoById } from '@/lib/videos';
import NavBar from '@/components/navBar';
Modal.setAppElement('#__next');



export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArray = await getYouTubeVideoById(videoId);
  console.log("--------videoArray",videoArray);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}


const Video = ({ video }) => {

  const router = useRouter();
  console.log("router------------------------------------------------->", router);
  const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <div className={styles.container}>
      <NavBar/>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal} >


        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=1&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>



      </Modal>
    </div>
  );
};


export default Video;

// https://developers.google.com/youtube/iframe_api_reference