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

 
export async function getServerSideProps() {
  const userId="did:ethr:0xFF9D7617bED57730B9DbedE6fA4327E9eB5c6B50";
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweEZGOUQ3NjE3YkVENTc3MzBCOURiZWRFNmZBNDMyN0U5ZUI1YzZCNTAiLCJwdWJsaWNBZGRyZXNzIjoiMHhGRjlENzYxN2JFRDU3NzMwQjlEYmVkRTZmQTQzMjdFOWVCNWM2QjUwIiwiZW1haWwiOiJ0aWdlcnNpczE5OTVAZ21haWwuY29tIiwib2F1dGhQcm92aWRlciI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGwsIndhbGxldHMiOltdLCJpYXQiOjE2ODU3MTEyNTAsImV4cCI6MTY4NjMxNjA1MCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4RkY5RDc2MTdiRUQ1NzczMEI5RGJlZEU2ZkE0MzI3RTllQjVjNkI1MCJ9fQ.ldqjOVGxnxTePsaoj8IymaUsMSgpSrNQyq9du96_nic";
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
        title="Clifford the good cat"
        subTitle="a very cute cat"
        imgUrl="/static/animal.webp"
        videoId="4zH5iYM4wJo"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
        <SectionCards title="Popular" videos={popularVideos} size="small" />


      </div>
      </div>



    </>
  )
}
