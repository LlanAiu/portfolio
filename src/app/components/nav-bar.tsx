import clsx from 'clsx';
import { motion } from 'motion/react';
import Link from 'next/link';


export default function Navigation({path, bg, text, bttn, hlght} : {
    path: string, bg: string, text: string, bttn: string, hlght: string
}) {

    const links = [
        {text: 'Home', link: '/'},
        {text: 'About', link: '/about'},
        {text: 'Projects', link: '/projects'},
        {text: 'Current', link: '/current'}
    ];

    return (
        <motion.div animate={{backgroundColor: bg, color: text}} className='pt-2 w-full h-14 space-x-20 border-b'>
            {links.map((link) => 
                (<motion.div
                    key={link.text}
                    className='inline-block w-max h-10 ml-2 p-2 border rounded-md'
                    animate={{
                        backgroundColor: (link.link.includes(path) ? hlght : bttn)
                    }}
                >
                    <Link 
                        href={link.link}
                        className='text-center'
                    >
                        <p>{link.text}</p>
                    </Link>
                </motion.div>)
            )}
        </motion.div>
    );
}