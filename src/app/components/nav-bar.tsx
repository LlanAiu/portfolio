import clsx from 'clsx';
import Link from 'next/link';


export default function Navigation({path} : {path: string}){

    const links = [
        {text: 'Home', link: '/'},
        {text: 'About', link: '/about'},
        {text: 'Projects', link: '/projects'},
        {text: 'Current', link: '/current'}
    ];

    return (
        <div className='mt-2 w-full h-12 space-x-20 mb-4 border-b'>
            {links.map((link) => 
                (<Link 
                    key={link.text} 
                    href={link.link} 
                    className={clsx('inline-block text-center ml-2 p-2 border rounded-md', {
                        'bg-blue-200' : link.link.includes(path)
                    })}
                >
                    <p>{link.text}</p>
                </Link>)
            )}
        </div>
    );
}