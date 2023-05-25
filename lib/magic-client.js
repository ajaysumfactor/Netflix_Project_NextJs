
import { Magic } from 'magic-sdk';

// export const magicClient = new Magic(process.env.MAGIC_PUBLISHABLE_API_KEY); // ✨

const createMagic = () =>{
    return (
        typeof window !== "undefined" && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)
    );
};
const magic = createMagic();

// console.log("magic setup",magic);