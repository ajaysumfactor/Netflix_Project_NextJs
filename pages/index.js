import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
const inter = Inter({ subsets: ['latin'] })
import NavBar from '@/components/navBar'
import Card from '@/components/card/card.js'
import SectionCards from "../components/card/section-cards";
import {getWatchItAgainVideos, getVideos ,getPopularVideos} from "../lib/videos";
import { startFetchMyQuery } from "../lib/db/hasura";
import { verifyToken } from '@/lib/utils'
import { redirectUser } from '@/utils/redirectUser'

 
export async function getServerSideProps(context) {
 
   const {userId,token} = await redirectUser(context);  
   if(!userId){
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
   }
   const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  console.log({ watchItAgainVideos });
  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("travel trailer");
  const productivityVideos = await getVideos("productivity trailer");
  const popularVideos = await getPopularVideos();



  return { props: { disneyVideos, travelVideos, productivityVideos, popularVideos,watchItAgainVideos } };
}

export default function Home({ disneyVideos, travelVideos, productivityVideos, popularVideos,watchItAgainVideos }) {
  // console.log(disneyVideos);
  // console.log({magic});
  // startFetchMyQuery();
  console.log({watchItAgainVideos});

   return (
    <>
      <Head>
        <title>Netflix App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>

      <NavBar />
      <Banner
        title="Clifford the big red dog"
        subTitle="a very good dog"
        imgUrl="/static/animal.webp"
        videoId="4zH5iYM4wJo"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards title="Watch it again" videos={watchItAgainVideos} size="small" />

        <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
        <SectionCards title="Popular" videos={popularVideos} size="small" />


      </div>
      </div>



    </>
  )
}
