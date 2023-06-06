import Head from "next/head";
import NavBar from "@/components/navBar";
import SectionCards from "@/components/card/section-cards";

const MyList = () =>{
    return(
        <div>
            <Head>
                <title>My List</title>
            </Head>
            <main>
                <NavBar/>
                <div>
                <SectionCards title="My List" videos={[]} size="small" />
                </div>
            </main>
        </div>
    );
};

export default MyList;