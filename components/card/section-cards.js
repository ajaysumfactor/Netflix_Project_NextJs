import Card from './card'
import styles from './section-cards.module.css'
import Link from 'next/link';
 import clsx from "classnames";


const SectionCards = (props) => {
    const { title,videos=[],size,shouldWrap=false,shouldScale } = props; //error handle if videos does not have any content 
    // console.log(videos);
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={clsx(styles.cardWrapper,shouldWrap && styles.wrap)}>

            {videos.map((video,idx)=>{
                // console.log({video});
                return <Link key={idx} href={`/video/${video.id}`}>
                <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale} />
                </Link>

            })}
            </div>
        </section>
    );
};

export default SectionCards;