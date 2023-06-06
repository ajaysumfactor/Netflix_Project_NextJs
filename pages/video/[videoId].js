import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css'
import clsx from "classnames";
import { getYouTubeVideoById } from '@/lib/videos';
import NavBar from '@/components/navBar';
Modal.setAppElement('#__next');
import Like from '@/components/icons/like-icon';
import Dislike from '@/components/icons/like-icon';
import { useState,useEffect } from 'react';



export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArray = await getYouTubeVideoById(videoId);
  console.log("--------videoArray", videoArray);
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
  const videoId=router.query.videoId;
  const [toggleLike,setToggleLike]=useState(false);
  const [toggleDisLike,setToggleDisLike]=useState(false);
  console.log("router------------------------------------------------->", router);
  const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 },
  } = video;
  

  //=====================================================================
  // show default like and dislike which is in database currently
  useEffect(() => {
 const handleLikeDislikeService = async ()=>{
  const response = await fetch(`/api/stats?videoId=${videoId}`,{
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
  if(data.length>0){
    const favourited=data[0].favourited;
    if(favourited === 1){
      setToggleLike(true);
    }
    else if(favourited === 0){
      setToggleDisLike(true);
    }
  }
 };
 handleLikeDislikeService();
  },[videoId]);









  const runRatingService = async(favourited) => {
    return await fetch("/api/stats",{
      method:"POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },

    });
  };
  const handleToggleDislike=async()=>{
    console.log("handleToggleDislike");
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);
    const val=!toggleDisLike;
    const favourited = val? 0 :1;
    const response = await runRatingService(favourited);
    console.log("data",await response.json());
  };
  const handleToggleLike=async ()=>{
    console.log("handleToggleLike");
    setToggleLike(!toggleLike);
    setToggleDisLike(toggleLike);
    const val=!toggleLike;
    setToggleLike(val);

    const favourited = val? 1 :0;
    const response = await runRatingService(favourited);
    console.log("data",await response.json());

  }
  return (
    <div className={styles.container}>
      <NavBar />
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
        {/* Like and dislike icon here */}

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
        <button onClick={handleToggleLike}>
          <div className={styles.btnWrapper}>
            <Like selected={toggleLike}/>
          </div>
          </button>
          </div>

          <button onClick={handleToggleDislike}>
          <div className={styles.btnWrapper}>
            <Dislike selected={toggleDisLike}/>
          </div>
          </button>
        </div>



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