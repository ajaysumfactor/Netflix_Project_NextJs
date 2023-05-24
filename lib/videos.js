import videoData from '../data/videos.json';

export const getVideos = async (query) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&topicId=%2Fm%2F0f2f9%09&videoType=any&key=[YOUR_API_KEY] 
    //type:-video
    // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&topicId=%20%09&type=video&videoType=any&key=${YOUTUBE_API_KEY}
    try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&topicId=%20%09&type=video&videoType=any&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        if (data?.error) {
            console.error("Youtube API error", data.error);
            return [];
        }
        console.log({ items: data.items });
        return data?.items.map((item) => {
            console.log({ id: item.id });

            const id = item?.id?.videoId || item?.id?.channelId || item?.id;

            return {
                title: item.snippet.title,
                imgUrl: item.snippet.thumbnails.high.url,
                id,
            };
        });
    }
    catch (error) {
        console.error("Something went wrong with video library", error);
        return [];
    }
}
