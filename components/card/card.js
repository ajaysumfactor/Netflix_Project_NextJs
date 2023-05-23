import Image from "next/image";
import styles from './card.module.css'
import { useState } from "react"; 
const Card = (props) => {
    const { imgUrl='https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', size='medium' } = props;
    const [imgSrc,setImgSrc]=useState(imgUrl);
    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem,
    };
    const handleOnError = () => {
        console.log("hii error");
        setImgSrc("https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80");
      };
    return <div className={styles.container}>card here
        <div className={classMap[size]}>
            <Image src={imgSrc}  
            alt="image"
            layout="fill"
            onError={handleOnError}
           className={styles.cardImg} />
        </div>

    </div>
}

export default Card;